import { glossary } from "@/data/learning";
import { BookOpen, X } from "lucide-react";
export function AnnotatedText({ text }: { text: string }) {
  const terms = glossary
    .filter((g) => new RegExp(`\\b${g.term}\\b`, "i").test(text))
    .slice(0, 1);
  if (!terms.length) return <>{text}</>;
  const term = terms[0],
    index = text.toLowerCase().indexOf(term.term.toLowerCase()),
    id = `definition-${term.term.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <>
      {text.slice(0, index)}
      <button
        className="glossary-term"
        popoverTarget={id}
        aria-label={`Define ${term.term}`}
      >
        {text.slice(index, index + term.term.length)}
      </button>
      {text.slice(index + term.term.length)}
    </>
  );
}
export default function Glossary() {
  return (
    <section id="glossary" className="glossary-section section-pad">
      <div className="section-kicker">
        <BookOpen size={17} />
        <span>THE READER’S COMPANION</span>
      </div>
      <div className="section-heading">
        <h2>
          A language for
          <br />
          <em>understanding.</em>
        </h2>
        <p>
          Empires have their own vocabulary. A few careful definitions make the
          story clearer.
        </p>
      </div>
      <div className="glossary-grid">
        {glossary.map((g, i) => (
          <details key={g.term}>
            <summary>
              <span className="small-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              {g.term}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{g.definition}</p>
          </details>
        ))}
      </div>
      {glossary.map((g) => {
        const id = `definition-${g.term.toLowerCase().replaceAll(" ", "-")}`;
        return (
          <div
            className="definition-popover"
            popover="auto"
            id={id}
            key={g.term}
            role="dialog"
            aria-label={`${g.term} definition`}
          >
            <button
              className="icon-button"
              popoverTarget={id}
              popoverTargetAction="hide"
              aria-label="Close definition"
            >
              <X size={20} />
            </button>
            <span className="eyebrow">FROM THE GLOSSARY</span>
            <h3>{g.term}</h3>
            <p>{g.definition}</p>
          </div>
        );
      })}
    </section>
  );
}
