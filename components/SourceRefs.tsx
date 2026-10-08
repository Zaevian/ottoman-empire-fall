import { sources } from "@/data/sources";
export default function SourceRefs({ ids }: { ids: number[] }) {
  return (
    <span className="source-refs" aria-label="Sources">
      {ids.map((id) => (
        <a
          key={id}
          href={`#source-${id}`}
          title={sources.find((s) => s.id === id)?.title}
        >
          [{id}]
        </a>
      ))}
    </span>
  );
}
