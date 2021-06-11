const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("public"));

const nouns = ["knave","clown","duck","wizard","clerk","cowboy","doctor","druid","shaman"];
const adjectives = ["worthless","mad","dashing","itchy","pious", "glistening","no-good","broken", "esteemed","academically-inclined","salt-of-the-earth"];
const verbs = ["saw","had faith in","understood","cooked","was jealous of", "worked tirelessly for"];


console.log(randVerb(verbs));

app.get("/", function(req,res) {
    res.render("index", {
        adj: "sleepy", 
        noun: "test",
        verb: randVerb(verbs), 
        adj2: adjectives[1], 
        noun2: nouns[1],
        nounPhrase1: randNounPhrase(nouns,adjectives),
        nounPhrase2: randNounPhrase(nouns,adjectives),
        
    });
});

app.listen("3000", function() {
    console.log("Server listening on port 3000.");
});

function randNounPhrase(nounArr, adjArr) {
    console.log("length is " + adjArr[getRandomInt(0,adjArr.length)]);
    return adjArr[getRandomInt(0,adjArr.length)] + " " + nounArr[getRandomInt(0,nounArr.length)];
}

function randVerb(verbArr) {
    return verbArr[getRandomInt(0,verbArr.length)]
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }