import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  Clock3,
  BookOpen,
  Globe2,
} from "lucide-react";
import ArchiveComparison from "@/components/ArchiveComparison";
import Navigation from "@/components/Navigation";
import Introduction from "@/components/Introduction";
import Chapter from "@/components/Chapter";
import Atlas, { TreatyComparison, AllianceMap } from "@/components/Atlas";
import Timeline from "@/components/Timeline";
import TerritoryExplorer from "@/components/TerritoryExplorer";
import {
  Figures,
  DocumentDesk,
  CauseExplorer,
  Counterfactuals,
  Quiz,
} from "@/components/LearningTools";
import Glossary from "@/components/Glossary";
import Sources from "@/components/Sources";
import Media from "@/components/Media";
import { chapters } from "@/data/chapters";
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/images/constantinople.webp"
            fill
            priority
            sizes="100vw"
            alt="A late nineteenth-century photochrom of Stamboul seen across the water, with sailing boats and the imperial skyline."
          />
          <div className="hero-shade" />
          <div className="hero-top-note">
            <span>AN INTERACTIVE HISTORICAL DOCUMENTARY</span>
            <span>41°00′ N · 28°58′ E</span>
          </div>
          <div className="hero-content">
            <div className="hero-era">
              <span />
              1908 — 1924
              <span />
            </div>
            <h1 id="hero-title">
              THE FALL OF
              <br />
              <em>AN EMPIRE</em>
            </h1>
            <h2>
              How the Ottoman Empire’s collapse
              <br />
              reshaped the modern world
            </h2>
            <p>
              For more than six centuries, the Ottoman Empire governed
              territories across Europe, Asia, and Africa. Within a generation,
              war, revolution, nationalism, and foreign intervention dismantled
              its political order. The consequences transformed borders,
              nations, identities, and conflicts that continue into the present.
            </p>
            <a className="button hero-button" href="#introduction-anchor">
              Begin the story <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-side-label">
            CONSTANTINOPLE · AT THE EDGE OF A NEW WORLD
          </div>
          <div className="hero-bottom">
            <div>
              <span>
                <BookOpen size={14} />
                16 CHAPTERS
              </span>
              <span>
                <Clock3 size={14} />
                35–45 MINUTE JOURNEY
              </span>
              <span>
                <Globe2 size={14} />
                SIX CENTURIES OF CONTEXT
              </span>
            </div>
            <a href="#credit-constantinople">
              STAMBOUL, c. 1890–1900 · LIBRARY OF CONGRESS{" "}
              <ArrowUpRight size={12} />
            </a>
          </div>
        </section>
        <div className="threshold" id="introduction-anchor">
          <span>1908</span>
          <p>
            A revolution. A world war. A republic.
            <br />
            <strong>
              Political dissolution and institutional change came in stages.
            </strong>
          </p>
          <span>1924</span>
        </div>
        <Introduction />
        <div className="chapter-index-strip">
          <span>THE STORY IN FOUR MOVEMENTS</span>
          <a href="#world-of-empires">I. An imperial world</a>
          <a href="#entry-into-war">II. A world at war</a>
          <a href="#sevres-lausanne">III. The contested peace</a>
          <a href="#afterlives">IV. A lasting inheritance</a>
        </div>
        {chapters.map((c, i) => (
          <div key={c.id}>
            <Chapter chapter={c}>
              {c.id === "world-of-empires" && (
                <div className="imperial-facts">
                  <div>
                    <span>c. 1300</span>
                    <p>A frontier principality in Anatolia</p>
                  </div>
                  <div>
                    <span>1453</span>
                    <p>Constantinople becomes an imperial capital</p>
                  </div>
                  <div>
                    <span>3 continents</span>
                    <p>Connected through rule, trade, and faith</p>
                  </div>
                </div>
              )}
              {c.id === "world-of-empires" && <ArchiveComparison />}
              {c.id === "reform-and-pressure" && (
                <div className="losses-strip">
                  {[
                    ["1774", "Russia’s leverage grows"],
                    ["1830", "Greece independent"],
                    ["1878", "The Berlin settlement"],
                    ["1912–13", "The Balkan rupture"],
                  ].map(([y, t]) => (
                    <div key={y}>
                      <span>{y}</span>
                      <p>{t}</p>
                    </div>
                  ))}
                </div>
              )}
              {c.id === "reform-and-pressure" && (
                <div className="railway-exhibit">
                  <Media id="baghdad" />
                  <div>
                    <span className="eyebrow">
                      THE INFRASTRUCTURE OF MODERNITY
                    </span>
                    <h3>
                      Rails, revenues,
                      <br />
                      <em>and rival ambitions.</em>
                    </h3>
                    <p>
                      Railways could strengthen provincial connections while
                      drawing foreign investment and strategic competition into
                      the empire. The Baghdad Railway was an emblem of both
                      possibilities.
                    </p>
                  </div>
                </div>
              )}
              {c.id === "entry-into-war" && <AllianceMap />}
              {c.id === "world-war" && (
                <div className="campaign-strip">
                  {[
                    ["1915", "Gallipoli", "An Ottoman victory"],
                    ["1916", "Kut", "A British-led army surrenders"],
                    ["1917", "Baghdad & Jerusalem", "Allied advances"],
                    ["1918", "Megiddo", "The southern front breaks"],
                  ].map(([y, t, p]) => (
                    <div key={t}>
                      <span>{y}</span>
                      <h3>{t}</h3>
                      <p>{p}</p>
                    </div>
                  ))}
                  <a href="#atlas">
                    Explore campaign locations in the atlas{" "}
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              )}
              {c.id === "civilian-catastrophe" && (
                <div className="remembrance">
                  <span className="eyebrow">BEYOND THE NUMBERS</span>
                  <p>
                    A border can change in a day.
                    <br />
                    <em>The loss of a community lasts generations.</em>
                  </p>
                  <small>
                    Editorial reflection; not a historical quotation.
                  </small>
                </div>
              )}
              {c.id === "wartime-promises" && (
                <>
                  <DocumentDesk />
                  <div className="document-image">
                    <Media id="balfour" />
                    <p>
                      Read the original declaration alongside its{" "}
                      <a
                        href="https://avalon.law.yale.edu/20th_century/balfour.asp"
                        target="_blank"
                        rel="noreferrer"
                      >
                        transcribed text
                      </a>
                      . Notice whose national aspirations are named and which
                      rights the qualifications protect.
                    </p>
                  </div>
                </>
              )}
              {c.id === "armistice" && (
                <div className="four-endings">
                  {[
                    ["1918", "The armistice"],
                    ["1922", "The sultanate ends"],
                    ["1923", "The republic"],
                    ["1924", "The caliphate ends"],
                  ].map(([y, t]) => (
                    <div key={y}>
                      <span>{y}</span>
                      <p>{t}</p>
                    </div>
                  ))}
                </div>
              )}
              {c.id === "sevres-lausanne" && <TreatyComparison />}
              {c.id === "mandates" && <TerritoryExplorer />}
              {c.id === "mandates" && (
                <div className="everyday-archive">
                  <Media id="damascus-street" />
                  <Media id="jerusalem-workers" />
                </div>
              )}
              {c.id === "palestine" && (
                <div className="palestine-dates">
                  {[
                    ["1917", "British declaration and occupation"],
                    ["1923", "Mandate enters into force"],
                    ["1947", "UN partition recommendation"],
                    ["1948–49", "Statehood, war, and displacement"],
                  ].map(([y, t]) => (
                    <div key={y}>
                      <span>{y}</span>
                      <p>{t}</p>
                    </div>
                  ))}
                </div>
              )}
              {c.id === "contingency" && <Counterfactuals />}
              {c.id === "afterlives" && (
                <>
                  <CauseExplorer />
                  <div className="closing-line">
                    <Compass size={36} strokeWidth={1} />
                    <p>
                      To understand the present,
                      <br />
                      <em>learn to see the worlds that preceded it.</em>
                    </p>
                    <a href="#atlas" className="button button-outline">
                      Revisit the changing landscape <ArrowUpRight size={16} />
                    </a>
                  </div>
                </>
              )}
            </Chapter>
            {i === 0 && <Atlas />}
            {i === 9 && <Figures />}
            {i === 13 && <Timeline />}
          </div>
        ))}
        <Quiz />
        <Glossary />
        <Sources />
      </main>
      <footer className="site-footer">
        <div>
          <Compass size={30} strokeWidth={1} />
          <span>
            THE IMPERIAL <b>ATLAS</b>
          </span>
        </div>
        <p>
          An independent educational experience.
          <br />
          History is an invitation to look more closely.
        </p>
        <a href="#top">
          Back to the beginning <ArrowUpRight size={16} />
        </a>
        <span className="footer-note">THE FALL OF AN EMPIRE · 1908–1924</span>
      </footer>
    </>
  );
}
