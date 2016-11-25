//Outputs
/*
 * {
 *   originalText,
 *   textWithoutDatesKeyword,
 *   extractedDate : [
 *       {
 *           startedIndexInText : (position dans l'orginialText),
 *           value : La date javascript
 *       },
 *       {
 *
 *       }
 *   ],
 *   usedLanguage (ex : 'fr', 'en')
 * }
 *
 * */

let chrono = require('chrono-node');
let text = "Tomorrow's practice cancelled, moved to next wednesday";
extractDatesFromText(text);

export function extractDatesFromText(text) {
    let results = chrono.parse(text);
    let extractedDates = [];
    let originalText = text;
    let textWithoutDatesKeywords = text;
    let usedLanguage = getTextLanguageFromResult(results[0]);

    results.forEach((result) => {
        extractedDates.push(extractDateFromResult(result));
        textWithoutDatesKeywords = extractDatesKeyWordFromText(textWithoutDatesKeywords, result);
    });

    let test = {
        originalText,
        textWithoutDatesKeywords,
        extractedDates,
        usedLanguage
    };
    console.log(test);
    return test;

}


function getTextLanguageFromResult(result) {
    for (let name in result.tags) {
        let languageCode = name.substring(0, 2);
        return languageCode.toLowerCase();
    }
}

function extractDateFromResult(result) {
    let extractedDate = {};
    extractedDate.value = result.ref;
    extractedDate.startedIndexInText = result.index;
    return extractedDate;
}

function extractDatesKeyWordFromText(textWithoutDatesKeywords, result) {
    return textWithoutDatesKeywords.replace(result.text, '');
}