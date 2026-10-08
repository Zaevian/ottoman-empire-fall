"use client";
import { useMemo, useState } from "react";
import { ArrowDown, Clock3 } from "lucide-react";
import { events } from "@/data/timeline";
import SourceRefs from "./SourceRefs";
export default function Timeline() {
  const [filter, setFilter] = useState("All events"),
    [expanded, setExpanded] = useState(false);
  const filtered = useMemo(
    () =>
      events.filter((e) => filter === "All events" || e.category === filter),
    [filter],
  );
  const shown = expanded ? filtered : filtered.slice(0, 8);
  return (
    <section id="chronology" className="timeline-section section-pad">
      <div className="section-kicker">
        <Clock3 size={17} />
        <span>THE CHRONOLOGY · 1876–1949</span>
      </div>
      <div className="section-heading">
        <h2>
          Decades that
          <br />
          <em>changed the map.</em>
        </h2>
        <p>
          Follow 34 turning points. Open an event to understand what changed—and
          what did not.
        </p>
      </div>
      <div className="filter-row" aria-label="Filter timeline">
        {[
          "All events",
          "Reform",
          "War",
          "Diplomacy",
          "Statehood",
          "People",
        ].map((f) => (
          <button
            key={f}
            className={filter === f ? "selected" : ""}
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setExpanded(false);
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} events · {filter.toLowerCase()}
      </p>
      <div className="timeline-list">
        {shown.map((e, i) => (
          <article
            key={e.title}
            className={`timeline-event ${i % 2 ? "alternate" : ""}`}
          >
            <div className="timeline-year">
              {e.year}
              <span>{e.category}</span>
            </div>
            <details>
              <summary>
                <span className="eyebrow">{e.date}</span>
                <h3>{e.title}</h3>
                <p>{e.summary}</p>
                <span className="text-link">
                  Read the context <span aria-hidden="true">+</span>
                </span>
              </summary>
              <div className="timeline-detail">
                <p>{e.detail}</p>
                <SourceRefs ids={e.sources} />
              </div>
            </details>
          </article>
        ))}
      </div>
      {filtered.length > 8 && (
        <button
          className="button button-outline timeline-more"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Show fewer events"
            : `Continue through all ${filtered.length} events`}
          <ArrowDown
            size={17}
            style={{ transform: expanded ? "rotate(180deg)" : undefined }}
          />
        </button>
      )}
    </section>
  );
}
