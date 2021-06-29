const words = [
  {
    value: "wizard",
    type: "noun",
    verbs: [
      "tossed",
      "cooked",
      "saw",
      "made friends with",
      "went caroling with",
      "waddled over to",
    ],
  },
  {
    value: "shaman",
    type: "noun",
    verbs: [
      "tossed",
      "cooked",
      "saw",
      "made friends with",
      "went caroling with",
      "waddled over to",
    ],
  },
  {
    value: "programmer",
    type: "noun",
    verbs: [
      "tossed",
      "cooked",
      "saw",
      "made friends with",
      "went caroling with",
      "harmonized with",
    ],
  },
  {
    value: "cheeseburger",
    type: "noun",
    verbs: [],
  },
  {
    value: "tasty",
    type: "adjective",
    nouns: ["cheeseburger", "apple"],
  },
  {
    value: "cheerful",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "cowboy",
      "doctor",
      "clerk",
      "doctor",
      "shaman",
    ],
  },
  {
    value: "salt-of-the-earth",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "cowboy",
      "doctor",
      "clerk",
      "doctor",
      "shaman",
    ],
  },
  {
    value: "cooked",
    type: "verb",
    objs: ["cheeseburger", "apple"],
  },
  {
    value: "saw",
    type: "verb",
    objs: ["cheeseburger", "wizard", "programmer", "friend", "duck", "knave"],
  },
  //
  {
    value: "tossed",
    type: "verb",
    objs: ["cheeseburger", "friend", "apple"],
  },
  {
    value: "made friends with",
    type: "verb",
    objs: [
      "wizard",
      "programmer",
      "friend",
      "duck",
      "knave",
      "cowboy",
      "doctor",
    ],
  },
  {
    value: "friend",
    type: "noun",
    verbs: ["tossed", "cooked", "saw"],
  },
  {
    value: "apple",
    type: "noun",
  },
  {
    value: "clerk",
    type: "noun",
    verbs: [
      "tossed",
      "cooked",
      "saw",
      "made friends with",
      "went caroling with",
      "was jealous of",
      "harmonized with",
    ],
  },
  {
    value: "duck",
    type: "noun",
    verbs: ["saw", "waddled over to"],
  },
  {
    value: "no-nonsense",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "duck",
      "knave",
      "cowboy",
      "doctor",
      "clerk",
      "doctor",
      "shaman",
    ],
  },
  {
    value: "nimble",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "duck",
      "knave",
      "cowboy",
      "doctor",
      "clerk",
      "doctor",
      "shaman",
    ],
  },
  {
    value: "doctor",
    type: "noun",
    verbs: [
      "tossed",
      "cooked",
      "saw",
      "made friends with",
      "went caroling with",
      "was jealous of",
      "harmonized with",
    ],
  },
  {
    value: "cowboy",
    type: "noun",
    verbs: [
      "tossed",
      "cooked",
      "saw",
      "made friends with",
      "went caroling with",
      "was jealous of",
      "harmonized with",
    ],
  },
  {
    value: "went caroling with",
    type: "verb",
    objs: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
    ],
  },
  {
    value: "was jealous of",
    type: "verb",
    objs: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
    ],
  },
  {
    value: "waddled over to",
    type: "verb",
    objs: [
      "cheeseburger",
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
    ],
  },
  {
    value: "iridescent",
    type: "adjective",
    objs: [],
  },
  {
    value: "disintegrated",
    type: "verb",
    objs: [],
  },
  {
    value: "melted into",
    type: "verb",
    objs: [],
  },
  {
    value: "harmonized with",
    type: "verb",
    objs: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
    ],
  },
  {
    value: "broke",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
      "cowboy",
    ],
  },
  {
    value: "flirty",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
      "cowboy",
    ],
  },
  {
    value: "capable",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
      "cowboy",
    ],
  },
  {
    value: "greasy",
    type: "adjective",
    nouns: ["cheeseburger"],
  },
  {
    value: "gallant",
    type: "adjective",
    nouns: [
      "wizard",
      "programmer",
      "friend",
      "knave",
      "doctor",
      "clerk",
      "shaman",
      "doctor",
      "cowboy",
    ],
  },
];

module.exports = {words};
