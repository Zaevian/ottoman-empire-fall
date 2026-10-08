# Research and editorial method

The documentary is an introductory synthesis. It distinguishes primary documents, museum interpretation, historical reference works, and scholarly further reading. Full copyrighted books were not downloaded or represented as having been read in their entirety.

## Verified anchors

The United States Holocaust Memorial Museum’s Armenian genocide overview was retrieved and consulted for the chronology, terminology, mechanisms of destruction, and its mortality estimate. Its estimate is stated as the museum’s estimate rather than presented as a universally agreed exact count. The genocide’s occurrence is not treated as an open question.

Yale’s Avalon Project texts of Sykes–Picot, the Balfour Declaration, and the Palestine mandate were retrieved. The narrative preserves the distinction between direct control and influence in Sykes–Picot; the declaration’s rights qualifications; and the mandate’s separate arrangements for Transjordan. The wording of a document is distinguished from later implementation.

Britannica’s Sèvres and Lausanne entries were retrieved. The narrative clarifies that the signed Sèvres agreement was not implemented as the final settlement. It does not adopt shorthand wording that would imply all Ottoman institutions ended in 1920. Imperial War Museums’ Gallipoli material was retrieved; the Ottoman campaign victory is distinguished from the eventual defeat of the empire.

The scholarly works listed in `data/sources.ts` supply the bibliography and interpretive context: Quataert and Hanioğlu on the changing imperial order; Rogan and Johnson on the war; Zürcher on the national movement; Cleveland and Bunton on mandate and regional history; McDowall on the Kurdish question; Al-Rasheed on Arabian unification; and scholarship on Christian persecution and British Palestine. Online publisher or institutional pages can impose access restrictions; an access restriction is not evidence that a book or its findings are unavailable in libraries.

## Chronological safeguards

- Independence in Greece, Serbia, Romania, Montenegro, Bulgaria, and Albania is placed before the empire’s final world-war defeat.
- The August 1914 alliance is distinguished from the October naval attacks and November declarations of war.
- The Armenian genocide belongs to the empire’s final wartime years.
- The 1918 armistice, 1922 abolition of the sultanate, 1923 republic, and 1924 abolition of the caliphate remain distinct.
- The January 1923 population-exchange convention is distinguished from the July peace treaty.
- The Lausanne settlement is not presented as resolving Mosul in 1923 or incorporating Hatay in that year.
- Mandate allocations, effective administration, constitutional milestones, independence, and troop withdrawal receive separate dates.
- Saudi Arabia’s proclamation is dated to 1932; the different histories of the Hejaz, Najd, al-Hasa, Yemen, and Gulf territories remain visible.
- Modern Zionism and Ottoman-era immigration precede Balfour; Israel’s statehood and the Palestinian Nakba are placed in 1947–1949, decades after Ottoman rule.
- Counterfactuals are labeled analysis and uncertainty, rather than alternative facts.

## Maps

The contemporary coastline and reference geometry come from Natural Earth, downloaded from the project’s public GitHub repository. Natural Earth data are public domain. Contemporary boundaries are displayed only on reference and population layers; historical layers use selected place markers. Modern reference geography does not resolve contested sovereignty or changing military control.

The Sèvres–Lausanne slider changes schematic labels and proposed versus recognized arrangements. It does not fabricate surveyed treaty polygons. The Kurdish ellipse is an explicitly broad population-region indicator, not an ethnic border or a political claim. The 1910 Maunsell map is treated as a historical document whose classifications require interpretation.

Two independently attributed reconstructions supplement the atlas. The 1683 reconstruction by Atilim Gunes Baydin cites Robert Mantran’s edited history among its bases. The 1914 administrative reconstruction by Underlying lk cites Fuat Dündar’s *Crime of Numbers*. Different scales and definitions are stated in the accompanying captions. They are not used to compute precise area-loss statistics.

A draft historical-basemap repository was inspected but excluded because it contained anomalies and explicitly requires independent verification. Its polygons are not included in the application.

## Detailed explorer atlas

The explorer contains 90 locality-based entries from the early Ottoman centuries through 1924. Seven guided journeys connect imperial cities, expansion, individual Gallipoli sites, war in the Arab provinces, the republic's emergence, urban development, and civilian experiences. Their dashed lines are learning itineraries, not reconstructed military routes.

Britannica's city, ruler, and battle references were retrieved for urban chronology, early campaigns, monuments, and the independence-war milestones. National Army Museum accounts of Mesopotamia and Megiddo were retrieved for Kut, Baghdad, Palestine, and the advance toward Damascus. Imperial War Museums' current Gallipoli overview was consulted alongside the existing war bibliography. Broad scholarly references remain interpretive context and further reading; adding a map pin does not imply that an entire copyrighted book was retrieved.

City records separate ancient or medieval settlement from Ottoman conquest, capital designation, an Ottoman urban foundation, a specific monument, or gradual commercial development. Sarajevo's Ottoman urban growth is placed in an already inhabited valley. Edirne uses a 1360s period because precise conquest and capital chronologies vary. Basra's seventh-century origin is explicit. Ankara's 13 October 1923 capital designation precedes the republic's declaration. The Baghdad Railway entry distinguishes 1902–03 arrangements from a completed continuous railway, which did not exist during the Ottoman war years.

The detailed landscape is Natural Earth's public-domain 1:10m land, lakes, rivers, and countries, retrieved from `nvkelso/natural-earth-vector` at immutable revision `ca96624a56bd078437bca8184e78163e5039ad19`. `data/field-map-provenance.json` records inputs, SHA-256 digests, clipping bounds, and output sizes. The preparation script clips to the atlas region, retains five decimal coordinate places, and strips unused properties. This contemporary generalized geometry is not a trench survey, historical shoreline survey, or a source of exact wartime boundaries.

Gallipoli beach and ridge pins permit close camera views. Broad campaigns such as Megiddo and Sakarya remain labeled regional localities. Deir ez-Zor denotes an affected region, not a fabricated camp polygon. Armenian genocide coverage uses the existing USHMM source and clear terminology. Mount Lebanon's famine retains its multiple interacting causes. No exact fire perimeter or unsupported ignition attribution is asserted for Smyrna.

OpenStreetMap raster tiles are a switchable online layer, enabled at close zooms and clearly labeled present-day street detail with contributor attribution. No tiles are bulk downloaded, preloaded for offline use, or stored in the repository. Modern country boundaries are optional orientation. Local geography, the historical index, and source references do not depend on the tile service. Generalized local coastlines have limited precision at beach scale; the fallback notice states this limitation.

## Media provenance

`data/media.json` contains the delivery path, dimensions, caption, creator, date, source record, and rights statement for every included asset. `data/media-provenance.json` preserves the catalog metadata retrieved from Library of Congress and Wikimedia Commons. Assets were selected after inspecting those rights statements; age alone was not used to infer reuse permission.

Photochrom prints are identified as photomechanical color prints. Prewar city scenes are not described as photographs of postwar events. Mehmed VI’s restored portrait credits its restoration. Abdülmecid II’s 1931 photograph is explicitly dated to exile, rather than passed off as an image from his period in office. Atrocity coverage uses a family portrait and restrained text, with no graphic images.

The images were downloaded with TLS verification, resized, and converted to WebP. The large Maunsell image was retrieved in full after an initial capped download failed; the truncated file was not used. Attribution and license links remain available on the page. The CC BY-SA map retains its source and license; the license applies to that image and its derivatives.
