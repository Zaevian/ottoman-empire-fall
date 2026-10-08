import { sources } from "@/data/sources";
import media from "@/data/media.json";
import { ArrowUpRight, BookOpen } from "lucide-react";
export default function Sources() {
  return (
    <section id="sources" className="sources-section section-pad">
      <div className="section-kicker">
        <BookOpen size={17} />
        <span>FOLLOW THE EVIDENCE</span>
      </div>
      <div className="section-heading">
        <h2>
          The story continues
          <br />
          <em>in the sources.</em>
        </h2>
        <p>
          Primary documents, museum interpretation, and historical scholarship.
          This is an introduction to a field, not its final word.
        </p>
      </div>
      <div className="source-editorial">
        <p>
          <strong>How to read this documentary.</strong> Numbered notes connect
          chapters and exhibits to their supporting documents and further
          reading. Primary texts tell us what was stated or proposed; they do
          not by themselves prove what was implemented. Scholarship supplies
          context and competing interpretations.
        </p>
        <p>
          Dates distinguish signatures, effective administration, declarations,
          recognition, and troop withdrawals. Maps distinguish location and
          control from exact boundaries. Photographs are dated and
          contextualized; a prewar city view is not presented as a photograph of
          a later event.
        </p>
      </div>
      <ol className="source-list">
        {sources.map((s) => (
          <li key={s.id} id={`source-${s.id}`}>
            <span className="source-number">
              {String(s.id).padStart(2, "0")}
            </span>
            <div>
              <span className="eyebrow">{s.kind}</span>
              <h3>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                  <ArrowUpRight size={16} />
                </a>
              </h3>
              <p className="source-publisher">{s.publisher}</p>
              <p>{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
      <details className="image-credits" open>
        <summary>
          Image archive & attribution <span>{media.length} LOCAL ASSETS</span>
        </summary>
        <p className="credits-intro">
          Catalog descriptions preserve historical language; captions supply
          present-day context. Images are resized and converted to WebP for
          delivery. Photochroms are color photomechanical prints, not modern
          color photographs. “No known restrictions” is the holding
          institution’s rights statement.
        </p>
        <div className="credit-grid">
          {media.map((m) => (
            <article id={`credit-${m.id}`} key={m.id}>
              <span className="eyebrow">
                {m.date} · {m.institution}
              </span>
              <h4>
                <a href={m.source} target="_blank" rel="noreferrer">
                  {m.title}
                  <ArrowUpRight size={13} />
                </a>
              </h4>
              <p>{m.creator}</p>
              <a
                className="license-link"
                href={m.licenseUrl || m.source}
                target="_blank"
                rel="noreferrer"
              >
                {m.license}
              </a>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
