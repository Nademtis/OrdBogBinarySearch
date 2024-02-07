"use strict"
window.addEventListener("load", start)

let globalArrayOfWords;

async function start() {
    await loadWordList();
    let wordToFind = "aben" // change this variable to search for another word
    binarySearch(wordToFind);
}

function compare(wordToFind, object) {
    //console.log("current objectVariant: " + object.variant);
    return wordToFind.localeCompare(object.variant, 'da');
}
function binarySearch(wordToFind) {
    let wordHasBeenFound = false

    let maxNum = globalArrayOfWords.length - 1
    let minNum = 0

    //the max iterations is 20
    //to make sure a stackOverflow error doesn't occur. i use for a loop with max 25 iterations - this gives a breathing room to inspect the error
    //silly - i know - but then if something goes wrong, or wordToFind doesn't exist, it doesn't fry your browser :)
    for (let i = 0; i < 25 && !wordHasBeenFound; i++) {
        let middleIndex = Math.floor((maxNum + minNum) / 2)
        let currentObject = globalArrayOfWords[middleIndex]

        let compareResult = compare(wordToFind, currentObject)

        if (compareResult === 1) {
            //console.log("word is further into the wordbook");
            minNum = middleIndex + 1
        }
        else if (compareResult === -1) {
            //console.log("word is behind in the wordbook");
            maxNum = middleIndex - 1
        }
        else if (compareResult === 0) {
            console.log("You found the word! - in " + i + " iterations");
            console.log(globalArrayOfWords[middleIndex]);
            wordHasBeenFound = true
        }

        if (i >= 24) {
            console.log(`something went wrong. or the given word: "${wordToFind}"  does not exist`);
        }
    }
}

async function loadWordList() {
    const response = await fetch(".git/Data/ddo_fullforms_2023-10-11.csv");
    const rawtext = await response.text();

    globalArrayOfWords = rawtext.split("\n").map(line => {
        const parts = line.split("\t");
        return {
            variant: parts[0],
            headword: parts[1],
            homograph: parts[2],
            partofspeech: parts[3],
            id: parts[4]
        }
    });
}


