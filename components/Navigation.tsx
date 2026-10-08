"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Compass, Menu, X, ArrowUpRight } from "lucide-react";
import { chapters } from "@/data/chapters";
export default function Navigation() {
  const [progress, setProgress] = useState(0),
    [active, setActive] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-12% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((e) => observer.observe(e));
    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <header className={`site-header ${progress > 0.008 ? "scrolled" : ""}`}>
        <a
          className="identity"
          href="#top"
          aria-label="The Imperial Atlas, return to beginning"
        >
          <Compass size={27} strokeWidth={1} />
          <span>
            THE IMPERIAL <b>ATLAS</b>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Exhibits">
          <a
            href="#world-of-empires"
            aria-current={
              chapters.some((c) => c.id === active) ? "location" : undefined
            }
          >
            The story
          </a>
          <a
            href="#atlas"
            aria-current={active === "atlas" ? "location" : undefined}
          >
            Interactive atlas
          </a>
          <a
            href="#chronology"
            aria-current={active === "chronology" ? "location" : undefined}
          >
            Timeline
          </a>
          <a
            href="#sources"
            aria-current={active === "sources" ? "location" : undefined}
          >
            Sources
          </a>
        </nav>
        <button
          className="menu-button"
          onClick={() => dialog.current?.showModal()}
          aria-label="Open chapter navigation"
        >
          <span>Chapters</span>
          <Menu size={19} />
        </button>
        <div
          className="reading-progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>
      <dialog
        aria-labelledby="chapter-navigation-title"
        ref={dialog}
        className="chapter-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="chapter-dialog-inner">
          <div className="dialog-heading">
            <span className="eyebrow">YOUR FIELD GUIDE</span>
            <button
              autoFocus
              className="icon-button"
              aria-label="Close chapter navigation"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
          </div>
          <h2 id="chapter-navigation-title">Explore the story.</h2>
          <p>Six centuries of empire. Sixteen years of upheaval.</p>
          <nav aria-label="All chapters">
            {chapters.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                aria-current={active === c.id ? "location" : undefined}
                onClick={() => dialog.current?.close()}
              >
                <span>{c.number}</span>
                {c.title.replace("\n", " ")}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
          <div className="dialog-extras">
            {[
              ["atlas", "Atlas"],
              ["chronology", "Timeline"],
              ["knowledge", "Knowledge check"],
              ["glossary", "Glossary"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => dialog.current?.close()}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </dialog>
      <a
        className={`back-top ${progress > 0.04 ? "visible" : ""}`}
        href="#top"
        aria-label="Return to top"
        tabIndex={progress > 0.04 ? 0 : -1}
      >
        <ArrowUp size={19} />
      </a>
    </>
  );
}
