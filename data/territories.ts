export type Territory = {
  id: string;
  name: string;
  label: string;
  coordinates: [number, number];
  before: string;
  war: string;
  after: string;
  milestones: string[];
  figures: string;
  legacy: string;
  sources: number[];
};
export const territories: Territory[] = [
  {
    id: "turkey",
    name: "Turkey",
    label: "Republic · 1923",
    coordinates: [33, 39],
    before:
      "Anatolia and eastern Thrace formed the core of the late empire, but their populations were linguistically and religiously diverse. Istanbul was the imperial capital.",
    war: "Anatolia supplied soldiers, food, and transport to multiple fronts. Genocide, persecution, deportation, and the movement of Muslim refugees transformed its demographic landscape.",
    after:
      "Allied occupation and Sèvres provoked resistance. Ankara’s national movement displaced the Istanbul government and secured a new settlement at Lausanne.",
    milestones: [
      "1920 · Grand National Assembly opens",
      "1922 · Sultanate abolished",
      "1923 · Lausanne; republic proclaimed",
      "1924 · Caliphate abolished",
      "1939 · Hatay incorporated",
    ],
    figures: "Mustafa Kemal, İsmet İnönü, Mehmed VI",
    legacy:
      "Sovereignty and republican institutions were secured through war and diplomacy. The project of a centralized Turkish national identity left unresolved questions about minority rights and Kurdish political aspirations.",
    sources: [10, 11],
  },
  {
    id: "iraq",
    name: "Iraq",
    label: "League admission · 1932",
    coordinates: [44, 33],
    before:
      "The later state drew on Ottoman territories associated with Basra, Baghdad, and Mosul. These provinces contained different communities and economies; they were not simply three perfectly matching pieces of a modern country.",
    war: "British and Indian forces advanced from the Gulf. Their defeat at Kut in 1916 was followed by the capture of Baghdad in 1917; Mosul was occupied after the armistice.",
    after:
      "A major revolt in 1920 challenged Britain. Faisal became king in 1921 within a British-dominated settlement. Treaties and the Mosul dispute shaped the state’s eventual territory and authority.",
    milestones: [
      "1920 · Revolt against British rule",
      "1921 · Faisal crowned king",
      "1926 · Mosul settlement",
      "1932 · Independence and League membership",
    ],
    figures: "Faisal I, Gertrude Bell, Iraqi political and religious leaders",
    legacy:
      "Formal independence did not remove British military and strategic influence. The state inherited tensions over central authority, regional power, and the status of Kurdish communities.",
    sources: [12, 15],
  },
  {
    id: "syria",
    name: "Syria",
    label: "French withdrawal · 1946",
    coordinates: [37, 35],
    before:
      "Ottoman ‘Syria’ described a wider historical region as well as changing administrative units. The modern state was not a single Ottoman province with unchanged borders.",
    war: "Requisition, famine in neighboring districts, military rule, and political repression shaped wartime life. Ottoman withdrawal in 1918 opened a contest over Arab independence.",
    after:
      "Faisal’s Damascus government was defeated by France at Maysalun in July 1920. France established several territorial administrations; resistance and negotiation later changed their organization.",
    milestones: [
      "1920 · Faisal’s kingdom defeated",
      "1925–1927 · Great Syrian Revolt",
      "1936 · Independence treaty negotiated but not ratified by France",
      "1946 · Final French troop withdrawal",
    ],
    figures: "Faisal, Sultan al-Atrash, Shukri al-Quwatli",
    legacy:
      "National institutions developed in opposition to French rule, but regional, communal, and political differences persisted within them. Later Syrian history cannot be explained by the mandate alone.",
    sources: [12],
  },
  {
    id: "lebanon",
    name: "Lebanon",
    label: "Independence · 1943",
    coordinates: [35.8, 33.9],
    before:
      "Mount Lebanon had a special Ottoman administrative status after the violence of 1860. Beirut and surrounding coastal and inland areas followed other administrative arrangements.",
    war: "Mount Lebanon suffered catastrophic famine produced by interacting blockade, requisition, transport, market, and environmental pressures.",
    after:
      "France proclaimed Greater Lebanon in September 1920, joining the mountain to Beirut and additional territories. Its new borders included populations with different ideas about independence, France, and connections with Syria.",
    milestones: [
      "1920 · Greater Lebanon proclaimed",
      "1926 · Republic and constitution",
      "1943 · Independence crisis and National Pact",
      "1946 · French withdrawal completed",
    ],
    figures: "Bishara al-Khuri, Riad al-Solh, Émile Eddé",
    legacy:
      "A confessional political arrangement became central to the republic. Independence was negotiated among local actors as well as against foreign authority; it was not completed by the 1920 proclamation.",
    sources: [12, 20],
  },
  {
    id: "jordan",
    name: "Jordan / Transjordan",
    label: "Independent kingdom · 1946",
    coordinates: [36.3, 31],
    before:
      "Territories east of the Jordan formed parts of Ottoman Syrian administration, with uneven state presence and powerful local and tribal networks.",
    war: "The Hejaz Railway and its stations connected Ottoman strategy to local society. The Arab Revolt and Allied advance disrupted those connections.",
    after:
      "Abdullah established an emirate in 1921 with British support. Transjordan was administered separately within the Palestine mandate framework; provisions concerning the Jewish national home were not applied there.",
    milestones: [
      "1921 · Emirate takes shape",
      "1922 · Separate mandate arrangements endorsed",
      "1946 · Independent Hashemite kingdom",
      "1949 · Name becomes Hashemite Kingdom of Jordan",
    ],
    figures: "Abdullah I, local tribal leaders, British administrators",
    legacy:
      "State-building joined Hashemite dynastic ambitions, local negotiation, and British strategic interests. Later Palestinian displacement and the West Bank’s changing status profoundly reshaped the kingdom.",
    sources: [8, 12],
  },
  {
    id: "palestine",
    name: "Palestine",
    label: "British mandate · 1923–1948",
    coordinates: [35.15, 31.75],
    before:
      "The territory later placed under the mandate crossed Ottoman administrative units. Palestinian Arab society included Muslim and Christian communities, alongside established and newly arriving Jewish communities.",
    war: "British occupation followed the campaign through Sinai and Palestine. The Balfour Declaration introduced a major British commitment regarding a Jewish national home.",
    after:
      "Military administration gave way to civilian government and a League mandate. Palestinian demands for representative independence met British authority and a competing Zionist national project.",
    milestones: [
      "1917 · Balfour Declaration; Jerusalem occupied",
      "1923 · Mandate enters into force",
      "1936–1939 · Palestinian Arab revolt",
      "1947 · UN partition recommendation",
      "1948–1949 · Nakba and territorial division",
    ],
    figures:
      "Musa Kazim al-Husayni, Haj Amin al-Husayni, Palestinian civic and rural organizers",
    legacy:
      "No independent Palestinian Arab state emerged from the mandate’s end. Mass displacement, statelessness, and subsequent occupation are central to Palestinian political history, with later milestones distinct from the Ottoman collapse.",
    sources: [7, 8, 12, 13],
  },
  {
    id: "israel",
    name: "Israel",
    label: "State declared · 1948",
    coordinates: [34.6, 31.2],
    before:
      "Israel did not exist as a sovereign state in the Ottoman period. Modern Zionism and Jewish immigration developed before 1914 alongside older Jewish communities in Palestine.",
    war: "Zionist diplomacy and the Balfour Declaration altered expectations. Jewish experiences during the war varied across communities and political affiliations.",
    after:
      "Under the mandate, Zionist institutions organized immigration, settlement, and political life. Persecution in Europe and the Holocaust intensified the urgency of refuge and statehood.",
    milestones: [
      "1917 · British declaration supports a national home",
      "1947 · UN recommends partition",
      "14 May 1948 · Israel declares independence",
      "1949 · Armistice agreements and UN membership",
    ],
    figures: "Chaim Weizmann, David Ben-Gurion, Golda Meir",
    legacy:
      "Israel’s establishment realized Jewish sovereignty while the accompanying war brought Palestinian mass displacement. Jewish migration from Europe and Middle Eastern countries continued to reshape the state after independence.",
    sources: [7, 8, 12, 13],
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    label: "Kingdom proclaimed · 1932",
    coordinates: [45, 24],
    before:
      "The Arabian Peninsula had varied relationships to the empire. The Hejaz was an Ottoman province with a sharif in Mecca; central Najd was not governed like the Levant. Ibn Saud took al-Hasa from Ottoman control in 1913.",
    war: "Hussein’s revolt challenged Ottoman power in the Hejaz. Ibn Saud pursued his own regional ambitions and relations with Britain, distinct from the Hashemite revolt.",
    after:
      "The Hashemite Kingdom of the Hejaz coexisted with expanding Saudi power before Ibn Saud conquered the Hejaz in 1924–1925. Territorial unification preceded the kingdom’s 1932 name and proclamation.",
    milestones: [
      "1902 · Ibn Saud captures Riyadh",
      "1913 · Al-Hasa taken",
      "1916 · Kingdom of the Hejaz",
      "1924–1925 · Saudi conquest of the Hejaz",
      "1932 · Saudi Arabia proclaimed",
    ],
    figures: "Abdulaziz Ibn Saud, Sharif Hussein",
    legacy:
      "The kingdom emerged through conquest, alliances, religious authority, and British diplomacy. It was not a British mandate or a state simply created by Sykes–Picot.",
    sources: [17, 12],
  },
  {
    id: "arabia",
    name: "Yemen & the Gulf",
    label: "Different paths through empire",
    coordinates: [45, 15.5],
    before:
      "Ottoman authority reached parts of Yemen and the Gulf at different times. Aden was British, while Oman and several Gulf sheikhdoms followed separate political histories and treaty relationships.",
    war: "Ottoman and local forces operated in Yemen while British power remained anchored around Aden and the Gulf. The peninsula was not a single Ottoman administrative unit.",
    after:
      "Imam Yahya consolidated power in northern Yemen after Ottoman withdrawal. British-controlled Aden and protectorate territories remained separate, as did other Gulf political entities.",
    milestones: [
      "1918 · Ottoman withdrawal from northern Yemen",
      "1934 · Saudi–Yemeni treaty",
      "1962 · North Yemeni republic proclaimed",
      "1967 · Independence in South Yemen",
      "1990 · Yemeni unification",
    ],
    figures: "Imam Yahya, regional rulers and tribal authorities",
    legacy:
      "The much later independence of Gulf states and southern Yemen should not be retroactively placed in 1918. Ottoman withdrawal was one transition within a longer regional history.",
    sources: [12, 17],
  },
  {
    id: "balkans",
    name: "The Balkans",
    label: "Most separation predates 1918",
    coordinates: [23, 42],
    before:
      "Ottoman rule in southeastern Europe receded through uprisings, interstate wars, diplomacy, and foreign intervention across the nineteenth century.",
    war: "By 1914, the empire retained eastern Thrace but had already lost most of its European territories. Balkan states entered the world war with their own alliances and rival territorial ambitions.",
    after:
      "The breakup of Austria-Hungary and the postwar settlement transformed southeastern Europe further. Those processes should not be confused with countries all becoming independent from the Ottomans in 1918.",
    milestones: [
      "1830 · Greek independence recognized",
      "1878 · Serbia, Romania, Montenegro recognized independent",
      "1908 · Bulgaria declares independence",
      "1912–1913 · Albania’s independence and recognition",
      "1913 · Ottoman European territory reduced to eastern Thrace",
    ],
    figures: "National movements, regional rulers, and great-power diplomats",
    legacy:
      "Population movements and rival territorial claims crossed imperial boundaries. Much of the Ottoman rupture had already taken place before the final world-war defeat.",
    sources: [1, 2, 12],
  },
];
