"use client";
import { useState } from "react";
import { ArrowRight, Compass } from "lucide-react";
import { MapBase, project } from "./Atlas";
import { places, type Era } from "@/data/atlas";
export default function Introduction() {
  const [era, setEra] = useState<Era>("1683");
  const caption =
    era === "1683"
      ? "An imperial network across three continents."
      : era === "1914"
        ? "A much smaller empire, still spanning extraordinary diversity."
        : "A republic, foreign mandates, and several distinct Arabian states.";
  return (
    <section
      className="introduction section-pad"
      aria-labelledby="intro-heading"
    >
      <div className="intro-lead">
        <span className="eyebrow">BEFORE THE BORDERS WE KNOW</span>
        <h2 id="intro-heading">
          Empires do not fall
          <br />
          <em>in a single day.</em>
        </h2>
        <p>
          To understand the modern Middle East, begin with a world in which its
          familiar borders did not yet exist.
        </p>
        <p>
          Follow the people, decisions, and competing futures behind one of
          history’s great transformations.
        </p>
        <a className="text-link" href="#world-of-empires">
          Start with the world before <ArrowRight size={16} />
        </a>
      </div>
      <div className="intro-map">
        <div className="intro-map-label">
          <Compass size={17} />
          <span>THREE MOMENTS. ONE LANDSCAPE.</span>
        </div>
        <svg
          viewBox="0 0 1200 680"
          role="img"
          aria-label={`Selected political centers in ${era}; ${caption}`}
        >
          <MapBase />
          {places.map((p) => {
            const [x, y] = project(...p.coordinates),
              s = p.status[era][0];
            return (
              <g key={p.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={s === "Ottoman" ? 18 : 9}
                  fill={
                    s === "Ottoman"
                      ? "#995c46"
                      : s === "British"
                        ? "#b79a60"
                        : s === "French"
                          ? "#66818d"
                          : "#7f9274"
                  }
                  fillOpacity=".65"
                />
                <circle cx={x} cy={y} r="3" fill="#f4efe2" />
              </g>
            );
          })}
          <text className="intro-map-year" x="56" y="590">
            {era}
          </text>
        </svg>
        <div className="intro-era-buttons">
          {["1683", "1914", "1923"].map((y) => (
            <button
              key={y}
              className={era === y ? "selected" : ""}
              aria-pressed={era === y}
              onClick={() => setEra(y as Era)}
            >
              {y}
              <span>
                {y === "1683"
                  ? "IMPERIAL REACH"
                  : y === "1914"
                    ? "BEFORE THE WAR"
                    : "A NEW ORDER"}
              </span>
            </button>
          ))}
        </div>
        <p aria-live="polite">{caption}</p>
        <small>
          Colored points show selected centers, not territorial boundaries. Red
          indicates Ottoman authority.
        </small>
      </div>
    </section>
  );
}
