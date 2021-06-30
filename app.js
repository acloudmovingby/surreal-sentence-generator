const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/** DATABASE (MONGODB) */
mongoose.connect("mongodb://localhost:27017/surreal-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wordSchema = new Schema({
  value: String,
  type: String,
  goesWith: [String], // which words does this word go with? If type is adj, then this array has nouns; if type is noun, array has verbs it can be subject of; if type is verb, array has nouns that can be objects of this verb
});

const Word = mongoose.model("Word", wordSchema);

/** Set default words. These are global variables (yikes!) */
const { wrds } = require("./words");
const defaultWords = wrds.map((x) => new Word(x)); // Originally I wrote words as JS objects and this converst them to Mongoose Models
let wordsFromDB = undefined; // Remains undefined until fetched from db

function getWords() {
  console.log("getWords called and wordsFromDB is " + wordsFromDB?.length);
  
  Word.find(async function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs.length === 0) {
        await Word.insertMany(defaultWords, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Default words successfully inserted.");
          }
        });
      }
      console.log("docs length is " + docs.length);
      wordsFromDB = docs;
    }
    wordsFromDB = docs;
  });

  // first checks to see if words have been fetched from DB. For reasons I don't know, sometimes the async function returns undefined, sometimes it returns length 0, so I check both cases and just return defaultWords if that happens.
  if (!wordsFromDB || wordsFromDB.length === 0) {
    console.log("Returning default words now.");
    return defaultWords;
  } else {
    // if the words have already been fetched from the database. These may not be up to date with the db, as the find function above can take a second and doesn't change wordsFromDB until after this function has returned (!).
    console.log("Actually using database words now.");
    return wordsFromDB;
  }
  console.log("I guess neither return actualy returned...");
}

app.get("/", function (req, res) {
  res.render("index", { sentence: normalSentence(getWords()), checked: "" });
});

app.post("/", function (req, res) {
  let wantsSurreal = req.body.surrealcheckbox;
  let words = getWords();
  let sentence = wantsSurreal ? surrealSentence(words) : normalSentence(words);
  let checked = wantsSurreal ? "checked" : ""; // represents whether the surreal checkbox defaults to checked or not
  res.render("index", {
    sentence: sentence,
    checked: checked,
  });
});

app.get("/api/normal", function (req, res) {
  res.json({ type: "normal", sentence: normalSentence(getWords()) });
});

app.get("/api/surreal", function (req, res) {
  res.json({ type: "surreal", sentence: surrealSentence(getWords()) });
});

app.listen(process.env.PORT || "3000", function () {
  console.log("Server listening on port 3000.");
});

function surrealSentence(words) {
  if (!words || words.length === 0) {
    return "Click the GENERATE button to make a new sentence. Toggle the checkbox to make the sentence surreal."; // makes sure that if words is undefined/null, then this passes that on rather than causing an error in this function
  }
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
    return "Click the GENERATE button to make a new sentence. Toggle the checkbox to make the sentence surreal.";
  }

  let adj = getAdj(subj, words);
  let verb = getVerb(subj, words);
  let obj = getObj(verb, words);

  return `The ${adj} ${subj} ${verb} ${addAn(obj)}.`;
}

// creates the subject of the sentence but returns undefined if there are no nouns or if no nouns can be subjects of verbs
function generateSubject(words) {
  if (!words) {
    console.log("whats that again?");
    return undefined; // makes sure that if words is undefined/null, then this passes that on rather than causing an error in this function
  }
  let nouns = words.filter((x) => x.type === "noun" && x.goesWith?.length > 0);
  if (nouns.length === 0) {
    return undefined;
  } else {
    return nouns[Math.floor(Math.random() * nouns.length)].value;
  }
}

// returns a normal sounding adjective for that noun, or "" if it can't find one.
function getAdj(noun, words) {
  let adjs = words.filter(
    (x) => x.type === "adjective" && x.goesWith?.includes(noun)
  );
  if (adjs.length === 0) {
    return "";
  } else {
    return adjs[Math.floor(Math.random() * adjs.length)].value;
  }
}

// returns a normal sounding verb for that noun, or "" if it can't find one.
function getVerb(noun, words) {
  const verbs = words.find((x) => x.value === noun)?.goesWith;
  if (typeof verbs === "undefined") {
    return "";
  } else {
    return verbs[Math.floor(Math.random() * verbs.length)];
  }
}

function getObj(verb, words) {
  let verbObj = words.find((x) => x.value === verb);
  let objs = verbObj?.goesWith;
  if (typeof objs === "undefined") {
    return "";
  } else {
    return objs[Math.floor(Math.random() * objs.length)];
  }
}

// randomly choose an adjective that is NOT supposed go with that noun (i.e. doesn't contain that noun in its list of acceptable nouns).
function generateSurrealAdjective(noun, words) {
  let adjs = words.filter(
    (x) => x.type === "adjective" && !x.goesWith?.includes(noun)
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
    (x) => x.type === "verb" && !nounData.goesWith?.includes(x.value)
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
