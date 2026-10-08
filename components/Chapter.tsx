import type { ReactNode } from "react";
import type { Chapter as ChapterData } from "@/data/chapters";
import SourceRefs from "./SourceRefs";
import Media from "./Media";
import { AnnotatedText } from "./Glossary";
const imageMap: Record<string, string> = {
  "world-of-empires": "bosphorus",
  "reform-and-pressure": "palace",
  revolution: "parliament",
  "entry-into-war": "enver",
  "world-war": "gallipoli",
  "civilian-catastrophe": "refugees",
  "wartime-promises": "faisal",
  armistice: "occupation",
  "sevres-lausanne": "treaty",
  republic: "ataturk",
  mandates: "damascus",
  palestine: "jerusalem",
  "kurdish-question": "kurdistan",
  caliphate: "caliph",
  afterlives: "constantinople",
};
export default function Chapter({
  chapter: c,
  children,
}: {
  chapter: ChapterData;
  children?: ReactNode;
}) {
  const dark = ["06", "08", "10", "14", "16"].includes(c.number),
    image = imageMap[c.id];
  return (
    <section
      id={c.id}
      className={`chapter section-pad chapter-${c.number} ${dark ? "chapter-dark" : ""}`}
    >
      <div className="chapter-topline">
        <span>CHAPTER {c.number}</span>
        <span>{c.eyebrow}</span>
        <span>{c.year}</span>
      </div>
      <div className="chapter-heading">
        <span className="chapter-number" aria-hidden="true">
          {c.number}
        </span>
        <div>
          <h2>
            {c.title
              .split("\n")
              .map((t, i) =>
                i ? <em key={t}>{t}</em> : <span key={t}>{t}</span>,
              )}
          </h2>
          <p>{c.subtitle}</p>
        </div>
      </div>
      <div className={`chapter-layout ${!image ? "text-only" : ""}`}>
        <div className="chapter-prose">
          {c.paragraphs.slice(0, 2).map((p, i) => (
            <p key={i} className={i === 0 ? "opening-paragraph" : ""}>
              <AnnotatedText text={p} />
            </p>
          ))}
        </div>
        <div className="chapter-visual">
          {image && <Media id={image} />}
          <aside className="editorial-note">
            <span className="eyebrow">{c.insight.label}</span>
            <p>{c.insight.text}</p>
          </aside>
        </div>
      </div>
      <div className="chapter-continuation">
        {c.paragraphs.slice(2).map((p, i) => (
          <p key={i}>
            <AnnotatedText text={p} />
          </p>
        ))}
      </div>
      <div className="chapter-citations">
        <span>NOTES & CONTEXT</span>
        <SourceRefs ids={c.sources} />
      </div>
      {children && <div className="chapter-exhibits">{children}</div>}
    </section>
  );
}
