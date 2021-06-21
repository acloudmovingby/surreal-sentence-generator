const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("public"));

const nouns = [
  "knave",
  "clown",
  "duck",
  "wizard",
  "clerk",
  "cowboy",
  "doctor",
  "druid",
  "shaman",
];
const adjectives = [
  "worthless",
  "mad",
  "dashing",
  "itchy",
  "pious",
  "glistening",
  "no-good",
  "broken",
  "esteemed",
  "academically-inclined",
  "salt-of-the-earth",
];
const verbs = [
  "saw",
  "had faith in",
  "understood",
  "cooked",
  "was jealous of",
  "worked tirelessly for",
];

const words = [
  {
    value: "wizard",
    type: "noun",
    verbs: ["tossed","cooked","saw","made friends with","went caroling with","waddled over to"]
  },
  {
    value: "shaman",
    type: "noun",
    verbs: ["tossed","cooked","saw","made friends with","went caroling with","waddled over to"]
  },
  {
    value: "programmer",
    type: "noun",
    verbs: ["tossed","cooked","saw","made friends with","went caroling with","harmonized with"]
  },
  {
    value: "cheeseburger",
    type: "noun",
    verbs: []
  },
  {
    value: "tasty",
    type: "adjective",
    nouns: ["cheeseburger","apple"]
  },
  {
    value: "cheerful",
    type: "adjective",
    nouns: ["wizard","programmer","friend","knave","cowboy","doctor","clerk","doctor","shaman"]
  },
  {
    value: "salt-of-the-earth",
    type: "adjective",
    nouns: ["wizard","programmer","friend","knave","cowboy","doctor","clerk","doctor","shaman"]
  },
  {
    value: "cooked",
    type: "verb",
    objs: ["cheeseburger","apple"],
  },
  {
    value: "saw",
    type: "verb",
    objs: ["cheeseburger","wizard","programmer","friend","duck","knave"],
  },
//   
  {
    value: "tossed",
    type: "verb",
    objs: ["cheeseburger","friend","apple"],
  },
  {
    value: "made friends with",
    type: "verb",
    objs: ["wizard","programmer","friend","duck","knave","cowboy","doctor"],
  },
  {
    value: "friend",
    type: "noun",
    verbs: ["tossed","cooked","saw"],
  },
  {
    value: "apple",
    type: "noun",
  },
  {
    value: "clerk",
    type: "noun",
    verbs: ["tossed","cooked","saw","made friends with","went caroling with","was jealous of","harmonized with"],
  },
  {
    value: "duck",
    type: "noun",
    verbs: ["saw","waddled over to"]
  },
  {
    value: "no-nonsense",
    type: "adjective",
    nouns: ["wizard","programmer","friend","duck","knave","cowboy","doctor","clerk","doctor","shaman"],
  },
  {
    value: "nimble",
    type: "adjective",
    nouns: ["wizard","programmer","friend","duck","knave","cowboy","doctor","clerk","doctor","shaman"],
  },
  {
    value: "doctor",
    type: "noun",
    verbs: ["tossed","cooked","saw","made friends with","went caroling with","was jealous of","harmonized with"],
  },
  {
    value: "cowboy",
    type: "noun",
    verbs: ["tossed","cooked","saw","made friends with","went caroling with","was jealous of","harmonized with"],
  },
  {
    value: "went caroling with",
    type: "verb",
    objs: ["wizard","programmer","friend","knave","doctor","clerk","shaman","doctor"],
  },
  {
    value: "was jealous of",
    type: "verb",
    objs: ["wizard","programmer","friend","knave","doctor","clerk","shaman","doctor"],
  },
  {
    value: "waddled over to",
    type: "verb",
    objs: ["cheeseburger","wizard","programmer","friend","knave","doctor","clerk","shaman","doctor"],
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
    value: "harmonized with",
    type: "verb",
    objs: ["wizard","programmer","friend","knave","doctor","clerk","shaman","doctor"],
  },
  {
    value: "broke",
    type: "adjective",
    nouns: ["wizard","programmer","friend","knave","doctor","clerk","shaman","doctor","cowboy"],
  },
  {
    value: "flirty",
    type: "adjective",
    nouns: ["wizard","programmer","friend","knave","doctor","clerk","shaman","doctor","cowboy"],
  },
  {
    value: "capable",
    type: "adjective",
    nouns: ["wizard","programmer","friend","knave","doctor","clerk","shaman","doctor","cowboy"],
  },
  {
    value: "greasy",
    type: "adjective",
    nouns: ["cheeseburger"],
  },
  {
    value: "gallant",
    type: "adjective",
    nouns: ["wizard","programmer","friend","knave","doctor","clerk","shaman","doctor","cowboy"],
  },
  
];

