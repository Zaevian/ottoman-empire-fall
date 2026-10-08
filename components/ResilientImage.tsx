"use client";
import { useState } from "react";
import Image, { type ImageProps } from "next/image";
export default function ResilientImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        className="image-unavailable"
        role="img"
        aria-label={props.alt}
        style={{ aspectRatio: `${props.width} / ${props.height}` }}
      >
        <span>This archive image is unavailable.</span>
        <small>Its caption and attribution are preserved below.</small>
      </div>
    );
  return <Image {...props} onError={() => setFailed(true)} alt={props.alt} />;
}
