const {words} = require('./words');

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index", {
    sentence: normalSentence(words),
    checked: ""
  });
});

app.post("/", function (req,res) {
  let wantsSurreal = req.body.surrealcheckbox;
  console.log(`req.body is ${req.body} and wantsSurreal is ${wantsSurreal}`);
  if (wantsSurreal) {
    res.render("index", {
      sentence: surrealSentence(words),
      checked: "checked"
    });
  } else {
    res.render("index", {
      sentence: normalSentence(words),
      checked: ""
    });
  }
  
});

app.get("/api/normal", function (req, res) {
  res.json({ type: "normal", sentence: normalSentence(words) });
});

app.get("/api/surreal", function (req, res) {
  res.json({ type: "surreal", sentence: surrealSentence(words) });
});

app.listen(process.env.PORT || "3000", function () {
  console.log("Server listening on port 3000.");
});

function surrealSentence(words) {
  let nouns = words.filter((x) => x.type === "noun");
  let subj = nouns[Math.floor(Math.random() * nouns.length)].value;
  let verb = generateSurrealVerb(subj, words);
  let adj = generateSurrealAdjective(subj, words);
  let obj = nouns[Math.floor(Math.random() * nouns.length)].value;

  return `The ${adj} ${subj} ${verb} ${addAn(obj)}.`;
}

function normalSentence(words) {
  let subj = generateSubject(words);
  if (typeof subj === "undefined") {
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
  let adjs = words.filter(
    (x) => x.type === "adjective" && x.nouns?.includes(noun)
  );
  if (adjs.length === 0) {
    return "";
  } else {
    return adjs[Math.floor(Math.random() * adjs.length)].value;
  }
}

// returns a normal sounding verb for that noun, or "" if it can't find one.
function getVerb(noun, words) {
  const verbs = words.find((x) => x.value === noun)?.verbs;
  if (typeof verbs === "undefined") {
    return "";
  } else {
    return verbs[Math.floor(Math.random() * verbs.length)];
  }
}

function getObj(verb, words) {
  let verbObj = words.find((x) => x.value === verb);
  let objs = verbObj?.objs;
  if (typeof objs === "undefined") {
    return "";
  } else {
    return objs[Math.floor(Math.random() * objs.length)];
  }
}

// randomly choose an adjective that is NOT supposed go with that noun (i.e. doesn't contain that noun in its list of acceptable nouns).
function generateSurrealAdjective(noun, words) {
  let adjs = words.filter(
    (x) => x.type === "adjective" && !x.nouns?.includes(noun)
  ); // notice the !
  if (adjs.length === 0) {
    return "";
  } else {
    return adjs[Math.floor(Math.random() * adjs.length)].value;
  }
}

function generateSurrealVerb(noun, words) {
  let nounData = words.find((x) => x.value === noun);
  let verbs = words.filter(
    (x) => x.type === "verb" && !nounData.verbs?.includes(x.value)
  ); // notice the !
  if (verbs.length === 0) {
    return "";
  } else {
    return verbs[Math.floor(Math.random() * verbs.length)].value;
  }
}

function addAn(nounPhrase) {
  let vowels = ["a", "e", "i", "o", "u"];
  let firstLetter = nounPhrase.charAt(0);

  if (vowels.includes(firstLetter)) {
    return "an " + nounPhrase;
  } else {
    return "a " + nounPhrase;
  }
}