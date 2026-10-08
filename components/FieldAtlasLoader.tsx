"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Compass, ArrowDown } from "lucide-react";

const FieldAtlas = dynamic(() => import("./FieldAtlas"), {
  ssr: false,
  loading: () => <div className="field-loading" role="status">Opening the detailed atlas…</div>,
});

export default function FieldAtlasLoader() {
  const container = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setOpened(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div id="field-atlas" ref={container} className="field-atlas-shell">
    {opened ? <FieldAtlas /> : <div className="field-loading">
      <Compass size={32} />
      <h3>History, closer.</h3>
      <p>Explore battles, Ottoman city histories, and the lives behind the changing map.</p>
      <button onClick={() => setOpened(true)}>Open the detailed atlas <ArrowDown size={16} /></button>
    </div>}
  </div>;
}
