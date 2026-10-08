import Link from "next/link";
export default function NotFound() {
  return (
    <main
      className="section-pad"
      style={{ minHeight: "100vh", paddingTop: 150 }}
    >
      <span className="eyebrow">THE IMPERIAL ATLAS · 404</span>
      <h1 style={{ fontSize: 64, margin: "25px 0" }}>Beyond this map.</h1>
      <p style={{ marginBottom: 25 }}>
        This page is not part of the documentary.
      </p>
      <Link className="button" href="/">
        Return to the story
      </Link>
    </main>
  );
}
