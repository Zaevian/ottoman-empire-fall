export type Rule =
  "Ottoman" | "Independent" | "British" | "French" | "Contested" | "Proposed";
export const eraKeys = [
  "1683",
  "1914",
  "1918",
  "1920",
  "1923",
  "1932",
  "Modern",
] as const;
export type Era = (typeof eraKeys)[number];
export const eras: Record<Era, { title: string; description: string }> = {
  "1683": {
    title: "An imperial world",
    description:
      "A late-seventeenth-century reference point near the empire’s greatest reach. Provincial government, tributary relationships, and regional autonomy differed. Markers show selected places, not exact borders.",
  },
  "1914": {
    title: "On the eve of war",
    description:
      "The map has contracted. Egypt was British-occupied while still nominally Ottoman until December 1914; Libya had been lost to Italy. Most Balkan independence predates the world war.",
  },
  "1918": {
    title: "Defeat and occupation",
    description:
      "Late 1918: Allied forces occupy strategic places after the Ottoman military collapse. Occupation does not yet mean an agreed final border or an independent successor state.",
  },
  "1920": {
    title: "A settlement proposed",
    description:
      "Sèvres and the mandate allocations offered competing futures. The treaty’s Anatolian provisions were not implemented. Proposed arrangements are distinguished from actual administration.",
  },
  "1923": {
    title: "Republic and mandates",
    description:
      "Lausanne and the Turkish Republic reshape Anatolia. British and French mandates govern much of the former Arab provinces. Mosul’s final settlement still lies ahead.",
  },
  "1932": {
    title: "Different roads to independence",
    description:
      "Iraq enters the League of Nations and Saudi Arabia is proclaimed. Syria, Lebanon, Palestine, and Transjordan remain under mandate arrangements; the region does not become independent all at once.",
  },
  Modern: {
    title: "The contemporary reference map",
    description:
      "Contemporary reference geography is shown for orientation. Country lines cannot express every disputed claim, military control, or political aspiration. Israel, Palestine, and later changes are explained separately in the territory profiles.",
  },
};
type Status = [Rule, string];
export type AtlasPlace = {
  id: string;
  name: string;
  coordinates: [number, number];
  status: Record<Era, Status>;
};
export const places: AtlasPlace[] = [
  {
    id: "istanbul",
    name: "Istanbul",
    coordinates: [28.98, 41.01],
    status: {
      "1683": [
        "Ottoman",
        "The imperial capital and center of the sultan’s government.",
      ],
      "1914": [
        "Ottoman",
        "Capital of a constitutional empire increasingly dominated by the CUP.",
      ],
      "1918": [
        "Contested",
        "Allied forces enter in November; the sultan’s government remains under constraint.",
      ],
      "1920": [
        "Contested",
        "Formal Allied occupation; Sèvres proposes an international Straits regime.",
      ],
      "1923": [
        "Independent",
        "Allied evacuation follows Lausanne. Ankara becomes the republic’s capital.",
      ],
      "1932": [
        "Independent",
        "A major city in the Republic of Turkey, no longer its capital.",
      ],
      Modern: [
        "Independent",
        "Istanbul, Turkey. The Bosphorus remains a strategically important passage.",
      ],
    },
  },
  {
    id: "ankara",
    name: "Ankara",
    coordinates: [32.86, 39.93],
    status: {
      "1683": [
        "Ottoman",
        "An Anatolian town within the Ottoman provincial order.",
      ],
      "1914": [
        "Ottoman",
        "An inland provincial center, not yet a national capital.",
      ],
      "1918": [
        "Ottoman",
        "Ottoman authority persists as resistance organizations begin to develop.",
      ],
      "1920": [
        "Contested",
        "The Grand National Assembly opens here and rejects the Istanbul government’s settlement.",
      ],
      "1923": ["Independent", "Capital of the new Republic of Turkey."],
      "1932": [
        "Independent",
        "The institutional center of a rapidly reforming republic.",
      ],
      Modern: [
        "Independent",
        "Turkey’s capital and seat of national institutions.",
      ],
    },
  },
  {
    id: "belgrade",
    name: "Belgrade",
    coordinates: [20.46, 44.81],
    status: {
      "1683": [
        "Ottoman",
        "A strategic Ottoman fortress on the Danube frontier.",
      ],
      "1914": [
        "Independent",
        "Capital of Serbia, whose independence was internationally recognized in 1878.",
      ],
      "1918": [
        "Independent",
        "Part of the emerging Kingdom of Serbs, Croats, and Slovenes.",
      ],
      "1920": [
        "Independent",
        "Capital of the Kingdom of Serbs, Croats, and Slovenes.",
      ],
      "1923": [
        "Independent",
        "Outside the former empire’s final Anatolian and mandate settlements.",
      ],
      "1932": [
        "Independent",
        "Capital of the kingdom renamed Yugoslavia in 1929.",
      ],
      Modern: [
        "Independent",
        "Capital of Serbia. This path includes later Yugoslav history, not just Ottoman withdrawal.",
      ],
    },
  },
  {
    id: "damascus",
    name: "Damascus",
    coordinates: [36.29, 33.51],
    status: {
      "1683": [
        "Ottoman",
        "A provincial center and major departure point for the pilgrimage caravan to Mecca.",
      ],
      "1914": [
        "Ottoman",
        "An Ottoman provincial capital with Arab cultural and political networks.",
      ],
      "1918": [
        "Contested",
        "Faisal’s Arab administration develops after Ottoman withdrawal.",
      ],
      "1920": [
        "French",
        "France defeats Faisal’s government in July and establishes military and administrative control.",
      ],
      "1923": [
        "French",
        "The French mandate system comes into force, with multiple territorial administrations.",
      ],
      "1932": [
        "French",
        "Nationalist opposition continues under French mandate authority.",
      ],
      Modern: [
        "Independent",
        "Capital of Syria; subsequent independence, conflict, and political change have their own histories.",
      ],
    },
  },
  {
    id: "beirut",
    name: "Beirut",
    coordinates: [35.5, 33.89],
    status: {
      "1683": [
        "Ottoman",
        "An Ottoman Levantine port; mountain and coastal administration were not identical.",
      ],
      "1914": [
        "Ottoman",
        "A provincial capital; nearby Mount Lebanon had a separate special status.",
      ],
      "1918": ["Contested", "Allied occupation follows Ottoman withdrawal."],
      "1920": [
        "French",
        "Capital of Greater Lebanon, proclaimed by France in September.",
      ],
      "1923": ["French", "Part of the French mandate for Syria and Lebanon."],
      "1932": [
        "French",
        "Capital of the Lebanese Republic under French mandate authority.",
      ],
      Modern: [
        "Independent",
        "Capital of Lebanon, whose independence and French withdrawal occurred in distinct stages.",
      ],
    },
  },
  {
    id: "jerusalem",
    name: "Jerusalem",
    coordinates: [35.21, 31.77],
    status: {
      "1683": [
        "Ottoman",
        "A city of Muslim, Christian, and Jewish religious significance within Ottoman rule.",
      ],
      "1914": [
        "Ottoman",
        "Center of a separately administered Ottoman district, not a province matching the later mandate.",
      ],
      "1918": [
        "British",
        "Under British military occupation since December 1917.",
      ],
      "1920": [
        "British",
        "A British civilian administration replaces military government.",
      ],
      "1923": [
        "British",
        "The Palestine mandate enters into force with conflicting national expectations.",
      ],
      "1932": [
        "British",
        "Mandate rule continues amid escalating disputes over immigration, land, and political rights.",
      ],
      Modern: [
        "Contested",
        "Jerusalem’s sovereignty and final status remain disputed. Israel controls the city; East Jerusalem is internationally regarded as occupied Palestinian territory.",
      ],
    },
  },
  {
    id: "baghdad",
    name: "Baghdad",
    coordinates: [44.37, 33.32],
    status: {
      "1683": [
        "Ottoman",
        "An Ottoman provincial center after its recapture from Safavid Iran in 1638.",
      ],
      "1914": [
        "Ottoman",
        "Capital of an Ottoman province linked to trade along the Tigris.",
      ],
      "1918": ["British", "Occupied by British-led forces since March 1917."],
      "1920": [
        "British",
        "British administration is challenged by a major revolt across Iraq.",
      ],
      "1923": [
        "British",
        "Faisal rules a kingdom under substantial British authority and treaty constraints.",
      ],
      "1932": [
        "Independent",
        "Iraq joins the League of Nations, ending the formal mandate relationship.",
      ],
      Modern: [
        "Independent",
        "Capital of Iraq. Later wars and political transformations go beyond the mandate settlement.",
      ],
    },
  },
  {
    id: "mosul",
    name: "Mosul",
    coordinates: [43.13, 36.35],
    status: {
      "1683": [
        "Ottoman",
        "A northern Mesopotamian center within Ottoman government.",
      ],
      "1914": [
        "Ottoman",
        "A provincial capital in a diverse region of Arab, Kurdish, and other communities.",
      ],
      "1918": [
        "British",
        "British forces occupy Mosul after the Mudros armistice.",
      ],
      "1920": [
        "Contested",
        "Turkey and Britain dispute the province’s future.",
      ],
      "1923": [
        "Contested",
        "Lausanne leaves the Mosul question to later negotiations and League procedures.",
      ],
      "1932": [
        "Independent",
        "Within Iraq after the 1926 settlement of the Turkish–Iraqi boundary.",
      ],
      Modern: [
        "Independent",
        "A major Iraqi city, within a region whose communities have experienced profound later upheaval.",
      ],
    },
  },
  {
    id: "mecca",
    name: "Mecca",
    coordinates: [39.83, 21.42],
    status: {
      "1683": [
        "Ottoman",
        "The sharif governs locally within Ottoman sovereignty and pilgrimage patronage.",
      ],
      "1914": [
        "Ottoman",
        "Within the Hejaz province, with the sharif retaining a distinctive local role.",
      ],
      "1918": [
        "Independent",
        "Center of Hussein’s Hashemite Kingdom of the Hejaz after the Arab Revolt.",
      ],
      "1920": [
        "Independent",
        "The Hashemite kingdom persists, separate from the mandate administrations.",
      ],
      "1923": [
        "Independent",
        "Still within the Hashemite Hejaz, before Saudi conquest.",
      ],
      "1932": [
        "Independent",
        "Within the newly proclaimed Saudi Arabia after the conquest of 1924–1925.",
      ],
      Modern: [
        "Independent",
        "Mecca, Saudi Arabia. The kingdom’s origins involve a distinct Arabian unification process.",
      ],
    },
  },
  {
    id: "sanaa",
    name: "Sana’a",
    coordinates: [44.21, 15.35],
    status: {
      "1683": [
        "Independent",
        "The Qasimi imamate had expelled Ottoman forces from Yemen in the seventeenth century.",
      ],
      "1914": [
        "Ottoman",
        "Ottoman rule coexists with substantial authority recognized for Imam Yahya after the 1911 settlement.",
      ],
      "1918": [
        "Independent",
        "Ottoman withdrawal allows Imam Yahya to consolidate an independent northern Yemeni state.",
      ],
      "1920": [
        "Independent",
        "Under Imam Yahya; British Aden and southern protectorates remain separate.",
      ],
      "1923": [
        "Independent",
        "The northern Yemeni kingdom is not a League mandate.",
      ],
      "1932": [
        "Independent",
        "An independent kingdom; the Saudi–Yemeni conflict and treaty follow in 1934.",
      ],
      Modern: [
        "Contested",
        "Within Yemen’s internationally recognized territory. Contemporary armed control and political authority remain divided.",
      ],
    },
  },
  {
    id: "cairo",
    name: "Cairo",
    coordinates: [31.24, 30.04],
    status: {
      "1683": [
        "Ottoman",
        "Egypt is an Ottoman province with powerful local military and political elites.",
      ],
      "1914": [
        "British",
        "Britain has occupied Egypt since 1882. Ottoman suzerainty formally ends with the British protectorate in December.",
      ],
      "1918": [
        "British",
        "British protectorate, outside direct Ottoman administration.",
      ],
      "1920": [
        "British",
        "The nationalist movement challenges the protectorate after the 1919 revolution.",
      ],
      "1923": [
        "Independent",
        "A kingdom after Britain’s qualified declaration of Egyptian independence in 1922.",
      ],
      "1932": [
        "Independent",
        "Nominally independent, while British military and strategic influence remains substantial.",
      ],
      Modern: [
        "Independent",
        "Capital of Egypt. Its route out of empire differs from the League mandates.",
      ],
    },
  },
  {
    id: "tripoli",
    name: "Tripoli",
    coordinates: [13.19, 32.89],
    status: {
      "1683": [
        "Ottoman",
        "An Ottoman North African regency with substantial local autonomy.",
      ],
      "1914": [
        "Contested",
        "Italy claims Libya after the 1911–1912 war, but faces sustained local resistance.",
      ],
      "1918": [
        "Contested",
        "Italian colonial rule remains contested by resistance.",
      ],
      "1920": ["Contested", "Colonial control is uneven and challenged."],
      "1923": [
        "Contested",
        "Italian conquest and repression intensify in Libya.",
      ],
      "1932": [
        "Contested",
        "Italian colonial domination has expanded through devastating campaigns.",
      ],
      Modern: [
        "Independent",
        "Within Libya, independent since 1951; contemporary authority is divided.",
      ],
    },
  },
];
export const campaigns = [
  {
    name: "Sarıkamış",
    date: "1914–1915",
    coordinates: [42.59, 40.33] as [number, number],
    text: "A failed winter offensive on the Caucasus front. Cold, logistics, disease, and military decisions compounded losses.",
  },
  {
    name: "Gallipoli",
    date: "1915–1916",
    coordinates: [26.25, 40.24] as [number, number],
    text: "Ottoman victory over Allied naval and land operations. The campaign preserved the capital but did not decide the whole war.",
  },
  {
    name: "Kut",
    date: "1916",
    coordinates: [45.83, 32.51] as [number, number],
    text: "An Ottoman siege forced a British-led army to surrender. British and Indian forces later renewed the offensive.",
  },
  {
    name: "Baghdad",
    date: "1917",
    coordinates: [44.37, 33.32] as [number, number],
    text: "British-led forces captured Baghdad in March 1917 after reorganizing their Mesopotamian campaign.",
  },
  {
    name: "Jerusalem",
    date: "1917",
    coordinates: [35.21, 31.77] as [number, number],
    text: "British-led occupation followed the campaign through Sinai and Palestine.",
  },
  {
    name: "Megiddo",
    date: "1918",
    coordinates: [35.18, 32.58] as [number, number],
    text: "The September offensive shattered Ottoman positions in Palestine and opened the advance into Syria.",
  },
  {
    name: "Arab Revolt",
    date: "1916–1918",
    coordinates: [39.58, 24.47] as [number, number],
    text: "Forces associated with Hussein and Faisal challenged Ottoman rule and attacked the Hejaz Railway. This marker locates a theater, not one battle.",
  },
];
