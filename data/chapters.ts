export type Chapter = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  year: string;
  paragraphs: string[];
  insight: { label: string; text: string };
  sources: number[];
  image?: string;
};
export const chapters: Chapter[] = [
  {
    id: "world-of-empires",
    number: "01",
    eyebrow: "THE WORLD BEFORE",
    title: "One empire.\nMany worlds.",
    subtitle:
      "To understand what fell, first understand what held it together.",
    year: "c. 1300–1700",
    image: "constantinople",
    paragraphs: [
      "The Ottoman state began around 1300 as a frontier principality in northwestern Anatolia. Through conquest, alliances, and the absorption of rival territories, it became an empire spanning southeastern Europe, western Asia, and North Africa. Mehmed II’s capture of Constantinople in 1453 made the former Byzantine capital the seat of a new imperial order. The city, known by several names and increasingly as Istanbul, linked the Black Sea to the Mediterranean through the Bosphorus and Dardanelles.",
      "The sultan ruled through a household, ministers, provincial governors, judges, soldiers, and negotiated relationships with local elites. Imperial government was never simply a command sent from the palace and uniformly obeyed. Tax collection, military recruitment, and the administration of justice depended on intermediaries. Some provinces were tightly administered; other territories acknowledged Ottoman sovereignty while retaining substantial local autonomy. The empire’s greatest extent cannot be reduced to a single year or a single kind of control.",
      "Turkish, Arabic, Kurdish, Greek, Armenian, Ladino, and other languages coexisted. Muslims were the majority across the empire as a whole, but Christian and Jewish communities were central to its towns, trade, professions, and countryside. Religious institutions helped organize education, worship, charity, and parts of personal law. The label ‘millet system’ is useful only with care: communal arrangements changed over time and were reorganized in the nineteenth century. They offered forms of communal autonomy within an unequal order, not modern citizenship or universal religious equality.",
      "Ports, caravan routes, agricultural districts, and pilgrimage networks connected distant places. The same diversity that gave the empire its commercial and political reach also made bargaining indispensable. Later nationalist projects would try to make territory, language, religion, and sovereignty line up. In the Ottoman world, those categories rarely fitted neatly together.",
    ],
    insight: {
      label: "READ THE MAP CAREFULLY",
      text: "Directly governed provinces, tributary principalities, and nominally dependent rulers were different relationships. An imperial color on a map can conceal them.",
    },
    sources: [1, 2],
  },
  {
    id: "reform-and-pressure",
    number: "02",
    eyebrow: "CHANGE, NOT INEVITABILITY",
    title: "The long struggle\nto remake an empire.",
    subtitle: "Reform and dispossession unfolded together.",
    year: "1774–1908",
    image: "galata",
    paragraphs: [
      "Ottoman power faced mounting pressure from Russia and the Habsburg monarchy, but ‘decline’ is too simple a description of the eighteenth and nineteenth centuries. Defeat could coexist with economic growth, new institutions, and expanding state authority. The 1774 Treaty of Küçük Kaynarca strengthened Russia’s position around the Black Sea; Crimea was annexed by Russia in 1783. Later wars sharpened the danger to the capital and to Muslim populations in the Balkans and Caucasus.",
      "European industrialization widened differences in military production, transport, and finance. Ottoman rulers responded. Mahmud II destroyed the Janissary corps in 1826 and built new military institutions. The Tanzimat era, conventionally dated from 1839 to 1876, brought administrative, legal, educational, and fiscal reforms. Reform decrees promised security of life and property and, increasingly, equality among subjects. Implementation was uneven, and new central demands could provoke resistance from groups whose privileges or local authority were threatened.",
      "Railways, telegraphs, schools, newspapers, and a professional bureaucracy transformed everyday government. They also cost money. Foreign borrowing, fiscal pressures, and the default of the 1870s led to the Ottoman Public Debt Administration in 1881. Its control over designated revenues made European financial influence visible inside imperial sovereignty. Capitulations—privileges granted to foreign subjects—also limited aspects of legal and economic authority, though their origins long predated the final crisis.",
      "National movements, great-power interventions, and local conflicts broke away territories. Greece achieved independence in the early nineteenth century; Serbia, Romania, and Montenegro received international recognition of independence in 1878. The expression ‘Sick Man of Europe’ reflected European power politics as much as an objective diagnosis. An empire that kept reforming, negotiating, and fighting was not simply waiting to disappear.",
    ],
    insight: {
      label: "A COMMON MISCONCEPTION",
      text: "Modernization did not automatically save the empire—or destroy it. Reforms strengthened state capacity while creating new expectations and conflicts over citizenship and power.",
    },
    sources: [1, 2, 11],
  },
  {
    id: "revolution",
    number: "03",
    eyebrow: "THE GENERATION OF RUPTURE",
    title: "A constitution.\nThen a succession of wars.",
    subtitle: "The hopeful language of 1908 met the violent geography of 1913.",
    year: "1908–1913",
    image: "parliament",
    paragraphs: [
      "In July 1908, officers and activists associated with the Young Turk movement forced the restoration of the constitution suspended under Abdülhamid II. Crowds celebrated the possibility of parliamentary government and a common Ottoman citizenship. The Committee of Union and Progress (CUP) became the strongest organized force within this changing political world, but the Young Turks were not a single, unchanging party of identical views.",
      "The constitutional settlement did not end instability. A counterrevolutionary crisis in 1909 led to Abdülhamid’s deposition. Austria-Hungary annexed Bosnia-Herzegovina in 1908; Bulgaria declared independence that year. Italy attacked Ottoman Libya in 1911 and occupied the Dodecanese. The Balkan Wars of 1912–1913 cost the empire most of its remaining European territory. Ottoman forces recovered Edirne in the second war, but the larger catastrophe could not be reversed.",
      "These were losses of people, productive land, tax revenue, military recruiting grounds, and places central to the ruling elite’s own lives. Muslim refugees arrived in large numbers, often after expulsion and violence. Christian communities also suffered wartime atrocities. Refugee experience and fear of further partition helped radicalize politics. The CUP’s January 1913 coup and subsequent consolidation narrowed the space for opposition.",
      "Ottomanism promised allegiance across communities; forms of Turkish nationalism emphasized language and increasingly the security of a Turkish Muslim core. Arab cultural and political movements ranged from demands for administrative decentralization to projects for independence. These identities overlapped and changed. It would be misleading to imagine all Arabs already seeking separation, or all Turks already seeking a nation-state.",
    ],
    insight: {
      label: "THE BALKANS WERE NOT CREATED IN 1918",
      text: "Several Balkan states had secured independence decades earlier. Albania declared independence in 1912; its recognition and borders emerged through diplomacy in 1913.",
    },
    sources: [2, 11, 12],
  },
  {
    id: "entry-into-war",
    number: "04",
    eyebrow: "THE FATAL GAMBLE",
    title: "Why enter\na European war?",
    subtitle:
      "An alliance offered protection—and carried the empire into a global conflict.",
    year: "1914",
    image: "soldiers",
    paragraphs: [
      "When war began in Europe, Ottoman leaders faced a dangerous choice. Neutrality might preserve exhausted resources, but it did not guarantee protection against Russian ambitions or European intervention. The Straits were both a lifeline and a strategic vulnerability: they connected Russia’s Black Sea ports to world trade and offered a route toward Istanbul. Some Ottoman leaders sought security through an alliance, while others warned against immediate entry.",
      "Germany had cultivated military and economic connections, including a military mission and railway interests. A secret Ottoman–German alliance was signed on 2 August 1914, but alliance did not instantly mean active warfare. The arrival of the German warships Goeben and Breslau, transferred into Ottoman service while retaining German personnel, sharpened the situation. British requisition of Ottoman battleships under construction in Britain caused public anger, but no single incident explains the decision.",
      "Enver Pasha and other interventionists hoped a favorable war could recover strategic freedom, revise losses, and reduce foreign constraints. On 29 October, an Ottoman fleet under Admiral Wilhelm Souchon attacked Russian Black Sea ports. Russia declared war on 2 November; Britain and France followed on 5 November. The attacks helped turn a disputed policy into an accomplished fact.",
      "The empire entered alongside the Central Powers, but its leaders were making choices within Ottoman concerns, not merely obeying Germany. Their wager depended on a relatively quick victory and on opportunities to mobilize imperial and Islamic loyalties. Instead, war required sustained industrial resources, food supplies, transport, and manpower that the state could not reliably provide.",
    ],
    insight: {
      label: "ALLIANCE ≠ INSTANT ENTRY",
      text: "The secret alliance was signed in August. Active Ottoman belligerency followed the Black Sea attacks in late October and declarations of war in November.",
    },
    sources: [3, 19],
  },
  {
    id: "world-war",
    number: "05",
    eyebrow: "AN EMPIRE AT WAR",
    title: "Victory at the Straits.\nExhaustion everywhere.",
    subtitle:
      "There was no single Ottoman front, and no single experience of the war.",
    year: "1914–1918",
    image: "gallipoli",
    paragraphs: [
      "The winter offensive toward Sarıkamış in 1914–1915 ended in a devastating Ottoman defeat against Russia. Cold, disease, poor supply, and operational decisions compounded combat losses. In 1915, British and French forces tried to force the Dardanelles, then landed troops on the Gallipoli peninsula. Ottoman resistance, including forces commanded by Mustafa Kemal, stopped them. Allied evacuation was completed in January 1916. Gallipoli preserved the capital and denied the Allies a direct supply route to Russia; it did not remove the empire’s other enemies.",
      "In Mesopotamia, British and Indian forces advanced from the Gulf to protect strategic interests and threaten Ottoman positions. The Ottoman victory at Kut in April 1916 temporarily checked them; a renewed offensive took Baghdad in March 1917. Campaigns across Sinai and Palestine unfolded alongside the Arab Revolt in the Hejaz. British-led forces entered Jerusalem in December 1917 and broke Ottoman positions in Palestine at Megiddo in September 1918.",
      "Supply was a war within the war. Limited railway connections, requisitioned animals, labor shortages, inflation, epidemic disease, and disrupted trade strained agricultural communities and towns. Soldiers often confronted hunger and illness as well as enemy fire. In Mount Lebanon, famine reflected a combination of blockade, Ottoman controls and requisitions, transport and market failures, and the 1915 locust infestation. Assigning the catastrophe a single cause conceals how these pressures interacted.",
      "Russia’s revolutions and withdrawal from the conflict changed the Caucasus front, but could not reverse the empire’s broader exhaustion. By autumn 1918, military collapse in Syria and Bulgaria’s exit from the war left Ottoman leaders exposed. Local victories had prolonged survival; they had not produced the resources or diplomatic settlement needed to win.",
    ],
    insight: {
      label: "THE HUMAN GEOGRAPHY OF WAR",
      text: "A front line shows military positions. It does not show a family’s lost harvest, an epidemic, a requisitioned mule, or a town’s broken food supply.",
    },
    sources: [3, 5, 19, 20],
  },
  {
    id: "civilian-catastrophe",
    number: "06",
    eyebrow: "PEOPLE, NOT ONLY BORDERS",
    title: "The destruction\nof communities.",
    subtitle:
      "War became a setting for state-directed persecution and mass death.",
    year: "1915–1916 · AND BEYOND",
    image: "refugees",
    paragraphs: [
      "The Armenian genocide occurred during the Ottoman Empire’s final years. It did not begin after the empire had dissolved. Armenian subjects had long lived across Anatolia and in imperial cities; they were neither a foreign population nor a uniform political movement. Earlier massacres and discrimination formed part of the background. Wartime fears and the Russian front were exploited by CUP leaders to treat an entire population as a security threat.",
      "In 1915, Ottoman authorities arrested Armenian leaders, disarmed or separated many Armenian soldiers, and organized deportations from large areas of Anatolia. Deportation was accompanied by massacres, lethal exposure, starvation, sexual violence, abduction, and dispossession. Many deportees were driven toward the Syrian desert. Officials, security forces, irregular units, and local participants carried out the destruction; some individuals resisted or helped victims. USHMM describes the events as genocide and estimates at least 664,000 and possibly as many as 1.2 million deaths. Estimates vary with population baselines and the period and mechanisms counted. Scholarly disputes over some totals or local mechanisms do not make the genocide’s occurrence an open question.",
      "Assyrian and other Syriac Christian communities suffered massacres, flight, and destruction, especially in southeastern Anatolia and neighboring areas during the war. Greek Orthodox populations experienced persecution, deportation, forced labor, and mass violence in distinct phases before, during, and after the world war. These histories intersect, but should not be folded into a single identical chronology or explained only through the Armenian case.",
      "Survivors faced the loss of homes, relatives, property, institutions, and the possibility of return. Refugee networks and diasporas carried memory beyond the former empire. Understanding this transformation requires following people as well as diplomatic documents: sovereignty changed hands over landscapes whose populations had already been forcibly altered.",
    ],
    insight: {
      label: "A NOTE ON PRESENTATION",
      text: "This chapter uses no graphic imagery. Naming the violence accurately and recognizing the people subjected to it are essential to understanding the period.",
    },
    sources: [4, 16, 3],
  },
  {
    id: "wartime-promises",
    number: "07",
    eyebrow: "THREE DOCUMENTS, MANY EXPECTATIONS",
    title: "A future promised\nin different directions.",
    subtitle:
      "Diplomacy created competing possibilities, not a single master plan.",
    year: "1915–1917",
    image: "arab-revolt",
    paragraphs: [
      "Sharif Hussein of Mecca negotiated with British high commissioner Henry McMahon in 1915–1916. Their correspondence discussed British support for Arab independence with territorial qualifications whose meaning remained disputed. Hussein launched the Arab Revolt in June 1916. Forces associated with his sons, including Faisal, cooperated with Britain, threatened the Hejaz Railway, and later advanced into Syria. Many Arab soldiers and officials nevertheless continued to serve the Ottoman state; ‘the Arabs’ did not act as one political bloc.",
      "Meanwhile Britain and France, with Russian assent, concluded the secret Sykes–Picot Agreement in May 1916. It distinguished areas of direct British or French control from spheres in which an Arab state or confederation was envisaged under outside influence. It also proposed an international arrangement for much of Palestine. This was a wartime allocation of interests, not the final map of today’s states.",
      "In November 1917, the Balfour Declaration expressed British support for a ‘national home for the Jewish people’ in Palestine, with qualifications concerning the civil and religious rights of existing non-Jewish communities and the rights and political status of Jews elsewhere. It did not establish a sovereign state or specify its borders. Palestinian Arabs’ political aspirations were not recognized on an equivalent national basis in the declaration’s wording.",
      "These undertakings were produced by different officials, at different moments, for overlapping strategic purposes. Their incompatibilities were sharpened by competing interpretations. Military occupation, local political projects, inter-Allied bargaining, and later League of Nations decisions determined what followed. Treating one secret agreement as the explanation for every subsequent boundary erases that contested history.",
    ],
    insight: {
      label: "FOLLOW THE LEGAL STATUS",
      text: "A correspondence, a secret agreement, a declaration, an armistice, a peace treaty, and a mandate do different things. They are not interchangeable ‘treaties.’",
    },
    sources: [6, 7, 8, 19],
  },
  {
    id: "armistice",
    number: "08",
    eyebrow: "DEFEAT WITHOUT A SETTLEMENT",
    title: "The guns fell silent.\nThe struggle did not.",
    subtitle:
      "An armistice ended fighting with the Allies, not the argument over sovereignty.",
    year: "30 OCTOBER 1918",
    image: "occupation",
    paragraphs: [
      "The Armistice of Mudros was signed on 30 October 1918 and took effect the following day. It required demobilization, access to the Straits, and the surrender of key positions. Broad provisions permitted Allied occupation of strategic points in circumstances the Allies judged threatening to their security. The CUP leadership lost power; leading figures fled. Sultan Mehmed VI and governments in Istanbul tried to preserve a place in the expected settlement.",
      "Allied forces entered Istanbul in November 1918. A more formal occupation followed in March 1920, including action against Ottoman political institutions. Other occupations and competing claims spread across Anatolia. Greek troops landed at İzmir in May 1919 with Allied authorization. Violence and fears of permanent partition helped mobilize resistance, even though the communities of the region did not share a single political future.",
      "The Ottoman government still existed, but its freedom to act was increasingly restricted. Local defense organizations, military officers, and nationalist congresses created alternative centers of authority. This duality matters: the movement based in Ankara would challenge both foreign occupation and the Istanbul government’s claim to speak for the country.",
      "For civilians, ‘postwar’ did not mean peace. Displacement, reprisals, economic breakdown, and new fighting continued. The years between the armistice and Lausanne were part of a wider regional transition in which battlefield outcomes repeatedly changed what diplomacy could impose.",
    ],
    insight: {
      label: "FOUR DIFFERENT ENDINGS",
      text: "1918: armistice. 1922: abolition of the sultanate. 1923: proclamation of the republic. 1924: abolition of the caliphate. There is no single date that does all four jobs.",
    },
    sources: [3, 11, 19],
  },
  {
    id: "sevres-lausanne",
    number: "09",
    eyebrow: "THE SETTLEMENT THAT DID NOT HOLD",
    title: "Two treaties.\nTwo possible maps.",
    subtitle:
      "Sèvres proposed a partition. Lausanne recognized a changed balance of power.",
    year: "1920 / 1923",
    image: "treaty",
    paragraphs: [
      "Representatives of the Ottoman government signed the Treaty of Sèvres on 10 August 1920. It proposed severe territorial losses, military restrictions, international control of the Straits, and far-reaching limits on sovereignty. Eastern Thrace was assigned to Greece. The İzmir region was to remain nominally under Ottoman sovereignty while Greece administered it, with provision for a later decision on its status. Allied zones of influence and separate arrangements complicated the map further.",
      "The treaty recognized Armenia and envisaged an American arbitration of aspects of its boundary with Turkey. Articles 62–64 provided a conditional process concerning Kurdish autonomy and possible independence in a specified area. They did not immediately establish a Kurdish state, and they did not cover every Kurdish-inhabited region. These qualifications matter when comparing promises with the later settlement.",
      "The Ankara movement rejected Sèvres. The treaty was not implemented as the final peace settlement. Nationalist military successes, agreements with other powers, and changing Allied priorities undermined the ability to enforce it. Lausanne, signed on 24 July 1923, recognized a sovereign Turkey with a substantially different territorial settlement and removed the capitulations. It did not restore the Arab provinces or all former Ottoman lands.",
      "Even Lausanne was not the end of boundary-making. The Mosul question remained unresolved until subsequent League deliberations and the 1926 settlement. Hatay’s incorporation into Turkey came in 1939. The comparison below therefore contrasts political proposals and outcomes, not two equally realized states.",
    ],
    insight: {
      label: "PROPOSAL IS NOT POSSESSION",
      text: "The 1920 display marks proposed arrangements schematically. Dashed shapes and labels must not be read as evidence that these authorities actually governed those territories.",
    },
    sources: [9, 10, 11, 15],
  },
  {
    id: "republic",
    number: "10",
    eyebrow: "SOVEREIGNTY RECONSTRUCTED",
    title: "From an imperial capital\nto an Anatolian republic.",
    subtitle:
      "A national movement won authority through war, organization, and diplomacy.",
    year: "1919–1923",
    image: "ataturk",
    paragraphs: [
      "Mustafa Kemal’s arrival at Samsun in May 1919 became an emblematic beginning of the Turkish national movement. Congresses at Erzurum and Sivas helped coordinate resistance, while the Grand National Assembly opened in Ankara in April 1920. The movement was a coalition of officers, local organizations, religious figures, and political interests, not a republic fully formed from its first day.",
      "The war against Greek forces in western Anatolia was decisive, but not the only front. Fighting and diplomacy also involved Armenia, French forces in the south, Soviet Russia, and internal opponents. Agreements in the east and with France reduced the nationalists’ isolation. The victory at Sakarya in 1921 and the offensive of August 1922 broke the Greek military position. The recapture of İzmir in September was accompanied by catastrophe for its civilian population, including fire, killings, and mass flight.",
      "The assembly abolished the sultanate on 1 November 1922. Mehmed VI left the country later that month. The Republic of Turkey was proclaimed on 29 October 1923, with Ankara as its capital and Mustafa Kemal as president. The name Atatürk was granted to him in 1934; using it for earlier events identifies the same person without making it his contemporary surname.",
      "A separate Greek–Turkish convention signed in January 1923 mandated a compulsory population exchange primarily by religion, with specified exceptions. It regularized and extended the uprooting of Orthodox Christians from Turkey and Muslims from Greece. Nation-building brought recognized sovereignty, but also coercion, dispossession, and an increasingly centralized definition of belonging.",
    ],
    insight: {
      label: "A VICTORY WITH UNEQUAL CONSEQUENCES",
      text: "Diplomatic recognition secured the new state’s independence. It did not mean that all inhabitants had equal power to shape its national identity or retain their homes.",
    },
    sources: [10, 11, 16],
  },
  {
    id: "mandates",
    number: "11",
    eyebrow: "INDEPENDENCE DEFERRED",
    title: "New administrations.\nOld imperial habits.",
    subtitle:
      "The mandate system promised tutelage toward self-government while preserving outside control.",
    year: "1920–1946",
    image: "damascus",
    paragraphs: [
      "Article 22 of the League of Nations Covenant placed former Ottoman territories within a system of mandates. So-called Class A territories were described as communities whose existence as independent nations could be provisionally recognized, subject to administrative advice and assistance. In practice, Britain and France exercised decisive authority. The system differed legally from outright annexation, but it did not provide the immediate independence many inhabitants expected.",
      "At San Remo in April 1920, the principal Allied powers assigned mandates for Syria and Lebanon to France and Mesopotamia and Palestine to Britain. The instruments, local arrangements, and dates of effective administration differed. Faisal’s Arab government in Damascus was defeated by French forces at Maysalun in July 1920. France proclaimed Greater Lebanon and divided other parts of its sphere into several administrations before later reorganizations.",
      "Britain installed Faisal as king of Iraq in 1921 after the 1920 revolt exposed the costs of direct occupation. Iraq combined former Ottoman provincial territories through war, negotiation, and the eventual settlement of Mosul. Abdullah established his position in Transjordan, whose administration developed separately within the Palestine mandate framework. These arrangements involved local elites, resistance movements, and Hashemite ambitions, as well as European strategic interests.",
      "Mandate-era borders and institutions were contested from their beginnings. Syria’s revolt of 1925–1927, Iraqi opposition, Palestinian mobilization, and Lebanese debates about the state all challenged outside rule. Independence came through different combinations of treaties, declarations, international recognition, and military withdrawal. A single ‘birth date’ for each state obscures those stages.",
    ],
    insight: {
      label: "AN INDEPENDENCE DATE NEEDS A VERB",
      text: "Was a state proclaimed, a treaty signed, international recognition granted, or the last foreign troops withdrawn? Those events often occurred in different years.",
    },
    sources: [8, 12, 19],
  },
  {
    id: "palestine",
    number: "12",
    eyebrow: "A LONGER, CONTESTED HISTORY",
    title: "Palestine after\nOttoman rule.",
    subtitle:
      "Imperial change created a new political framework for national movements already taking shape.",
    year: "BEFORE 1914–1949",
    image: "jerusalem",
    paragraphs: [
      "Ottoman Palestine was part of several administrative districts rather than one province identical to the later mandate. Its Arabic-speaking Muslim and Christian majority lived in towns, villages, and agricultural communities alongside established Jewish communities. Modern Zionism emerged in the late nineteenth century amid European nationalism and antisemitism. Jewish migration and settlement under Ottoman rule preceded both the Balfour Declaration and the British occupation.",
      "Britain captured Jerusalem in 1917 and administered the territory militarily before establishing a civilian government in 1920. The League approved the Palestine mandate in 1922; it came into force in 1923. Its commitments to a Jewish national home and to the rights of the existing population were interpreted through unequal institutions and increasingly incompatible political ambitions. Jewish organizations built institutions and sought refuge and national self-determination; Palestinian Arabs demanded representative government and opposed policies they feared would dispossess or politically subordinate them.",
      "Land changed hands through purchases, including sales by absentee owners, but legal sale did not prevent tenant displacement or political conflict. Nor did all land change ownership through purchase. Immigration increased in changing waves, especially as persecution of European Jews intensified in the 1930s. British policy shifted between commitments and restrictions. Communal violence, the Palestinian Arab revolt of 1936–1939, British repression, and armed Zionist opposition transformed the struggle before the mandate ended.",
      "In 1947 the UN General Assembly recommended partition into Arab and Jewish states, with an international regime for Jerusalem. The proposal was not an implemented border agreement. Civil war followed; Israel declared independence on 14 May 1948, and neighboring Arab states entered the war as the mandate ended. During the 1947–1949 conflict, roughly 700,000 Palestinians fled or were expelled—the Nakba. Israel survived and expanded beyond the proposed partition allocation; the West Bank came under Jordanian control and Gaza under Egyptian administration. The armistice lines were not a final peace settlement.",
    ],
    insight: {
      label: "CONNECTION WITHOUT A SINGLE CAUSE",
      text: "Ottoman collapse made British rule possible. Later immigration, colonial decisions, the Holocaust, local political choices, and wars also shaped the conflict; the collapse alone cannot explain it.",
    },
    sources: [7, 8, 12, 13, 14],
  },
  {
    id: "kurdish-question",
    number: "13",
    eyebrow: "A PEOPLE ACROSS FRONTIERS",
    title: "A national question\nwithout a nation-state.",
    subtitle:
      "Kurdish communities entered a new order through several different states.",
    year: "1920–1926",
    image: "kurdistan",
    paragraphs: [
      "Kurdish-speaking populations lived across eastern Anatolia, northern Mesopotamia, western Iran, and adjoining areas. Their communities differed in language, religion, social organization, and political allegiance. Tribal authorities, landowners, urban intellectuals, religious leaders, and ordinary villagers did not necessarily share the same goals. Iran lay outside Ottoman sovereignty; Kurdish history cannot be contained within the Ottoman collapse alone.",
      "The late imperial period brought both centralization and opportunities for some Kurdish elites. During the First World War, different Kurdish groups served Ottoman forces, resisted state authority, suffered displacement, or participated in violence against Armenians. Acknowledging these distinct roles avoids treating an entire population as either a single perpetrator or a single victim.",
      "Sèvres envisaged local autonomy in a defined area and a conditional route to independence. The provisions depended on further procedures and decisions, including a League of Nations role; they were never implemented. Kurdish political fragmentation, Turkish nationalist victory, British priorities in Iraq, and the strategic importance of Mosul all shaped the outcome. Lausanne contained no equivalent provision for Kurdish autonomy or a Kurdish state.",
      "The resulting borders placed Kurdish communities within Turkey, Iraq, and Syria as well as Iran. Policies, opportunities, and forms of resistance subsequently differed sharply among those states. Later uprisings, repression, autonomy projects, and contemporary politics have their own histories. A population-distribution map is not a map of unanimous political opinion, and it cannot establish a single uncontested national border.",
    ],
    insight: {
      label: "WHY THE ATLAS USES POINTS AND A BROAD REGION",
      text: "Kurdish settlement is mixed and changes over time. The atlas identifies a broad historical population region without presenting it as a precise ethnic boundary or territorial claim.",
    },
    sources: [15, 9, 10],
  },
  {
    id: "caliphate",
    number: "14",
    eyebrow: "THE LAST IMPERIAL INSTITUTION",
    title: "The end of\nthe caliphate.",
    subtitle:
      "Political sovereignty and religious authority did not disappear on the same day.",
    year: "3 MARCH 1924",
    image: "caliph",
    paragraphs: [
      "The Ottoman sultan combined dynastic political authority with a claim to the caliphate, an institution invoking leadership of the Muslim community. The importance and reach of that claim changed over time. Abdülhamid II placed particular emphasis on it as European empires ruled increasing numbers of Muslims. Ottoman caliphs nevertheless did not govern all Muslims, and many religious and political authorities existed beyond their control.",
      "When the sultanate was abolished in November 1922, the assembly initially retained a separate caliphate and appointed Abdülmecid II. He was caliph without being sultan. This arrangement proved unstable: an institution associated with the dynasty could become an alternative focus of allegiance while the republican leadership consolidated authority.",
      "On 3 March 1924, the Turkish assembly abolished the caliphate and expelled members of the Ottoman dynasty. Related reforms reorganized religious administration and education. These changes were part of a longer process of centralization and secularizing reform, rather than the sudden disappearance of religion from Turkish society. The state continued to regulate religious life through new institutions.",
      "Responses extended far beyond Turkey. The Khilafat movement in British India had mobilized support for the Ottoman caliphate after the war, linking religious concerns to anticolonial politics. Elsewhere, thinkers and rulers debated new claims to authority, but no successor gained universal acceptance. The abolition clarified that the new republic would ground sovereignty in its national institutions, while leaving a wider argument about religious and political legitimacy unresolved.",
    ],
    insight: {
      label: "SULTAN AND CALIPH WERE DISTINCT OFFICES",
      text: "From November 1922 to March 1924 the Ottoman caliphate survived without an Ottoman sultanate. The distinction is institutional, not just a difference in titles.",
    },
    sources: [1, 11, 12],
  },
  {
    id: "contingency",
    number: "15",
    eyebrow: "HISTORY WAS NOT PREWRITTEN",
    title: "The futures\nthat did not happen.",
    subtitle:
      "Counterfactuals help identify choices—when their limits remain visible.",
    year: "PATHS NOT TAKEN",
    paragraphs: [
      "People in 1908, 1914, or 1920 did not know the map we now know. They acted with partial information, conflicting goals, and changing resources. Considering alternatives can illuminate those constraints. It cannot turn an imagined outcome into a fact or demonstrate that one different decision would have solved every later conflict.",
      "Neutrality in 1914 might have spared the empire the immediate scale of wartime destruction and preserved more room for reform. Yet neutrality depended on the conduct of other powers, the security of the Straits, internal politics, and the duration of the European war. It would not automatically have resolved debt, competing national movements, or the ambitions of neighboring states.",
      "Implementing Sèvres would have required an enduring military and political commitment to enforce it against resistance. One can examine its provisions and the groups who hoped to benefit; one cannot assume it would have created stable borders or protected every minority. Likewise, different arrangements for Arab independence would have faced disagreements among local leaders, regional interests, and European strategic demands.",
      "The most useful question is therefore not ‘Which alternate world was destined to work?’ It is ‘What did each actor believe was possible, what resources did they possess, and whose consent was missing?’ Those questions restore contingency without replacing history with wishful prediction.",
    ],
    insight: {
      label: "ANALYSIS, NOT A PARALLEL CHRONOLOGY",
      text: "The alternatives below are explicitly counterfactual. Established events and documents provide their starting points; their imagined outcomes cannot be verified.",
    },
    sources: [2, 3, 9, 19],
  },
  {
    id: "afterlives",
    number: "16",
    eyebrow: "THE WORLD THAT FOLLOWED",
    title: "The empire ended.\nIts history did not.",
    subtitle:
      "A changed political order, built on a deeply connected landscape.",
    year: "1924 → THE PRESENT",
    image: "bosphorus",
    paragraphs: [
      "The Ottoman collapse helped replace a multinational imperial system with states claiming more bounded forms of sovereignty. In Turkey, the national movement secured independence and constructed a republic with a new capital, institutions, and public identity. Across former Arab provinces, European mandates shaped administrative structures and delayed independence, while local movements contested the meaning and distribution of political authority.",
      "New borders reorganized trade, migration, citizenship, and family connections. They did not erase shared languages, religious traditions, urban cultures, or older administrative habits. Some officials and legal practices moved from imperial to national service. Others were deliberately displaced. Communities uprooted by genocide, war, expulsion, or population exchange carried versions of the Ottoman past into diasporas across the world.",
      "The Kurdish national question, the political history of Palestine, and disputes over territory and minorities were profoundly affected by the settlement. Their later development also depended on the Second World War, decolonization, the Cold War, oil economies, domestic authoritarianism, social movements, and decisions made long after the last sultan’s departure. Direct consequences must be distinguished from conditions that later actors transformed.",
      "There is no honest map on which every modern crisis can be traced to one line drawn in 1916. Nor was the empire a lost world free of hierarchy and violence. Its end was a sequence of choices and catastrophes that opened possibilities unevenly: sovereignty for some, subordination or displacement for others. Understanding that unevenness is more useful than searching for a single villain, a single treaty, or a single date on which the modern world began.",
    ],
    insight: {
      label: "THE QUESTION TO TAKE WITH YOU",
      text: "Whenever a border or an independence date appears inevitable, ask what preceded it, who negotiated it, whose experience it conceals, and what happened afterward.",
    },
    sources: [1, 11, 12, 15, 19],
  },
];
