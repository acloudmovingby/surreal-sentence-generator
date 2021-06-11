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
    surreal_adj: ["glistening"],
  },
  {
    value: "cheeseburger",
    type: "noun",
    surreal_adj: ["glistening", "itchy"],
    surreal_verb: ["cooked", "saw"],
  },
  {
    value: "pencil",
    type: "noun",
    surreal_adj: ["itchy"],
    surreal_verb: ["cooked", "saw"],
  },
  {
    value: "glistening",
    type: "adjective",
  },
  {
    value: "nice",
    type: "adjective",
  },
  {
    value: "itchy",
    type: "adjective",
  },
  {
    value: "hot",
    type: "adjective",
  },
  {
    value: "cooked",
    type: "verb",
    surreal_obj: ["pencil"],
  },
  {
    value: "saw",
    type: "verb",
  },
];

app.get("/", function (req, res) {
  res.render("index", {
    sentence: normalSentence(words),
  });
});

app.listen("3000", function () {
  console.log("Server listening on port 3000.");
});

function randNounPhrase(nounArr, adjArr) {
  console.log("length is " + adjArr[getRandomInt(0, adjArr.length)]);
  return (
    adjArr[getRandomInt(0, adjArr.length)] +
    " " +
    nounArr[getRandomInt(0, nounArr.length)]
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function surrealSentence(words) {
  let nouns = words.filter((x) => {
    return x.type === "noun";
  });
  let subj = nouns[getRandomInt(0, nouns.length)].value;
  //subj = "cheeseburger";
  let adj = getSurrealAdj(subj, words);
  let verb = getSurrealVerb(subj, words);

  // generate noun
  // let adj = find surreal adjective function
  // let verb = find surreal verb
  // let object = find surreal object

  return `The ${adj} ${subj} ${verb}`;
}

// Finds a "surreal" adjective for the given noun. If no such adjective exists, it chooose a normal one. If no adjectives exist, it returns "".
function getSurrealAdj(noun, words) {
  let surrealAdjs = words.find((x) => {
    return noun === x.value;
  })?.surreal_adj;

  if (surrealAdjs === undefined) {
    let adjs = words
      .filter((x) => {
        return x.type === "adjective";
      })
      .map((x) => x.value);
    return adjs[getRandomInt(0, adjs.length)];
  } else {
    return surrealAdjs[getRandomInt(0, surrealAdjs.length)] ?? "";
  }
}

function getSurrealVerb(noun, words) {
  // alternate way where surreal verb is stored in noun
  let surrealVerbs = words.find((wrd) => wrd.value === noun).surreal_verb;
  if (surrealVerbs) {
    return surrealVerbs[getRandomInt(0, surrealVerbs.length)];
  } else {
    let verbs = words.filter((x) => x.type === "verb");
    return verbs[getRandomInt(0, verbs.length)].value;
  }
}

function normalSentence(words) {
  let nouns = words.filter((x) => {
    return x.type === "noun";
  });
  let subj = nouns[getRandomInt(0, nouns.length)].value;
  let adj = getNormalAdj(subj, words);
  let verb = getNormalVerb(subj, words);
  let obj = getNormalObject(verb, words);
  return `The ${adj} ${subj} ${verb} a ${obj}`;
}

// if a normal adjective for that noun exists, it returns a random one. Otherwise, it returns "".
function getNormalAdj(noun, words) {
  let nounObj = words.find((x) => x.value === noun);
  let adjs = words.filter((x) => {
    let isAdj = x.type === "adjective";
    let isSurreal = nounObj?.surreal_adj?.includes(x.value);
    return isAdj && !isSurreal;
  });
  return adjs[Math.floor(Math.random() * adjs.length)].value ?? "";
}

function getNormalVerb(noun, words) {
  let nounObj = words.find((x) => x.value === noun);
  let verbs = words.filter((x) => {
    let isVerb = x.type === "verb";
    let isSurreal = nounObj?.surreal_verb?.includes(x.value);
    return isVerb && !isSurreal;
  });
  return verbs[Math.floor(Math.random() * verbs.length)]?.value ?? "";
}

function getNormalObject(verb, words) {
  let verbData = words.find((x) => x.value === verb);
  let nouns = words.filter((x) => {
    let isNoun = x.type === "noun";
    let isSurreal = verbData?.surreal_obj?.includes(x.value);
    return isNoun && !isSurreal;
  });
  return nouns[Math.floor(Math.random() * nouns.length)].value ?? "";
}
