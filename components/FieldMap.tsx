"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Map as LibreMap, Marker, AttributionControl, ScaleControl, setWorkerUrl, type GeoJSONSource, type StyleSpecification } from "maplibre-gl";
import type { FeatureCollection, Point } from "geojson";
import { storyKinds, type MapStory } from "@/data/field-atlas";

export type MapHandle = {
  focus: (story: MapStory) => void;
  fit: (bounds: [[number, number], [number, number]]) => void;
  zoom: (delta: number) => void;
  north: () => void;
  tilt: () => void;
};
type Props = {
  stories: MapStory[]; selected: MapStory | null; route: MapStory[]; routeStep: number;
  streets: boolean; borders: boolean; reducedMotion: boolean;
  onSelect: (story: MapStory) => void; onStreetFailure: () => void;
};
const baseStyle: StyleSpecification = {
  version: 8,
  sources: {
    land: { type: "geojson", data: "/maps/field-land.geojson" },
    lakes: { type: "geojson", data: "/maps/field-lakes.geojson" },
    rivers: { type: "geojson", data: "/maps/field-rivers.geojson" },
  },
  layers: [
    { id: "sea", type: "background", paint: { "background-color": "#b9cec9" } },
    { id: "land", type: "fill", source: "land", paint: { "fill-color": "#e8e1c8" } },
    { id: "coast", type: "line", source: "land", paint: { "line-color": "#7f9990", "line-width": 1 } },
    { id: "lakes", type: "fill", source: "lakes", paint: { "fill-color": "#b9cec9" } },
    { id: "rivers", type: "line", source: "rivers", paint: { "line-color": "#91b7b2", "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.4, 9, 1.5, 15, 3], "line-opacity": 0.7 } },
  ],
};
function features(stories: MapStory[]): FeatureCollection<Point> {
  return { type: "FeatureCollection", features: stories.map(story => ({
    type: "Feature", geometry: { type: "Point", coordinates: story.coordinates },
    properties: { id: story.id },
  })) };
}
function pin(story: MapStory, active: boolean, action: () => void) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `field-pin${active ? " field-pin-active" : ""}`;
  button.style.setProperty("--pin-color", storyKinds[story.kind].color);
  button.setAttribute("aria-label", `${story.title}, ${story.date}`);
  button.setAttribute("aria-pressed", String(active));
  const symbol = document.createElement("span");
  symbol.className = "field-pin-symbol";
  symbol.setAttribute("aria-hidden", "true");
  symbol.textContent = storyKinds[story.kind].symbol;
  const label = document.createElement("span");
  label.className = "field-pin-label";
  label.textContent = story.title;
  button.append(symbol, label);
  button.addEventListener("click", action);
  return button;
}

const FieldMap = forwardRef<MapHandle, Props>(function FieldMap(props, ref) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LibreMap | null>(null);
  const current = useRef(props);
  const markers = useRef(new Map<string, Marker>());
  const selectedMarker = useRef<Marker | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [camera, setCamera] = useState({ zoom: 3.5, longitude: 26, latitude: 36 });
  useEffect(() => { current.current = props; }, [props]);
  useImperativeHandle(ref, () => ({
    focus: story => map.current?.flyTo({ center: story.coordinates, zoom: story.zoom, duration: 1900, animate: !current.current.reducedMotion, essential: false }),
    fit: bounds => map.current?.fitBounds(bounds, { padding: 65, duration: 1600, animate: !current.current.reducedMotion, maxZoom: 14 }),
    zoom: delta => map.current?.zoomTo((map.current?.getZoom() ?? 4) + delta, { duration: 400, animate: !current.current.reducedMotion }),
    north: () => map.current?.easeTo({ bearing: 0, pitch: 0, duration: 700, animate: !current.current.reducedMotion }),
    tilt: () => map.current?.easeTo({ pitch: (map.current?.getPitch() ?? 0) > 0 ? 0 : 40, duration: 900, animate: !current.current.reducedMotion }),
  }), []);

  useEffect(() => {
    if (!container.current) return;
    let instance: LibreMap;
    try {
      // MapLibre 6's worker lives beside its distribution. An explicit local
      // URL keeps it available when Next bundles the main ESM module.
      setWorkerUrl("/maps/worker/maplibre-gl-worker.mjs");
      instance = new LibreMap({ container: container.current, style: baseStyle,
        center: [26,36], zoom: 3.5, minZoom: 2.3, maxZoom: 18,
        maxBounds: [[-15,6],[65,59]], renderWorldCopies: false,
        cooperativeGestures: true, attributionControl: false,
        fadeDuration: current.current.reducedMotion ? 0 : 250,
      });
    } catch {
      // The searchable story collection stays available without a WebGL canvas.
      const timeout = window.setTimeout(() => setFailed(true), 0);
      return () => window.clearTimeout(timeout);
    }
    map.current = instance;
    instance.addControl(new AttributionControl({ compact: false,
      customAttribution: '<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth · public domain</a>',
    }), "bottom-right");
    instance.addControl(new ScaleControl({ maxWidth: 130, unit: "metric" }), "bottom-left");
    const labels: Marker[] = [];
    for (const [name, lon, lat] of [
      ["MEDITERRANEAN SEA", 20,34], ["BLACK SEA", 34,43],
      ["RED SEA", 37,21], ["PERSIAN GULF", 51,27],
    ] as [string,number,number][]) {
      const label = document.createElement("span");
      label.className = "field-sea-label"; label.textContent = name;
      label.setAttribute("aria-hidden", "true");
      labels.push(new Marker({ element: label }).setLngLat([lon,lat]).addTo(instance));
    }
    const updateMarkers = () => {
      if (!instance.getSource("stories") || !instance.isSourceLoaded("stories")) return;
      const keep = new Set<string>();
      const visible = current.current.stories;
      const storyById = new Map(visible.map(story => [story.id,story]));
      for (const feature of instance.querySourceFeatures("stories")) {
        if (feature.geometry.type !== "Point") continue;
        const coordinates = feature.geometry.coordinates as [number, number];
        const screen = instance.project(coordinates);
        const canvas = instance.getCanvas();
        if (screen.x < -40 || screen.y < -40 || screen.x > canvas.clientWidth + 40 || screen.y > canvas.clientHeight + 40) continue;
        const properties = feature.properties;
        const isCluster = !!properties.cluster;
        const key = isCluster ? `cluster-${properties.cluster_id}` : String(properties.id);
        if (!isCluster && (key === current.current.selected?.id || !storyById.has(key))) continue;
        keep.add(key);
        if (!markers.current.has(key)) {
          let element: HTMLButtonElement;
          if (isCluster) {
            element = document.createElement("button"); element.type = "button";
            element.className = "field-cluster";
            element.textContent = String(properties.point_count);
            element.setAttribute("aria-label", `Explore cluster of ${properties.point_count} stories`);
            element.addEventListener("click", async () => {
              try {
                const source = instance.getSource("stories") as GeoJSONSource;
                const zoom = await source.getClusterExpansionZoom(Number(properties.cluster_id));
                if (map.current === instance) instance.flyTo({ center: coordinates, zoom, duration: 1000, animate: !current.current.reducedMotion });
              } catch { /* Source can change while a cluster is opening. */ }
            });
          } else {
            const story = storyById.get(key)!;
            element = pin(story, false, () => current.current.onSelect(story));
          }
          markers.current.set(key, new Marker({ element }).setLngLat(coordinates).addTo(instance));
        }
      }
      for (const [key, marker] of markers.current) {
        if (!keep.has(key)) { marker.remove(); markers.current.delete(key); }
      }
      container.current?.classList.toggle("field-map-close", instance.getZoom() >= 8);
      for (const marker of labels) marker.getElement().hidden = instance.getZoom() > 7;
    };
    instance.on("load", () => {
      instance.addSource("stories", { type: "geojson", data: features(current.current.stories), cluster: true, clusterRadius: 42, clusterMaxZoom: 13 });
      // Source queries are driven by this invisible layer; accessible HTML
      // buttons render the actual pins and clusters using local fonts.
      instance.addLayer({ id: "story-points", type: "circle", source: "stories", paint: { "circle-opacity": 0, "circle-radius": 1 } });
      instance.addSource("journey", { type: "geojson", data: { type: "FeatureCollection", features: [] }, lineMetrics: true });
      instance.addLayer({ id: "journey-guide", type: "line", source: "journey", paint: { "line-color": "#816642", "line-width": 2, "line-opacity": 0.3, "line-dasharray": [2,3] } });
      instance.addLayer({ id: "journey-progress", type: "line", source: "journey", paint: { "line-color": "#8d4b3c", "line-width": 3, "line-opacity": 0.8 } });
      setReady(true);
    });
    instance.on("render", updateMarkers);
    instance.on("moveend", () => {
      const center = instance.getCenter();
      setCamera({ zoom: instance.getZoom(), longitude: center.lng, latitude: center.lat });
    });
    instance.on("error", event => {
      if ((event as typeof event & { sourceId?: string }).sourceId === "modern-streets") current.current.onStreetFailure();
    });
    const resize = new ResizeObserver(() => instance.resize());
    resize.observe(container.current);
    const markerCollection = markers.current;
    return () => {
      resize.disconnect();
      for (const marker of markerCollection.values()) marker.remove();
      markerCollection.clear();
      selectedMarker.current?.remove();
      instance.remove(); map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready || !map.current) return;
    for (const marker of markers.current.values()) marker.remove();
    markers.current.clear();
    void (map.current.getSource("stories") as GeoJSONSource).setData(features(props.stories));
  }, [ready, props.stories]);
  useEffect(() => {
    if (!ready || !map.current) return;
    selectedMarker.current?.remove();
    selectedMarker.current = props.selected ? new Marker({ element: pin(props.selected, true, () => current.current.onSelect(props.selected!)) })
      .setLngLat(props.selected.coordinates).addTo(map.current) : null;
  }, [ready, props.selected]);
  useEffect(() => {
    const instance = map.current;
    if (!ready || !instance) return;
    if (props.streets && !instance.getSource("modern-streets")) {
      instance.addSource("modern-streets", { type: "raster", tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], tileSize: 256, maxzoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>' });
      instance.addLayer({ id: "modern-streets", type: "raster", source: "modern-streets", minzoom: 9, paint: { "raster-opacity": 0.96, "raster-fade-duration": 0 } }, "story-points");
    }
    if (instance.getLayer("modern-streets")) instance.setLayoutProperty("modern-streets", "visibility", props.streets ? "visible" : "none");
    if (props.borders && !instance.getSource("modern-borders")) {
      instance.addSource("modern-borders", { type: "geojson", data: "/maps/field-countries.geojson" });
      instance.addLayer({ id: "modern-borders", type: "line", source: "modern-borders", paint: { "line-color": "#736b54", "line-width": 1, "line-opacity": 0.45, "line-dasharray": [3,3] } }, "story-points");
    }
    if (instance.getLayer("modern-borders")) instance.setLayoutProperty("modern-borders", "visibility", props.borders ? "visible" : "none");
  }, [ready, props.streets, props.borders]);
  useEffect(() => {
    const instance = map.current;
    if (!ready || !instance) return;
    const source = instance.getSource("journey") as GeoJSONSource;
    void source.setData({ type: "FeatureCollection", features: props.route.length < 2 ? [] : [{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: props.route.map(story => story.coordinates) } }] });
    // A line-progress gradient traces the editorial itinerary, never a claimed
    // troop movement. Distance is cumulative so unequal legs advance correctly.
    const distance = (a: MapStory, b: MapStory) => Math.hypot((b.coordinates[0] - a.coordinates[0]) * Math.cos((a.coordinates[1] + b.coordinates[1]) * Math.PI / 360), b.coordinates[1] - a.coordinates[1]);
    const lengths = props.route.slice(1).map((story, i) => distance(props.route[i], story));
    const total = lengths.reduce((sum, length) => sum + length, 0);
    const fraction = (index: number) => total ? lengths.slice(0, index).reduce((sum, length) => sum + length, 0) / total : 0;
    const target = fraction(props.routeStep);
    const start = fraction(Math.max(0, props.routeStep - 1));
    let frame = 0;
    const started = performance.now();
    const draw = () => {
      const elapsed = props.reducedMotion ? 1 : Math.min(1, (performance.now() - started) / 1600);
      const progress = Math.max(0.000001, start + (target - start) * elapsed);
      if (map.current !== instance) return;
      instance.setPaintProperty("journey-progress", "line-gradient", ["step", ["line-progress"], "#8d4b3c", progress, "rgba(141,75,60,0)"]);
      if (elapsed < 1) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [ready, props.route, props.routeStep, props.reducedMotion]);
  return <div className="field-map-stage" data-ready={ready} data-zoom={camera.zoom.toFixed(3)} data-longitude={camera.longitude.toFixed(5)} data-latitude={camera.latitude.toFixed(5)}>
    <div ref={container} className="field-map-canvas" role="region" aria-label="Detailed historical map. Drag to pan, use plus and minus to zoom, or explore with the story list." />
    {!ready && !failed && <div className="field-map-loading" role="status">Preparing the landscape…</div>}
    {failed && <div className="field-map-loading"><p>The interactive map needs a browser with WebGL support. All historical stories, filters, and journeys remain available below.</p></div>}
    <div className="field-map-coordinate" aria-hidden="true">{camera.latitude.toFixed(2)}° N &nbsp; {camera.longitude.toFixed(2)}° E</div>
  </div>;
});
export default FieldMap;
