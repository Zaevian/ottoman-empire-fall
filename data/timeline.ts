export type TimelineEvent = {
  date: string;
  year: number;
  title: string;
  summary: string;
  detail: string;
  category: "Reform" | "War" | "Diplomacy" | "Statehood" | "People";
  sources: number[];
};
export const events: TimelineEvent[] = [
  {
    date: "23 December 1876",
    year: 1876,
    title: "An Ottoman constitution",
    summary:
      "A parliament and constitution promise a new basis for imperial government.",
    detail:
      "The constitution was proclaimed under Abdülhamid II. He suspended parliament in 1878; its restoration would become a central goal of the opposition. Constitutional rule and imperial survival were already linked before 1908.",
    category: "Reform",
    sources: [2],
  },
  {
    date: "13 July 1878",
    year: 1878,
    title: "The Congress of Berlin",
    summary:
      "European diplomacy revises the settlement after the Russo-Turkish War.",
    detail:
      "The treaty recognized the independence of Serbia, Romania, and Montenegro, and reorganized Bulgaria’s status. Austria-Hungary occupied Bosnia-Herzegovina. These changes belong to the nineteenth-century dismantling of Ottoman power in Europe, not the settlement of 1918.",
    category: "Diplomacy",
    sources: [1, 2],
  },
  {
    date: "December 1881",
    year: 1881,
    title: "Debt under foreign supervision",
    summary:
      "The Ottoman Public Debt Administration takes control of designated revenues.",
    detail:
      "The arrangement followed default and negotiations with creditors. It gave foreign financial interests an institutional presence in Ottoman revenue collection while the empire remained sovereign in other respects.",
    category: "Reform",
    sources: [1],
  },
  {
    date: "July 1908",
    year: 1908,
    title: "The Young Turk Revolution",
    summary:
      "The constitutional order is restored amid hopes of shared citizenship.",
    detail:
      "Officers and activists forced the restoration of parliamentary rule. The celebration included several religious and ethnic communities, but constitutional politics soon encountered war, competing national demands, and struggles over centralization.",
    category: "Reform",
    sources: [2, 11],
  },
  {
    date: "October 1908",
    year: 1908,
    title: "A Balkan rupture",
    summary:
      "Bulgaria declares independence; Austria-Hungary annexes Bosnia-Herzegovina.",
    detail:
      "The crises challenged the new constitutional government immediately. Bosnia-Herzegovina had already been occupied and administered by Austria-Hungary since 1878; annexation changed its formal status.",
    category: "Statehood",
    sources: [2],
  },
  {
    date: "27 April 1909",
    year: 1909,
    title: "Abdülhamid II deposed",
    summary: "A counterrevolutionary crisis ends with a change of sultan.",
    detail:
      "Forces supporting the constitutional order suppressed the uprising in Istanbul. Mehmed V replaced Abdülhamid II. Political power increasingly lay with organized political and military actors rather than with the monarch alone.",
    category: "Reform",
    sources: [2, 11],
  },
  {
    date: "September 1911–October 1912",
    year: 1911,
    title: "War with Italy",
    summary: "Italy attacks Ottoman Libya and occupies the Dodecanese.",
    detail:
      "Ottoman officers organized resistance in Libya, but sea power and wider diplomatic pressures favored Italy. The conflict exposed imperial vulnerability shortly before war broke out in the Balkans.",
    category: "War",
    sources: [2, 3],
  },
  {
    date: "October 1912–August 1913",
    year: 1912,
    title: "The Balkan Wars",
    summary: "Most remaining Ottoman territory in Europe is lost.",
    detail:
      "Defeat displaced large populations and transformed Ottoman politics. The empire recovered Edirne in the second Balkan War, but not the broader European lands lost in the first. Albania’s independence followed a separate and contested diplomatic path.",
    category: "War",
    sources: [3, 11],
  },
  {
    date: "23 January 1913",
    year: 1913,
    title: "The CUP seizes the initiative",
    summary:
      "A coup in Istanbul strengthens the Committee of Union and Progress.",
    detail:
      "The raid on the Sublime Porte helped the CUP consolidate power. Wartime losses, refugee pressures, and fears of further partition formed the setting for a more authoritarian political order.",
    category: "Reform",
    sources: [2, 11],
  },
  {
    date: "2 August 1914",
    year: 1914,
    title: "A secret German alliance",
    summary:
      "Ottoman leaders seek protection through an alliance with Germany.",
    detail:
      "The alliance did not produce immediate entry into the war. Ottoman officials remained divided about timing, resources, and the likely consequences of becoming a belligerent.",
    category: "Diplomacy",
    sources: [3, 19],
  },
  {
    date: "29 October–5 November 1914",
    year: 1914,
    title: "The empire enters the war",
    summary: "Black Sea attacks are followed by declarations of war.",
    detail:
      "Ottoman warships attacked Russian ports on 29 October. Russia declared war on 2 November; Britain and France followed on 5 November. This sequence distinguishes the August alliance from active participation.",
    category: "War",
    sources: [3, 19],
  },
  {
    date: "December 1914–January 1915",
    year: 1914,
    title: "Disaster at Sarıkamış",
    summary: "An offensive against Russia collapses in winter conditions.",
    detail:
      "Operational decisions, inadequate supplies, disease, and extreme cold compounded military losses. The defeat was later used within a broader rhetoric of internal betrayal that targeted Armenian civilians.",
    category: "War",
    sources: [3, 4],
  },
  {
    date: "24 April 1915",
    year: 1915,
    title: "Armenian leaders arrested",
    summary:
      "Arrests in Constantinople become a central date of genocide remembrance.",
    detail:
      "The destruction extended far beyond these arrests. Deportations, massacres, starvation, abduction, and dispossession targeted Armenian communities across large parts of the empire during 1915–1916.",
    category: "People",
    sources: [4],
  },
  {
    date: "April 1915–January 1916",
    year: 1915,
    title: "Gallipoli",
    summary: "Ottoman forces defeat the Allied attempt to seize the peninsula.",
    detail:
      "Landings followed the failure of the naval attempt to force the Dardanelles. The campaign ended in Allied evacuation, preserving the Ottoman capital while other fronts continued to consume men and supplies.",
    category: "War",
    sources: [3, 5],
  },
  {
    date: "July 1915–March 1916",
    year: 1915,
    title: "Hussein and McMahon correspond",
    summary:
      "Arab independence is discussed with disputed territorial qualifications.",
    detail:
      "The letters did not settle all boundaries or interpretations. Hussein and British officials understood exclusions differently, especially concerning Syria and Palestine. Later diplomacy deepened these disputes.",
    category: "Diplomacy",
    sources: [12, 19],
  },
  {
    date: "16 May 1916",
    year: 1916,
    title: "Sykes–Picot concluded",
    summary:
      "Britain and France allocate proposed zones of control and influence.",
    detail:
      "The agreement distinguished direct administration from spheres involving an Arab state or confederation. It proposed an international arrangement for much of Palestine and did not become a literal blueprint for every modern border.",
    category: "Diplomacy",
    sources: [6],
  },
  {
    date: "June 1916",
    year: 1916,
    title: "The Arab Revolt begins",
    summary: "Sharif Hussein challenges Ottoman rule in the Hejaz.",
    detail:
      "His forces and those of his sons cooperated with Britain. The revolt’s geographical and political reach changed over time; many Arab subjects continued to serve the Ottoman state.",
    category: "War",
    sources: [3, 19],
  },
  {
    date: "11 March 1917",
    year: 1917,
    title: "British-led forces take Baghdad",
    summary:
      "A renewed Mesopotamian offensive reverses the earlier defeat at Kut.",
    detail:
      "British and Indian forces made up the army advancing from the Gulf. The occupation helped shape the postwar British position in Iraq, but did not itself establish an independent Iraqi state.",
    category: "War",
    sources: [3],
  },
  {
    date: "2 November 1917",
    year: 1917,
    title: "The Balfour Declaration",
    summary: "Britain supports a Jewish national home in Palestine.",
    detail:
      "The declaration included qualifications on civil and religious rights and on Jewish political status elsewhere. Its language neither established a sovereign state nor specified final borders.",
    category: "Diplomacy",
    sources: [7],
  },
  {
    date: "December 1917",
    year: 1917,
    title: "Jerusalem changes hands",
    summary: "British-led forces occupy the city after Ottoman withdrawal.",
    detail:
      "The military administration preceded the civilian government and formal League mandate. The transition altered political opportunities for both Zionist institutions and Palestinian Arab movements.",
    category: "War",
    sources: [3, 12],
  },
  {
    date: "September–October 1918",
    year: 1918,
    title: "The southern front collapses",
    summary:
      "Megiddo and the advance into Syria break Ottoman military positions.",
    detail:
      "British-led and allied Arab forces advanced as Ottoman armies retreated. Bulgaria’s armistice also exposed the empire’s connections to its Central Powers allies.",
    category: "War",
    sources: [3, 19],
  },
  {
    date: "30 October 1918",
    year: 1918,
    title: "The Armistice of Mudros",
    summary: "The Ottoman government accepts the cessation of hostilities.",
    detail:
      "Demobilization and Allied access to strategic points severely restricted Ottoman freedom of action. The armistice was not a final peace treaty and did not abolish the sultanate.",
    category: "Diplomacy",
    sources: [3, 11],
  },
  {
    date: "November 1918 / March 1920",
    year: 1918,
    title: "Istanbul under Allied occupation",
    summary: "An initial Allied presence becomes a formal occupation in 1920.",
    detail:
      "Distinguishing these stages explains why different dates appear in accounts of occupation. The Ottoman government remained, but its political authority and freedom were constrained.",
    category: "War",
    sources: [11],
  },
  {
    date: "May 1919",
    year: 1919,
    title: "İzmir and Samsun",
    summary: "Greek forces land at İzmir; Mustafa Kemal arrives at Samsun.",
    detail:
      "The landing and its aftermath strengthened resistance to partition. Mustafa Kemal’s journey became the symbolic opening of the organized national struggle, though local resistance already existed.",
    category: "War",
    sources: [11],
  },
  {
    date: "April 1920",
    year: 1920,
    title: "Ankara and San Remo",
    summary: "The Turkish assembly opens while the Allies allocate mandates.",
    detail:
      "The Grand National Assembly opened on 23 April. The San Remo conference assigned British and French mandate responsibilities, showing rival projects for sovereignty advancing at the same time.",
    category: "Statehood",
    sources: [11, 12],
  },
  {
    date: "July–September 1920",
    year: 1920,
    title: "Revolt, defeat, new administrations",
    summary:
      "Iraq rises against Britain; France defeats Faisal and proclaims Greater Lebanon.",
    detail:
      "The Iraqi revolt exposed occupation’s costs. French victory at Maysalun ended Faisal’s Damascus government. Greater Lebanon was proclaimed in September, but independence lay more than two decades ahead.",
    category: "People",
    sources: [12],
  },
  {
    date: "10 August 1920",
    year: 1920,
    title: "The Treaty of Sèvres",
    summary: "Ottoman representatives sign a sweeping partition settlement.",
    detail:
      "The Ankara movement rejected the treaty. Its proposed Armenian and conditional Kurdish arrangements, Greek gains, and sovereignty restrictions were not implemented as the final settlement.",
    category: "Diplomacy",
    sources: [9, 15],
  },
  {
    date: "1921",
    year: 1921,
    title: "Hashemite states take shape",
    summary:
      "Faisal becomes king of Iraq; Abdullah consolidates authority in Transjordan.",
    detail:
      "British support was decisive, but local elites, opposition, and regional dynastic ambitions also mattered. These arrangements did not mean the immediate end of British influence or mandate responsibilities.",
    category: "Statehood",
    sources: [12],
  },
  {
    date: "August–November 1922",
    year: 1922,
    title: "Victory and the end of the sultanate",
    summary:
      "Turkish nationalist victory is followed by abolition of the monarchy.",
    detail:
      "The August offensive defeated Greek forces in Anatolia. After the Mudanya armistice, the assembly abolished the sultanate on 1 November. A separate caliphate briefly remained.",
    category: "Statehood",
    sources: [11],
  },
  {
    date: "24 July / 29 October 1923",
    year: 1923,
    title: "Lausanne and the republic",
    summary:
      "A new peace treaty precedes the proclamation of the Turkish Republic.",
    detail:
      "Lausanne recognized a changed sovereignty and territorial settlement; the republic was proclaimed three months later. The Mosul boundary remained for later resolution.",
    category: "Statehood",
    sources: [10, 11],
  },
  {
    date: "3 March 1924",
    year: 1924,
    title: "The caliphate is abolished",
    summary: "The assembly ends the remaining Ottoman dynastic institution.",
    detail:
      "The decision separated the republic from a potential rival center of allegiance. Responses across the Muslim world differed, and no new claimant secured universal recognition.",
    category: "Reform",
    sources: [11, 12],
  },
  {
    date: "1932",
    year: 1932,
    title: "Two different paths to statehood",
    summary: "Iraq joins the League of Nations; Saudi Arabia is proclaimed.",
    detail:
      "Iraq’s League admission marked formal independence after a British mandate relationship. Saudi Arabia’s proclamation united territories conquered under Ibn Saud whose previous relations with Ottoman power varied.",
    category: "Statehood",
    sources: [12, 17],
  },
  {
    date: "1943–1946",
    year: 1943,
    title: "Levantine independence and withdrawal",
    summary: "Lebanon, Syria, and Transjordan pass distinct milestones.",
    detail:
      "Lebanon’s 1943 independence crisis preceded French troop withdrawal in 1946. Syria also saw final French withdrawal in 1946. Transjordan became an independent kingdom in 1946 through a different British treaty process.",
    category: "Statehood",
    sources: [12],
  },
  {
    date: "1947–1949",
    year: 1948,
    title: "Partition proposal, war, displacement",
    summary:
      "The mandate ends; Israel is established; Palestinians experience the Nakba.",
    detail:
      "The UN proposed partition in November 1947. Israel declared independence in May 1948. War produced mass Palestinian displacement and 1949 armistice lines, not an agreed final peace or the proposed Palestinian Arab state.",
    category: "People",
    sources: [12, 13],
  },
];
