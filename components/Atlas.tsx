"use client";
import { useState } from "react";
import {
  Compass,
  MapPin,
  ArrowRight,
  Layers,
  Minus,
  Plus,
  RotateCcw,
  MoveHorizontal,
} from "lucide-react";
import paths from "@/data/map-paths.json";
import {
  campaigns,
  eraKeys,
  eras,
  places,
  type Era,
  type Rule,
} from "@/data/atlas";
import SourceRefs from "./SourceRefs";
import FieldAtlasLoader from "./FieldAtlasLoader";
const colors: Record<Rule, string> = {
  Ottoman: "#994e42",
  Independent: "#768769",
  British: "#b89962",
  French: "#73919c",
  Contested: "#aa8b7e",
  Proposed: "#967da0",
};
export function project(
  lon: number,
  lat: number,
  variant: "region" | "anatolia" | "europe" = "region",
): [number, number] {
  const [clon, clat, scale] =
    variant === "region"
      ? [34, 31, 1000]
      : variant === "anatolia"
        ? [34, 38.5, 2750]
        : [21, 46, 650];
  const merc = (x: number) =>
    Math.log(Math.tan(Math.PI / 4 + (x * Math.PI) / 360));
  // Transcendental math can differ in its last bits between Node and browsers.
  // SVG only needs subpixel precision; keep server and client attributes identical.
  const coordinate = (value: number) => Number(value.toFixed(3));
  return [
    coordinate(600 + (((lon - clon) * Math.PI) / 180) * scale),
    coordinate(340 - (merc(lat) - merc(clat)) * scale),
  ];
}
export function MapBase({
  variant = "region",
  modern = false,
}: {
  variant?: "region" | "anatolia" | "europe";
  modern?: boolean;
}) {
  return (
    <>
      <rect width="1200" height="680" fill="#dce1d9" />
      <g stroke="#718c80" strokeWidth=".65" opacity=".24">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v${i}`} d={`M${i * 100} 0V680`} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`h${i}`} d={`M0 ${i * 100}H1200`} />
        ))}
      </g>
      <g
        fill="#e9e4d4"
        stroke={modern ? "#b3ad99" : "#e9e4d4"}
        strokeWidth={modern ? 1.3 : 0.6}
      >
        {paths[variant].map((p, i) => (
          <path key={`${p.name}-${i}`} d={p.d} />
        ))}
      </g>
      <g fill="#788479" className="sea-label" textAnchor="middle">
        {variant === "region" ? (
          <>
            <text x="375" y="278" transform="rotate(-8 375 278)">
              MEDITERRANEAN SEA
            </text>
            <text x="610" y="79">
              BLACK SEA
            </text>
            <text x="925" y="425" transform="rotate(42 925 425)">
              PERSIAN GULF
            </text>
            <text x="660" y="546" transform="rotate(57 660 546)">
              RED SEA
            </text>
          </>
        ) : variant === "anatolia" ? (
          <>
            <text x="600" y="95">
              BLACK SEA
            </text>
            <text x="586" y="635">
              MEDITERRANEAN SEA
            </text>
          </>
        ) : (
          <text x="210" y="620">
            MEDITERRANEAN SEA
          </text>
        )}
      </g>
      <g transform="translate(1110 78)" stroke="#6a7667" fill="none">
        <path d="M0-29V29M-19 0H19M0-29L-6-8L0-12L6-8Z" />
        <text
          x="0"
          y="-39"
          fill="#6a7667"
          textAnchor="middle"
          stroke="none"
          fontSize="13"
        >
          N
        </text>
        <circle r="24" strokeWidth=".5" />
      </g>
    </>
  );
}
export default function Atlas() {
  const [era, setEra] = useState<Era>("1914"),
    [selected, setSelected] = useState("istanbul"),
    [layer, setLayer] = useState<"political" | "campaigns" | "kurdish">(
      "political",
    ),
    [zoom, setZoom] = useState(1),
    [battle, setBattle] = useState(0);
  const place = places.find((p) => p.id === selected)!,
    status = place.status[era];
  const active = layer === "campaigns" ? campaigns[battle] : null;
  return (
    <section id="atlas" className="atlas-section section-pad">
      <div className="section-kicker">
        <Compass size={18} />
        <span>THE INTERACTIVE HISTORICAL ATLAS</span>
      </div>
      <div className="section-heading">
        <h2>
          One landscape.
          <br />
          <em>Many political worlds.</em>
        </h2>
        <p>
          Move through time. Select a place. Discover how sovereignty
          changed—and where a line on a map cannot tell the whole story.
        </p>
      </div>
      <a className="field-jump" href="#field-atlas">Explore 90 battles, city histories & turning points <ArrowRight size={17} /></a>
      <div className="atlas-frame">
        <div className="atlas-toolbar">
          <span>
            <Layers size={16} /> EXPLORE THE LAYERS
          </span>
          <div>
            {[
              ["political", "Political control"],
              ["campaigns", "Wartime fronts"],
              ["kurdish", "Kurdish regions"],
            ].map(([key, label]) => (
              <button
                key={key}
                aria-pressed={layer === key}
                className={layer === key ? "selected" : ""}
                onClick={() => setLayer(key as typeof layer)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="atlas-body">
          <div className="atlas-map-wrap">
            <div className="atlas-map-header">
              <span>
                {layer === "political"
                  ? era
                  : layer === "campaigns"
                    ? "1914–18"
                    : "A REGION, NOT A BORDER"}
              </span>
              <small>
                {layer === "political"
                  ? eras[era].title
                  : layer === "campaigns"
                    ? "Major Ottoman theaters of war"
                    : "Kurdish populations across states"}
              </small>
            </div>
            <svg
              className="atlas-map"
              viewBox="0 0 1200 680"
              role="group"
              aria-label="Interactive map of selected places in the Ottoman and post-Ottoman world"
            >
              <g
                transform={`translate(${600 * (1 - zoom)},${340 * (1 - zoom)}) scale(${zoom})`}
              >
                <MapBase modern={era === "Modern" || layer === "kurdish"} />
                {layer === "kurdish" && (
                  <>
                    <ellipse
                      cx={project(43, 37)[0]}
                      cy={project(43, 37)[1]}
                      rx="117"
                      ry="85"
                      fill="#9b8064"
                      fillOpacity=".22"
                      stroke="#80644d"
                      strokeDasharray="6 7"
                    />
                    <text
                      x={project(44, 36)[0]}
                      y={project(44, 36)[1] + 120}
                      textAnchor="middle"
                      className="map-region-label"
                    >
                      BROAD POPULATION REGION
                    </text>
                  </>
                )}
                {layer === "campaigns"
                  ? campaigns.map((c, i) => {
                      const [x, y] = project(...c.coordinates);
                      return (
                        <g
                          key={c.name}
                          transform={`translate(${x} ${y})`}
                          role="button"
                          tabIndex={0}
                          aria-label={`${c.name}, ${c.date}`}
                          aria-pressed={battle === i}
                          className="map-pin"
                          onClick={() => setBattle(i)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setBattle(i);
                            }
                          }}
                        >
                          <circle r="17" fill="#f2eddf" stroke="#8e473b" />
                          <text
                            y="5"
                            textAnchor="middle"
                            className="battle-number"
                          >
                            {i + 1}
                          </text>
                          <text x="23" y="5" className="place-label">
                            {c.name}
                          </text>
                          {battle === i && (
                            <circle r="24" fill="none" stroke="#8e473b" />
                          )}
                        </g>
                      );
                    })
                  : places.map((p) => {
                      const [x, y] = project(...p.coordinates),
                        s = p.status[era],
                        isSelected = p.id === selected;
                      return (
                        <g
                          key={p.id}
                          transform={`translate(${x} ${y})`}
                          role="button"
                          aria-label={`${p.name}: ${s[0]}`}
                          aria-pressed={isSelected}
                          tabIndex={0}
                          className="map-pin"
                          onClick={() => setSelected(p.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelected(p.id);
                            }
                          }}
                        >
                          <circle r="16" fill="transparent" />
                          {isSelected && (
                            <circle
                              r="17"
                              fill="none"
                              stroke={colors[s[0]]}
                              strokeWidth="1.5"
                            />
                          )}
                          <circle
                            r={isSelected ? 7 : 5}
                            fill={colors[s[0]]}
                            stroke="#f3efdf"
                            strokeWidth="2"
                          />
                          <text
                            x={
                              p.id === "ankara"
                                ? 10
                                : p.id === "beirut"
                                  ? -13
                                  : 12
                            }
                            y={
                              p.id === "ankara"
                                ? 21
                                : p.id === "beirut"
                                  ? -8
                                  : 4
                            }
                            textAnchor={p.id === "beirut" ? "end" : "start"}
                            className={`place-label ${isSelected ? "active" : ""}`}
                          >
                            {p.name}
                          </text>
                        </g>
                      );
                    })}
              </g>
            </svg>
            <div className="map-zoom">
              <button
                aria-label="Zoom out of atlas"
                onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                disabled={zoom === 1}
              >
                <Minus size={16} />
              </button>
              <button aria-label="Reset atlas zoom" onClick={() => setZoom(1)}>
                <RotateCcw size={14} />
              </button>
              <button
                aria-label="Zoom into atlas"
                onClick={() => setZoom((z) => Math.min(1.75, z + 0.25))}
                disabled={zoom === 1.75}
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="map-instruction">
              <MapPin size={13} /> Select a marked place to read its story
            </p>
          </div>
          <aside className="atlas-info" aria-live="polite">
            {layer !== "kurdish" && (
              <label className="place-selector">
                {layer === "campaigns" ? "SELECT A CAMPAIGN" : "SELECT A PLACE"}
                <select
                  aria-label={
                    layer === "campaigns"
                      ? "Select a campaign"
                      : "Select an atlas place"
                  }
                  value={layer === "campaigns" ? battle : selected}
                  onChange={(e) =>
                    layer === "campaigns"
                      ? setBattle(+e.target.value)
                      : setSelected(e.target.value)
                  }
                >
                  {layer === "campaigns"
                    ? campaigns.map((c, i) => (
                        <option value={i} key={c.name}>
                          {c.name}
                        </option>
                      ))
                    : places.map((p) => (
                        <option value={p.id} key={p.id}>
                          {p.name}
                        </option>
                      ))}
                </select>
              </label>
            )}
            {layer === "kurdish" ? (
              <>
                <span className="eyebrow">POPULATIONS & SOVEREIGNTY</span>
                <h3>Across four states.</h3>
                <p>
                  The dashed ellipse indicates a broad region of Kurdish
                  settlement across eastern Turkey, northern Iraq, northern
                  Syria, and western Iran. It is deliberately schematic.
                </p>
                <p>
                  It is neither an ethnic boundary nor a proposed state. Mixed
                  settlement, language differences, migration, and varied
                  political affiliations make precise homogeneous mapping
                  misleading.
                </p>
                <a className="text-link" href="#kurdish-question">
                  Read the Kurdish question <ArrowRight size={15} />
                </a>
                <SourceRefs ids={[15, 18]} />
              </>
            ) : active ? (
              <>
                <span className="eyebrow">
                  CAMPAIGN {String(battle + 1).padStart(2, "0")} · {active.date}
                </span>
                <h3>{active.name}</h3>
                <p>{active.text}</p>
                <p className="map-note">
                  These are selected theaters and campaign locations, not
                  comprehensive front lines.
                </p>
                <SourceRefs ids={[3, 5, 19]} />
              </>
            ) : (
              <>
                <span className="eyebrow">{era} · SELECTED PLACE</span>
                <h3>{place.name}</h3>
                <span className="rule-badge">
                  <i style={{ background: colors[status[0]] }} />
                  {status[0] === "British"
                    ? "British authority"
                    : status[0] === "French"
                      ? "French authority"
                      : status[0]}
                </span>
                <p>{status[1]}</p>
                <div className="atlas-context">
                  <span className="eyebrow">THE WIDER PICTURE</span>
                  <p>{eras[era].description}</p>
                </div>
                <SourceRefs ids={[1, 3, 10, 12, 18]} />
              </>
            )}
          </aside>
        </div>
        <div className="era-controls">
          <label htmlFor="era-slider">
            EXPLORE AN ERA <span>{era}</span>
          </label>
          <input
            id="era-slider"
            type="range"
            min="0"
            max={eraKeys.length - 1}
            value={eraKeys.indexOf(era)}
            onChange={(e) => {
              setEra(eraKeys[+e.target.value]);
              setLayer("political");
            }}
            aria-valuetext={era}
          />
          <div className="era-buttons">
            {eraKeys.map((e) => (
              <button
                className={era === e ? "selected" : ""}
                aria-pressed={era === e}
                key={e}
                onClick={() => {
                  setEra(e);
                  setLayer("political");
                }}
              >
                {e}
                <span>
                  {e === "1683"
                    ? "Imperial reach"
                    : e === "1914"
                      ? "Before the war"
                      : e === "1918"
                        ? "Armistice"
                        : e === "1920"
                          ? "Proposals"
                          : e === "1923"
                            ? "New order"
                            : e === "1932"
                              ? "Statehood"
                              : "Reference"}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="map-legend">
          {(Object.entries(colors) as [Rule, string][]).map(([name, color]) => (
            <span key={name}>
              <i style={{ background: color }} />
              {name}
            </span>
          ))}
        </div>
      </div>
      <details className="map-method">
        <summary>About the map: sources, scale, and uncertainty</summary>
        <p>
          This is a place-based historical atlas. The coastline and contemporary
          reference boundaries come from Natural Earth (public domain).
          Historical control is shown at selected places using the sources cited
          in the chapters, rather than through invented precise historical
          borders. The 1683 layer illustrates breadth of rule at selected
          centers, not a complete territorial maximum. Egypt’s nominal Ottoman
          status and British occupation are explicitly distinguished. The 1920
          annotations separate proposed settlements from governing authority.
          Modern lines show Natural Earth’s generalized reference geography and
          do not adjudicate disputed claims.
        </p>
        <p>
          The Kurdish region is a schematic population-region indicator, based
          on the geographical discussion in David McDowall’s{" "}
          <em>A Modern History of the Kurds</em>. Consult the reproduced 1910
          ethnographic map critically: contemporary categories and purposes
          shaped that document. For historical extent, also compare the
          separately attributed historical maps in the opening chapter.
        </p>
      </details>
      <FieldAtlasLoader />
    </section>
  );
}
export function TreatyComparison() {
  const [split, setSplit] = useState(50);
  const labels1920: [number, number, string][] = [
    [28, 41.4, "EASTERN THRACE → GREECE"],
    [29.1, 40.3, "INTERNATIONAL STRAITS"],
    [27.3, 38.2, "GREEK ADMINISTRATION"],
    [34, 40, "RESTRICTED OTTOMAN STATE"],
    [41.7, 40.3, "ARMENIAN PROVISIONS"],
    [42, 37, "CONDITIONAL KURDISH AUTONOMY"],
  ];
  const labels1923: [number, number, string][] = [
    [33.5, 40, "TURKISH SOVEREIGNTY"],
    [28.8, 41.3, "EASTERN THRACE: TURKEY"],
    [28.6, 37.9, "WESTERN ANATOLIA: TURKEY"],
    [42, 36.6, "MOSUL: STILL UNRESOLVED"],
  ];
  function map(labels: typeof labels1920, year: string) {
    return (
      <svg
        viewBox="0 0 1200 680"
        role="img"
        aria-label={`${year} settlement, schematic annotations on Anatolian reference geography`}
      >
        <MapBase variant="anatolia" />
        {labels.map(([lon, lat, label], i) => {
          const [x, y] = project(lon, lat, "anatolia");
          return (
            <g transform={`translate(${x} ${y})`} key={label}>
              <circle
                r={year === "1920" ? 21 : 16}
                fill={year === "1920" ? "#985346" : "#65806b"}
                fillOpacity=".22"
                stroke={year === "1920" ? "#985346" : "#65806b"}
                strokeDasharray={year === "1920" ? "3 3" : undefined}
              />
              <text
                x="0"
                y={i % 2 ? 34 : -30}
                textAnchor="middle"
                className="treaty-map-label"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }
  return (
    <div className="treaty-comparison">
      <div className="comparison-titles">
        <div>
          <span className="eyebrow">PROPOSED · NOT IMPLEMENTED</span>
          <h3>
            Sèvres <em>1920</em>
          </h3>
        </div>
        <MoveHorizontal size={24} />
        <div>
          <span className="eyebrow">RECOGNIZED SETTLEMENT</span>
          <h3>
            Lausanne <em>1923</em>
          </h3>
        </div>
      </div>
      <div className="comparison-map">
        {map(labels1923, "1923")}
        <div
          className="comparison-overlay"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          {map(labels1920, "1920")}
        </div>
        <div className="comparison-divider" style={{ left: `${split}%` }}>
          <span>
            <MoveHorizontal size={20} />
          </span>
        </div>
        <input
          aria-label="Compare Sèvres and Lausanne maps"
          className="comparison-range"
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(+e.target.value)}
        />
        <div className="comparison-caption">
          <span>1920 · PROPOSALS</span>
          <span>1923 · SETTLEMENT</span>
        </div>
      </div>
      <p className="map-note">
        Drag across the map, or focus the slider and use arrow keys. Geographic
        annotations are schematic, not surveyed treaty boundaries. The full
        legal differences remain visible below.
      </p>
      <div className="comparison-facts">
        <div>
          <h4>A sovereignty constrained</h4>
          <p>
            Military and financial restrictions; proposed Armenian arrangements;
            a conditional Kurdish process; Greek administration around İzmir.
          </p>
        </div>
        <div>
          <h4>A sovereignty recognized</h4>
          <p>
            Ankara’s authority recognized; capitulations removed; no equivalent
            Kurdish autonomy provisions. Mosul and later Hatay changes remain
            outside this final map.
          </p>
        </div>
      </div>
      <SourceRefs ids={[9, 10, 11, 15]} />
    </div>
  );
}
export function AllianceMap() {
  const capitals: [string, number, number, string][] = [
    ["London", -0.12, 51.5, "#738c9a"],
    ["Paris", 2.35, 48.86, "#738c9a"],
    ["Petrograd", 30.33, 59.93, "#738c9a"],
    ["Berlin", 13.4, 52.52, "#985346"],
    ["Vienna", 16.37, 48.21, "#985346"],
    ["Istanbul", 28.98, 41.01, "#985346"],
  ];
  return (
    <div className="alliance-map">
      <div>
        <span className="eyebrow">ALLIANCES · NOVEMBER 1914</span>
        <h3>
          The capitals
          <br />
          behind the coalitions.
        </h3>
        <p>
          Selected principal belligerents when the Ottoman Empire entered the
          war. Italy was still neutral; it joined the Allies in 1915. Bulgaria
          joined the Central Powers in 1915.
        </p>
        <div className="map-legend">
          <span>
            <i style={{ background: "#985346" }} />
            Central Powers
          </span>
          <span>
            <i style={{ background: "#738c9a" }} />
            Allied powers
          </span>
        </div>
      </div>
      <svg
        viewBox="0 0 1200 680"
        role="img"
        aria-label="Berlin, Vienna and Istanbul aligned as Central Powers; London, Paris and Petrograd as Allied capitals"
      >
        <MapBase variant="europe" />
        {capitals.map(([name, lon, lat, color]) => {
          const [x, y] = project(lon, lat, "europe");
          return (
            <g key={name} transform={`translate(${x} ${y})`}>
              <circle r="11" fill={color} />
              <circle r="22" fill="none" stroke={color} opacity=".5" />
              <text x="28" y="5" className="place-label">
                {name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="map-note">
        Capital locations show alignment, not contemporary or historical
        national boundaries.
      </p>
    </div>
  );
}
