"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      className="section-pad"
      style={{ minHeight: "100vh", paddingTop: 150 }}
    >
      <span className="eyebrow">THE IMPERIAL ATLAS</span>
      <h1 style={{ fontSize: 64, margin: "25px 0" }}>A pause in the story.</h1>
      <p style={{ maxWidth: 520, marginBottom: 25 }}>
        This exhibit could not be displayed. Your place in the documentary is
        still here; try loading it again.
      </p>
      <button className="button" onClick={reset}>
        Reload the exhibit
      </button>
    </main>
  );
}
