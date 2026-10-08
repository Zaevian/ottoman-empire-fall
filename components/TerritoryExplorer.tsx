"use client";
import { useState } from "react";
import { ArrowUpRight, Globe2, MapPin } from "lucide-react";
import { territories } from "@/data/territories";
import { MapBase, project } from "./Atlas";
import SourceRefs from "./SourceRefs";
export default function TerritoryExplorer() {
  const [selected, setSelected] = useState("iraq");
  const t = territories.find((t) => t.id === selected)!;
  const [x, y] = project(...t.coordinates);
  return (
    <div id="territories" className="territory-explorer">
      <div className="section-kicker">
        <Globe2 size={18} />
        <span>EXPLORE THE SUCCESSOR LANDSCAPE</span>
      </div>
      <div className="section-heading">
        <h3>
          Beyond a new name
          <br />
          <em>on the map.</em>
        </h3>
        <p>
          Ten profiles. Ten different paths out of empire. Select a territory to
          trace the transition.
        </p>
      </div>
      <div
        className="territory-tabs"
        aria-label="Select a country or territory"
      >
        {territories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={selected === c.id ? "selected" : ""}
            aria-pressed={selected === c.id}
          >
            {c.name}
            <ArrowUpRight size={14} />
          </button>
        ))}
      </div>
      <article className="territory-profile" aria-live="polite">
        <div className="territory-summary">
          <span className="eyebrow">{t.label}</span>
          <h4>{t.name}</h4>
          <svg
            viewBox="0 0 1200 680"
            role="img"
            aria-label={`${t.name}, approximate location on contemporary reference geography`}
          >
            <MapBase modern />
            <circle cx={x} cy={y} r="30" fill="#994e42" fillOpacity=".2" />
            <circle cx={x} cy={y} r="10" fill="#994e42" />
          </svg>
          <p className="map-note">
            <MapPin size={12} /> Contemporary reference; marker indicates
            location, not historical borders.
          </p>
          <h5>Political milestones</h5>
          <ol>
            {t.milestones.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
          <h5>People in the story</h5>
          <p>{t.figures}</p>
          <SourceRefs ids={t.sources} />
        </div>
        <div className="territory-history">
          {[
            ["01", "Under Ottoman rule", t.before],
            ["02", "During the world war", t.war],
            ["03", "After Ottoman withdrawal", t.after],
            ["04", "The longer consequence", t.legacy],
          ].map(([n, title, text]) => (
            <div key={n}>
              <span className="small-number">{n}</span>
              <div>
                <h5>{title}</h5>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