app.get("/", function (req, res) {
  res.render("index", {
    sentence: normalSentence(words),
  });
});


app.get("/surreal", function (req, res) {
    res.render("index", {
      sentence: surrealSentence(words),
    });
  });

app.listen("3000", function () {
  console.log("Server listening on port 3000.");
});

function surrealSentence(words) {
    let nouns = words.filter((x) => x.type === "noun");
    let subj = nouns[Math.floor(Math.random() * nouns.length)].value; 
    let verb = generateSurrealVerb(subj,words);
    let adj = generateSurrealAdjective(subj,words);
    let obj = nouns[Math.floor(Math.random() * nouns.length)].value;

    return `The ${adj} ${subj} ${verb} ${addAn(obj)}.`;
}

function normalSentence(words) {
    let subj = generateSubject(words);
    if (typeof subj === 'undefined') {
        return "Data invalid :(";
    }
    
    let adj = getAdj(subj, words);
    let verb = getVerb(subj, words);
    let obj = getObj(verb, words);
    
    return `The ${adj} ${subj} ${verb} ${addAn(obj)}.`;
}

// creates the subject of the sentence but returns undefined if there are no nouns or if no nouns can be subjects of verbs
function generateSubject(words) {
    let nouns = words.filter((x) => x.type === "noun" && x.verbs?.length > 0);
    if (nouns.length === 0) {
        return undefined;
    } else {
        return nouns[Math.floor(Math.random() * nouns.length)].value;
    }
}

// returns a normal sounding adjective for that noun, or "" if it can't find one.
function getAdj(noun, words) {
    let adjs = words.filter((x) => x.type === "adjective" && x.nouns?.includes(noun));
    if (adjs.length === 0) {
        return "";
    } else {
        return adjs[Math.floor(Math.random() * adjs.length)].value;
    }
}

// returns a normal sounding verb for that noun, or "" if it can't find one.
function getVerb(noun, words) {
    const verbs = words.find((x) => x.value === noun)?.verbs;
    if (typeof verbs === 'undefined') {
        return "";
    } else {
        return verbs[Math.floor(Math.random() * verbs.length)];
    }
}

function getObj(verb, words) {
    let verbObj = words.find(x => x.value === verb);
    let objs = verbObj?.objs;
    if (typeof objs === 'undefined') {
        return "";
    } else {
        return objs[Math.floor(Math.random() * objs.length)];
    }
}

function addAn (nounPhrase) {
    let vowels = ['a','e','i','o','u'];
    let firstLetter = nounPhrase.charAt(0);

    if (vowels.includes(firstLetter)) {
        return "an " + nounPhrase;
    } else {
        return "a " + nounPhrase;
    }
}

// randomly choose an adjective that is NOT supposed go with that noun (i.e. doesn't contain that noun in its list of acceptable nouns).
function generateSurrealAdjective(noun,words) {
    let adjs = words.filter((x) => x.type === "adjective" && !x.nouns?.includes(noun)); // notice the ! 
    if (adjs.length === 0) {
        return "";
    } else {
        return adjs[Math.floor(Math.random() * adjs.length)].value;
    }
}

function generateSurrealVerb(noun,words) {
    let nounData = words.find((x) => x.value === noun);
    let verbs = words.filter((x) => x.type === "verb" && !nounData.verbs?.includes(x.value)); // notice the ! 
    if (verbs.length === 0) {
        return "";
    } else {
        return verbs[Math.floor(Math.random() * verbs.length)].value;
    }
}