export type Source = {
  id: number;
  title: string;
  publisher: string;
  url: string;
  note: string;
  kind:
    "Scholarship" | "Museum" | "Primary document" | "Reference" | "Geography";
};
export const sources: Source[] = [
  {
    id: 1,
    title: "The Ottoman Empire, 1700–1922",
    publisher: "Donald Quataert · Cambridge University Press, 2005",
    url: "https://www.cambridge.org/highereducation/books/the-ottoman-empire-17001922/1C5EA59BC85BD7FE72F4754774DDDA23",
    note: "An introduction to institutions, economic change, society, and the limits of the traditional ‘decline’ narrative.",
    kind: "Scholarship",
  },
  {
    id: 2,
    title: "A Brief History of the Late Ottoman Empire",
    publisher: "M. Şükrü Hanioğlu · Princeton University Press, 2008",
    url: "https://press.princeton.edu/books/paperback/9780691146171/a-brief-history-of-the-late-ottoman-empire",
    note: "Reform, opposition, constitutional politics, and the empire’s final century.",
    kind: "Scholarship",
  },
  {
    id: 3,
    title: "The Fall of the Ottomans: The Great War in the Middle East",
    publisher: "Eugene Rogan · Basic Books, 2015",
    url: "https://www.hachettebookgroup.com/titles/eugene-rogan/the-fall-of-the-ottomans/9780465097425/",
    note: "The wartime campaigns and the experience of soldiers and civilians.",
    kind: "Scholarship",
  },
  {
    id: 4,
    title: "The Armenian Genocide (1915–16): Overview",
    publisher: "United States Holocaust Memorial Museum",
    url: "https://encyclopedia.ushmm.org/content/en/article/the-armenian-genocide-1915-16-overview",
    note: "The genocide’s historical context, deportation policies, mass killing, and death toll estimates.",
    kind: "Museum",
  },
  {
    id: 5,
    title: "What Was the Gallipoli Campaign?",
    publisher: "Imperial War Museums",
    url: "https://www.iwm.org.uk/history/what-you-need-to-know-about-the-gallipoli-campaign",
    note: "The Allied attempt to force the Dardanelles and the failure of the land campaign.",
    kind: "Museum",
  },
  {
    id: 6,
    title: "The Sykes–Picot Agreement, 1916",
    publisher: "The Avalon Project · Yale Law School",
    url: "https://avalon.law.yale.edu/20th_century/sykes.asp",
    note: "Primary text. Read the distinctions between direct administration and spheres of influence.",
    kind: "Primary document",
  },
  {
    id: 7,
    title: "The Balfour Declaration, 1917",
    publisher: "The Avalon Project · Yale Law School",
    url: "https://avalon.law.yale.edu/20th_century/balfour.asp",
    note: "A British declaration, not a treaty; its two qualifications are essential to understanding the text.",
    kind: "Primary document",
  },
  {
    id: 8,
    title: "The Palestine Mandate, 1922",
    publisher: "The Avalon Project · Yale Law School",
    url: "https://avalon.law.yale.edu/20th_century/palmanda.asp",
    note: "Primary text, including articles on the Jewish national home, citizenship, institutions, and Transjordan.",
    kind: "Primary document",
  },
  {
    id: 9,
    title: "Treaty of Sèvres",
    publisher: "Encyclopaedia Britannica",
    url: "https://www.britannica.com/event/Treaty-of-Sevres",
    note: "The signed but unimplemented settlement of 1920 and its proposed restrictions on Ottoman sovereignty.",
    kind: "Reference",
  },
  {
    id: 10,
    title: "Treaty of Lausanne",
    publisher: "Encyclopaedia Britannica",
    url: "https://www.britannica.com/event/Treaty-of-Lausanne-1923",
    note: "The 1923 settlement; distinguish the peace treaty from the separate population-exchange convention.",
    kind: "Reference",
  },
  {
    id: 11,
    title: "Turkey: A Modern History",
    publisher: "Erik J. Zürcher · I.B. Tauris, 2017",
    url: "https://www.bloomsbury.com/uk/turkey-9781784531874/",
    note: "The Young Turks, the national movement, and the institutions of the republic.",
    kind: "Scholarship",
  },
  {
    id: 12,
    title: "A History of the Modern Middle East",
    publisher: "William L. Cleveland & Martin Bunton · Westview Press, 2016",
    url: "https://www.routledge.com/A-History-of-the-Modern-Middle-East/Cleveland-Bunton/p/book/9780813349800",
    note: "Mandate rule, Arab politics, and the development of states in their regional context.",
    kind: "Scholarship",
  },
  {
    id: 13,
    title: "The Question of Palestine: History",
    publisher: "United Nations",
    url: "https://www.un.org/unispal/history/",
    note: "A documentary chronology of the mandate, partition proposal, war, and Palestinian displacement; read alongside historical scholarship.",
    kind: "Reference",
  },
  {
    id: 14,
    title:
      "The Balfour Declaration: Empire, the Mandate and Resistance in Palestine",
    publisher: "Bernard Regan · Verso, 2017",
    url: "https://www.versobooks.com/products/484-the-balfour-declaration",
    note: "British policy, Palestinian resistance, and the mandate’s political contradictions.",
    kind: "Scholarship",
  },
  {
    id: 15,
    title: "A Modern History of the Kurds",
    publisher: "David McDowall · I.B. Tauris, 2021",
    url: "https://www.bloomsbury.com/uk/a-modern-history-of-the-kurds-9780755600750/",
    note: "Kurdish communities, distinct political movements, and the state systems of Turkey, Iraq, Syria, and Iran.",
    kind: "Scholarship",
  },
  {
    id: 16,
    title:
      "The Thirty-Year Genocide: Turkey’s Destruction of Its Christian Minorities, 1894–1924",
    publisher: "Benny Morris & Dror Ze’evi · Harvard University Press, 2019",
    url: "https://www.hup.harvard.edu/books/9780674916456",
    note: "A comparative interpretation of violence against Armenian, Assyrian, and Greek Christians; the groups’ experiences and chronologies must remain distinct.",
    kind: "Scholarship",
  },
  {
    id: 17,
    title: "A History of Saudi Arabia",
    publisher: "Madawi Al-Rasheed · Cambridge University Press, 2010",
    url: "https://www.cambridge.org/core/books/history-of-saudi-arabia/1C499DA74EC7147305236A70C1F7C7DB",
    note: "The conquest and unification of regions with differing relationships to Ottoman authority.",
    kind: "Scholarship",
  },
  {
    id: 18,
    title: "Natural Earth · 1:110m cultural vectors",
    publisher: "Natural Earth · public domain",
    url: "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
    note: "Contemporary reference geography only. Historical status markers and indicative zones are editorial annotations, not surveyed historical boundaries. Natural Earth generally represents de facto control.",
    kind: "Geography",
  },
  {
    id: 19,
    title: "The Great War and the Middle East",
    publisher: "Rob Johnson · Oxford University Press, 2016",
    url: "https://global.oup.com/academic/product/the-great-war-and-the-middle-east-9780199683284",
    note: "Strategy, alliances, the Arab Revolt, and the uncertain relationship between wartime plans and postwar outcomes.",
    kind: "Scholarship",
  },
  {
    id: 20,
    title: "The Great Famine in Mount Lebanon",
    publisher:
      "International Encyclopedia of the First World War · Freie Universität Berlin",
    url: "https://encyclopedia.1914-1918-online.net/article/food-and-nutrition-ottoman-empiremiddle-east/",
    note: "Wartime provisioning, blockade, requisition, market failures, and famine in the Ottoman Middle East.",
    kind: "Reference",
  },
];
