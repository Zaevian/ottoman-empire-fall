"use client";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  RotateCcw,
  X,
  GitBranch,
  UserRound,
  FileText,
} from "lucide-react";
import { figures, documents, causes, questions } from "@/data/learning";
import SourceRefs from "./SourceRefs";
import Image from "next/image";
import media from "@/data/media.json";
export function Figures() {
  const [selected, setSelected] = useState(0);
  const f = figures[selected];
  const portrait = media.find(
    (m) =>
      m.id ===
      [
        "ataturk",
        "mehmed",
        "enver",
        "talaat",
        "hussein",
        "faisal",
        "inonu",
        "caliph",
      ][selected],
  );
  return (
    <section id="figures" className="figures-exhibit section-pad">
      <div className="section-kicker">
        <UserRound size={17} />
        <span>THE PEOPLE BEHIND THE DECISIONS</span>
      </div>
      <div className="section-heading">
        <h2>
          Faces of
          <br />
          <em>a changing order.</em>
        </h2>
        <p>
          Ambition, responsibility, and power. Explore eight lives at the center
          of the transformation.
        </p>
      </div>
      <div className="figure-explorer">
        <div className="figure-list" aria-label="Select a historical figure">
          {figures.map((p, i) => (
            <button
              key={p.name}
              className={i === selected ? "selected" : ""}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              <span className="small-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.name}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <article className="figure-profile" aria-live="polite">
          {portrait ? (
            <Image
              className="figure-photo"
              src={portrait.src}
              alt={portrait.caption}
              width={portrait.width}
              height={portrait.height}
              sizes="(max-width: 650px) 45vw, 300px"
            />
          ) : (
            <div className="figure-monogram" aria-hidden="true">
              {f.initials}
            </div>
          )}
          <span className="eyebrow">
            {f.role} · {f.dates}
          </span>
          <h3>{f.name}</h3>
          <p>{f.description}</p>
          <SourceRefs ids={f.sources} />
          {portrait && (
            <a className="figure-credit" href={`#credit-${portrait.id}`}>
              Portrait: {portrait.date} · attribution ↗
            </a>
          )}
        </article>
      </div>
    </section>
  );
}
export function DocumentDesk() {
  const [selected, setSelected] = useState(0);
  const d = documents[selected];
  return (
    <div className="document-desk">
      <div className="section-kicker">
        <FileText size={17} />
        <span>THE DIPLOMATIC RECORD</span>
      </div>
      <h3>Read the fine print.</h3>
      <p className="exhibit-intro">Six documents. Six different purposes.</p>
      <div className="document-tabs" aria-label="Select a diplomatic document">
        {documents.map((doc, i) => (
          <button
            key={doc.name}
            aria-pressed={selected === i}
            className={selected === i ? "selected" : ""}
            onClick={() => setSelected(i)}
          >
            <span>{doc.date}</span>
            {doc.name}
          </button>
        ))}
      </div>
      <article className="document-detail" aria-live="polite">
        <div>
          <span className="eyebrow">
            DOCUMENT {String(selected + 1).padStart(2, "0")}
          </span>
          <h4>{d.name}</h4>
          <span className="document-type">{d.type}</span>
        </div>
        <div>
          <h5>What it sought to do</h5>
          <p>{d.intent}</p>
          <h5>What followed</h5>
          <p>{d.outcome}</p>
          <SourceRefs ids={d.sources} />
        </div>
      </article>
    </div>
  );
}
export function CauseExplorer() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="cause-explorer">
      <div className="section-kicker">
        <GitBranch size={17} />
        <span>CONNECTIONS, NOT INEVITABILITIES</span>
      </div>
      <h3>How the pressures connected.</h3>
      <div className="cause-nodes" aria-label="Explore historical connections">
        {causes.map((c, i) => (
          <button
            key={c.title}
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
            className={i === selected ? "selected" : ""}
          >
            <span>{c.year}</span>
            {c.title}
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      <div className="cause-detail" aria-live="polite">
        <span className="cause-index">0{selected + 1}</span>
        <div>
          <h4>{causes[selected].title}</h4>
          <p>{causes[selected].text}</p>
          <p className="cause-links">{causes[selected].links}</p>
        </div>
      </div>
      <p className="map-note">
        Arrows indicate connections. They do not claim that each event had only
        one cause or an inevitable outcome.
      </p>
    </div>
  );
}
export function Counterfactuals() {
  return (
    <div className="counterfactuals">
      {[
        [
          "01",
          "What if the empire had remained neutral?",
          "Established: leaders debated how to protect the state in 1914. Plausible: neutrality could have reduced immediate destruction. Uncertain: whether the great powers would have respected it, or whether the empire could have resolved its other crises.",
        ],
        [
          "02",
          "What if Sèvres had been implemented?",
          "Established: the treaty specified far-reaching restrictions and conditional territorial arrangements. Plausible: implementation would have changed sovereignty across Anatolia. Uncertain: whether the powers could enforce it, and whether the resulting order would have been stable.",
        ],
        [
          "03",
          "What if Arab independence had taken another form?",
          "Established: wartime expectations and postwar settlements diverged. Plausible: a different Allied policy could have widened room for Arab governments. Uncertain: the borders, institutions, and accommodations that rival local movements would have accepted.",
        ],
      ].map(([n, q, a]) => (
        <details key={n}>
          <summary>
            <span>{n}</span>
            <h3>{q}</h3>
            <span aria-hidden="true">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function Quiz() {
  const [current, setCurrent] = useState(0),
    [answers, setAnswers] = useState<(number | null)[]>(
      Array(questions.length).fill(null),
    ),
    [finished, setFinished] = useState(false);
  const q = questions[current],
    answer = answers[current],
    answered = answers.filter((a) => a !== null).length,
    score = answers.filter((a, i) => a === questions[i].answer).length;
  function reset() {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setFinished(false);
  }
  return (
    <section id="knowledge" className="quiz-section section-pad">
      <div className="section-kicker">
        <span>AN OPTIONAL PAUSE FOR REFLECTION</span>
      </div>
      <div className="section-heading">
        <h2>
          What will
          <br />
          <em>you take away?</em>
        </h2>
        <p>
          Ten questions about chronology, geography, and the difference between
          a proposal and an outcome.
        </p>
      </div>
      <div className="quiz-box">
        {finished ? (
          <div className="quiz-result" aria-live="polite">
            <span className="eyebrow">YOUR FIELD NOTES</span>
            <div className="quiz-score">
              {score}
              <span>/ 10</span>
            </div>
            <h3>
              {score >= 8
                ? "The larger picture is coming into focus."
                : "History rewards a second look."}
            </h3>
            <p>
              You completed all ten questions. Revisit the chapters to follow
              the connections behind each answer.
            </p>
            <button className="button" onClick={reset}>
              <RotateCcw size={16} />
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="quiz-progress">
              <span>QUESTION {String(current + 1).padStart(2, "0")} / 10</span>
              <span>{answered} answered</span>
            </div>
            <div className="quiz-dots" aria-hidden="true">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`${i === current ? "current" : ""} ${answers[i] !== null ? "answered" : ""}`}
                />
              ))}
            </div>
            <h3>{q.question}</h3>
            <div className="quiz-options">
              {q.options.map((o, i) => (
                <button
                  key={o}
                  disabled={answer !== null}
                  className={
                    answer !== null
                      ? i === q.answer
                        ? "correct"
                        : i === answer
                          ? "incorrect"
                          : ""
                      : ""
                  }
                  onClick={() =>
                    setAnswers((a) => a.map((v, j) => (j === current ? i : v)))
                  }
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {o}
                  {answer !== null && i === q.answer ? (
                    <Check size={19} />
                  ) : answer === i ? (
                    <X size={19} />
                  ) : null}
                </button>
              ))}
            </div>
            {answer !== null && (
              <div className="quiz-feedback" role="status">
                <strong>
                  {answer === q.answer
                    ? "That’s right."
                    : "A useful distinction."}
                </strong>
                <p>{q.explanation}</p>
              </div>
            )}
            <div className="quiz-actions">
              <button
                className="text-button"
                disabled={current === 0}
                onClick={() => setCurrent((c) => c - 1)}
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <button
                className="button"
                disabled={answer === null}
                onClick={() =>
                  current === questions.length - 1
                    ? setFinished(true)
                    : setCurrent((c) => c + 1)
                }
              >
                {current === questions.length - 1
                  ? "See your results"
                  : "Next question"}
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
