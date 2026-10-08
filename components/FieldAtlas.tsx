"use client";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Compass, Expand, Layers, Minus, Pause, Play, Plus, RotateCcw, Search, X } from "lucide-react";
import { mapStories, atlasTours, atlasRegions, storyKinds, type MapStory, type StoryKind } from "@/data/field-atlas";
import FieldMap, { type MapHandle } from "./FieldMap";
import SourceRefs from "./SourceRefs";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const periods = [
  { id: "all", label: "Every period · 1300–1924", min: 1300, max: 1924 },
  { id: "early", label: "Foundations & expansion · to 1600", min: 1300, max: 1600 },
  { id: "middle", label: "Cities & changing frontiers · 1601–1870", min: 1601, max: 1870 },
  { id: "late", label: "Reform & revolution · 1871–1913", min: 1871, max: 1913 },
  { id: "war", label: "The Great War · 1914–18", min: 1914, max: 1918 },
  { id: "postwar", label: "The postwar struggle · 1919–24", min: 1919, max: 1924 },
];
function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").toLowerCase();
}

export default function FieldAtlas() {
  const map = useRef<MapHandle>(null);
  const mapArea = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => true);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<StoryKind | "all">("all");
  const [period, setPeriod] = useState("all");
  const [year, setYear] = useState(1924);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tourId, setTourId] = useState("");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [streets, setStreets] = useState(true);
  const [borders, setBorders] = useState(false);
  const [streetNotice, setStreetNotice] = useState("");
  const periodRange = periods.find(p => p.id === period)!;
  const visible = useMemo(() => mapStories.filter(story =>
    (kind === "all" || story.kind === kind) && story.year >= periodRange.min &&
    story.year <= Math.min(year, periodRange.max) &&
    normalize(`${story.title} ${story.place} ${story.date} ${story.before} ${story.event} ${story.cityOrigin ?? ""}`).includes(normalize(query.trim())),
  ), [kind, periodRange, year, query]);
  const selected = visible.find(story => story.id === selectedId) ?? null;
  const nearby = selected ? visible.filter(story => story.id !== selected.id &&
    Math.hypot((story.coordinates[0] - selected.coordinates[0]) * Math.cos(selected.coordinates[1] * Math.PI / 180), story.coordinates[1] - selected.coordinates[1]) < 0.22) : [];
  const tour = atlasTours.find(t => t.id === tourId);
  const route = useMemo(() => tour ? tour.stops.map(id => mapStories.find(story => story.id === id)!) : [], [tour]);
  const clearFilters = () => { setQuery(""); setKind("all"); setPeriod("all"); setYear(1924); };
  const stopTour = () => { setPlaying(false); setTourId(""); };
  const choose = useCallback((story: MapStory) => {
    setPlaying(false); setTourId(""); setSelectedId(story.id);
    mapArea.current?.scrollIntoView({ block: "center", behavior: reducedMotion ? "instant" : "smooth" });
    map.current?.focus(story);
  }, [reducedMotion]);
  const visitStop = useCallback((index: number) => {
    const story = route[index];
    if (!story) return;
    setStep(index); setSelectedId(story.id); map.current?.focus(story);
  }, [route]);
  useEffect(() => {
    if (!playing || !tour) return;
    const timer = window.setTimeout(() => {
      if (step + 1 >= route.length) setPlaying(false);
      else visitStop(step + 1);
    }, 18000);
    return () => window.clearTimeout(timer);
  }, [playing, tour, step, route.length, visitStop]);
  const streetFailure = useCallback(() => {
    setStreets(false);
    setStreetNotice("Street tiles could not be loaded. The local landscape and every historical story remain available. Local coastlines are generalized; use wider views for geographic context.");
  }, []);
  const startTour = (id: string) => {
    const nextTour = atlasTours.find(t => t.id === id)!;
    const story = mapStories.find(s => s.id === nextTour.stops[0])!;
    clearFilters(); setPlaying(false); setTourId(id); setStep(0);
    setSelectedId(story.id); map.current?.focus(story);
    requestAnimationFrame(() => mapArea.current?.scrollIntoView({ block: "center", behavior: reducedMotion ? "instant" : "smooth" }));
  };
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await mapArea.current?.requestFullscreen();
    } catch { /* Browser or embedding restrictions leave the normal map usable. */ }
  };
  return <div className="field-atlas">
    <div className="field-heading">
      <div><span className="field-eyebrow"><Compass size={16} /> THE EXPLORER’S ATLAS</span>
        <h3>History, <em>closer.</em></h3></div>
      <p>Ninety stories. Six centuries. Zoom from an imperial horizon to a landing beach, a city’s old quarter, or the place where a new political world began.</p>
    </div>
    <div className="field-tour-shelf">
      <div className="field-shelf-title"><Play size={15} /> CHOOSE A GUIDED JOURNEY</div>
      <div className="field-tour-cards">
        {atlasTours.map(t => <button key={t.id} className={tourId === t.id ? "selected" : ""} aria-pressed={tourId === t.id} onClick={() => startTour(t.id)}>
          <span>{t.stops.length} STOPS</span><strong>{t.title}</strong><small>{t.subtitle}</small><ArrowRight size={17} />
        </button>)}
      </div>
    </div>
    <div className="field-filters">
      <div className="field-search"><Search size={17} />
        <input type="search" aria-label="Search detailed atlas stories" placeholder="Search a city, battle, or event…" value={query} onChange={event => { setQuery(event.target.value); stopTour(); }} />
        {query && <button aria-label="Clear atlas search" onClick={() => setQuery("")}><X size={16} /></button>}
      </div>
      <label className="field-period"><span>PERIOD</span><select aria-label="Detailed atlas period" value={period} onChange={event => { setPeriod(event.target.value); setYear(1924); stopTour(); }}>
        {periods.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
      </select></label>
      <div className="field-kind-filters" aria-label="Historical story categories">
        <button aria-pressed={kind === "all"} onClick={() => { setKind("all"); stopTour(); }}>All stories</button>
        {(Object.keys(storyKinds) as StoryKind[]).map(key => <button key={key} aria-pressed={kind === key} onClick={() => { setKind(key); stopTour(); }}>
          <span aria-hidden="true" style={{ color: storyKinds[key].color }}>{storyKinds[key].symbol}</span>{storyKinds[key].label}
        </button>)}
      </div>
      <label className="field-year"><span>SHOW EVENTS THROUGH <strong>{year}</strong></span>
        <input type="range" min="1300" max="1924" value={year} aria-label="Show historical events through year" onChange={event => { setYear(Number(event.target.value)); stopTour(); }} />
        <span className="field-year-ticks"><span>1300</span><span>1600</span><span>1800</span><span>1924</span></span>
      </label>
    </div>
    {tour && <div className="field-journey" aria-label="Active guided journey">
      <div><span>YOUR JOURNEY · {step + 1} / {route.length}</span><strong>{tour.title}</strong></div>
      <div className="field-journey-controls">
        <button aria-label="Previous journey stop" disabled={step === 0} onClick={() => { setPlaying(false); visitStop(step - 1); }}><ArrowLeft size={18} /></button>
        <button aria-label={playing ? "Pause guided journey" : "Play guided journey"} onClick={() => {
          if (!playing && step === route.length - 1) visitStop(0);
          setPlaying(!playing);
        }}>{playing ? <Pause size={17} /> : <Play size={17} />}{playing ? "Pause" : "Play"}</button>
        <button aria-label="Next journey stop" disabled={step === route.length - 1} onClick={() => { setPlaying(false); visitStop(step + 1); }}><ArrowRight size={18} /></button>
        <button aria-label="Close guided journey" onClick={stopTour}><X size={16} /></button>
      </div>
      <div className="field-journey-track">
        {route.map((story, index) => <button key={story.id} aria-label={`Journey stop ${index + 1}: ${story.title}`} aria-current={index === step ? "step" : undefined} className={index <= step ? "visited" : ""} onClick={() => { setPlaying(false); visitStop(index); }}><span>{index + 1}</span></button>)}
      </div>
      <small>{playing ? "Advancing every 18 seconds. Pause to read or explore." : "Choose any stop, or press Play for an animated journey."} Dashed connections show a learning itinerary, not troop movements.</small>
    </div>}
    <div className="field-explorer">
      <div className="field-map-column">
        <div className="field-region-bar"><span><Compass size={14} /> GO TO</span>
          {atlasRegions.map(region => <button key={region.name} onClick={() => { setPlaying(false); map.current?.fit(region.bounds); }}>{region.name}</button>)}
        </div>
        <div ref={mapArea} className="field-map-area">
          <FieldMap ref={map} stories={visible} selected={selected} route={route} routeStep={step} streets={streets} borders={borders} reducedMotion={reducedMotion} onSelect={choose} onStreetFailure={streetFailure} />
          <div className="field-map-tools">
            <button aria-label="Zoom into detailed map" title="Zoom in" onClick={() => map.current?.zoom(1)}><Plus size={19} /></button>
            <button aria-label="Zoom out of detailed map" title="Zoom out" onClick={() => map.current?.zoom(-1)}><Minus size={19} /></button>
            <button aria-label="Reset detailed map to overview" title="Return to overview" onClick={() => { setPlaying(false); map.current?.fit(atlasRegions[0].bounds); }}><RotateCcw size={17} /></button>
            <button aria-label="Return detailed map north and level" title="North up" onClick={() => map.current?.north()}><Compass size={19} /></button>
            <button aria-label="Toggle map perspective" title="Tilt the map" onClick={() => map.current?.tilt()}><Layers size={18} /></button>
            <button aria-label="Toggle detailed map fullscreen" title="Fullscreen · Escape to close" onClick={fullscreen}><Expand size={18} /></button>
          </div>
          <div className="field-map-caption"><span>THE OTTOMAN WORLD</span><strong>{selected ? selected.place : "Choose a pin. Follow a story."}</strong></div>
          {selected && <button className="field-refocus" onClick={() => map.current?.focus(selected)}>Return to this place <ArrowDown size={14} /></button>}
        </div>
        <div className="field-map-options">
          <label><input type="checkbox" checked={borders} onChange={event => setBorders(event.target.checked)} /> Modern borders for orientation</label>
          <label><input type="checkbox" checked={streets} onChange={event => { setStreets(event.target.checked); setStreetNotice(""); }} /> Modern street detail at close zoom</label>
          <p>Drag to pan · Ctrl/⌘ + scroll to zoom · two fingers on touchscreens · keyboard arrows and +/−</p>
        </div>
        {streetNotice && <p className="field-notice" role="status">{streetNotice}</p>}
        {streets && <p className="field-notice">At close zooms, present-day OpenStreetMap adds roads and buildings for orientation. These online tiles do not reconstruct Ottoman streets.</p>}
      </div>
      <aside className="field-story-panel" aria-label="Selected historical story">
        <span className="field-sr-status" role="status">{selected ? `${selected.title}. ${selected.date}.` : `${visible.length} stories available.`}</span>
        {selected ? <article key={selected.id} className="field-story-content" style={{ "--story-color": storyKinds[selected.kind].color } as React.CSSProperties}>
          <span className="field-story-type"><span aria-hidden="true">{storyKinds[selected.kind].symbol}</span> {storyKinds[selected.kind].label}</span>
          <p className="field-story-date">{selected.date}</p><h4>{selected.title}</h4><p className="field-story-place">{selected.place}</p>
          {selected.cityOrigin && <div className="field-origin"><strong>HOW THIS CITY BEGAN</strong><p>{selected.cityOrigin}</p></div>}
          <div className="field-story-section"><h5>Before</h5><p>{selected.before}</p></div>
          <div className="field-story-section"><h5>What happened</h5><p>{selected.event}</p></div>
          <div className="field-story-section"><h5>What changed</h5><p>{selected.after}</p></div>
          <div className="field-story-sources">READ THE EVIDENCE <SourceRefs ids={selected.sources} /></div>
          <button className="field-detail-focus" onClick={() => map.current?.focus(selected)}>Zoom to this place <ArrowRight size={16} /></button>
          {nearby.length > 0 && <div className="field-nearby"><h5>More history nearby</h5><p>Other stories within about 25 km</p>
            {nearby.map(story => <button key={story.id} onClick={() => choose(story)}><span>{story.title}<small>{story.date}</small></span><ArrowRight size={13} /></button>)}
          </div>}
        </article> : <div className="field-story-welcome"><Compass size={40} /><span>AN EMPIRE AT GROUND LEVEL</span><h4>Every place<br />has a history.</h4>
          <p>Choose a marker or a story below. The camera will move to its setting, with context before the event and the changes that followed.</p>
          <p>Start with a guided journey for a sequence of places. Gallipoli takes you from the strait to individual beaches and ridges.</p>
          <button onClick={() => startTour("gallipoli")}>Explore Gallipoli <ArrowRight size={17} /></button>
        </div>}
      </aside>
    </div>
    <div className="field-catalog">
      <div className="field-catalog-heading"><div><span>THE STORY INDEX</span><h4>{visible.length} <em>places in history</em></h4></div>
        <p>Select a story to fly to its setting.</p><button onClick={() => { clearFilters(); stopTour(); }}>Reset all filters <RotateCcw size={14} /></button></div>
      {visible.length ? <div className="field-story-list" aria-label="Available atlas stories">
        {visible.map(story => <button key={story.id} aria-pressed={selectedId === story.id} onClick={() => choose(story)}>
          <span className="field-list-symbol" aria-hidden="true" style={{ color: storyKinds[story.kind].color }}>{storyKinds[story.kind].symbol}</span>
          <span><strong>{story.title}</strong><small>{story.date} · {story.place}</small></span><ArrowRight size={15} />
        </button>)}
      </div> : <div className="field-empty"><Search size={25} /><p>No stories match these filters. Try a broader search or a later year.</p><button onClick={clearFilters}>Show all 90 stories</button></div>}
    </div>
    <details className="field-method"><summary>How to read this map</summary><div>
      <p>Markers identify historical localities. A city, monument, beach, or battlefield pin does not show the full extent of a battle, an exact camp boundary, or a historical frontier. Broader campaign locations are identified in their story panels.</p>
      <p>The locally stored landscape uses Natural Earth’s detailed 1:10m present-day coastlines, rivers, and lakes. At very close zoom, this generalized geography has limits. Enable modern street detail for additional orientation. Modern borders are optional and never represent historical political control.</p>
      <p>Guided-journey lines connect reading stops. They are educational itineraries, not reconstructed military routes. City entries distinguish older settlements from Ottoman conquest, urban foundations, capital designation, and later building. Date labels identify uncertainty and periods of gradual development.</p>
      <p>All stories can be opened from the keyboard-accessible index. Camera travel and animated route tracing follow your reduced-motion preference. No journey plays automatically.</p>
      <SourceRefs ids={[18,44]} />
    </div></details>
  </div>;
}
