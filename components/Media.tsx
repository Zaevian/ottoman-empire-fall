import Image from "./ResilientImage";
import media from "@/data/media.json";
import { ArrowUpRight } from "lucide-react";
export default function Media({
  id,
  className = "",
  priority = false,
}: {
  id: string;
  className?: string;
  priority?: boolean;
}) {
  const m = media.find((m) => m.id === id);
  if (!m) return null;
  return (
    <figure className={`archival-image ${className}`}>
      <div className="image-frame">
        <Image
          src={m.src}
          alt={m.caption}
          width={m.width}
          height={m.height}
          sizes="(max-width: 700px) 92vw, (max-width: 1100px) 80vw, 1100px"
          priority={priority}
        />
        <span className="image-index">FROM THE ARCHIVE · {m.date}</span>
      </div>
      <figcaption>
        <p>{m.caption}</p>
        <a href={`#credit-${m.id}`} aria-label={`Attribution for ${m.title}`}>
          Image credit <ArrowUpRight size={12} />
        </a>
      </figcaption>
    </figure>
  );
}
