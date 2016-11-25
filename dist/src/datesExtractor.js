'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractDatesFromText = extractDatesFromText;
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

var chrono = require('chrono-node');
var text = "Tomorrow's practice cancelled, moved to next wednesday";
extractDatesFromText(text);

function extractDatesFromText(text) {
    var results = chrono.parse(text);
    var extractedDates = [];
    var originalText = text;
    var textWithoutDatesKeywords = text;
    var usedLanguage = getTextLanguageFromResult(results[0]);

    results.forEach(function (result) {
        extractedDates.push(extractDateFromResult(result));
        textWithoutDatesKeywords = extractDatesKeyWordFromText(textWithoutDatesKeywords, result);
    });

    var test = {
        originalText: originalText,
        textWithoutDatesKeywords: textWithoutDatesKeywords,
        extractedDates: extractedDates,
        usedLanguage: usedLanguage
    };
    console.log(test);
    return test;
}

function getTextLanguageFromResult(result) {
    for (var name in result.tags) {
        var languageCode = name.substring(0, 2);
        return languageCode.toLowerCase();
    }
}

function extractDateFromResult(result) {
    var extractedDate = {};
    extractedDate.value = result.ref;
    extractedDate.startedIndexInText = result.index;
    return extractedDate;
}

function extractDatesKeyWordFromText(textWithoutDatesKeywords, result) {
    return textWithoutDatesKeywords.replace(result.text, '');
}
//# sourceMappingURL=datesExtractor.js.map