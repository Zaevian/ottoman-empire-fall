import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: "The Fall of an Empire — The Imperial Atlas",
  description:
    "An interactive historical documentary exploring how the Ottoman Empire’s collapse reshaped the modern world. Sixteen chapters, an atlas, archival imagery, and a chronology from 1876 to 1949.",
  openGraph: {
    title: "The Fall of an Empire",
    description:
      "How the Ottoman collapse reshaped the modern world. An interactive historical atlas.",
    type: "website",
    images: [
      {
        url: "/images/constantinople.webp",
        width: 1024,
        height: 751,
        alt: "Stamboul, Constantinople, c. 1890–1900. Library of Congress.",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to the story
        </a>
        {children}
      </body>
    </html>
  );
}
