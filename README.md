# surreal-sentence-generator
This was a small Node Express project to create a basic REST API to generate either "normal" or "surreal" sentences. This is a joke site. While perhaps thought-provoking, it is not meant to be a serious source of randomly generated language. 

## What is a "surreal" sentence?
I stored a small collection of words and used them to generate new sentences. Each of these words had a list of what words it could go with and which ones it couldn't. For example, "curious" could go with "wizard" but not with "cheeseburger" (because a wizard could be curious, but a cheeseburger is an inanimate object).

A normal sentence puts words together that could be logically possible. A "surreal" sentence joins words that couldn't logically go together. 

Also, as a side note, whether words can logically go together is both subjective and context-dependent. For example, to one person, a "humble cheeseburger" is an impossibility because a cheeseburger couldn't express modesty or humility. However, someone else migt reasonably disagree and say that the word "humble" may denote ordinariness, so you could say the sentence "By the mid 21st century, sushi had overtaken the humble cheeseburger as the entree of choice for Americans." Regardless, this is a joke site, so don't take it too seriously.  

## Should you use this API?
No. This was a small test project to get used to using Express and building RESTful API's. The website only uses a few dozen words, so pretty quickly you'll see some of the same sentences. 
