export class DateExtractor {
    constructor() {
        this.chrono = require('chrono-node');
    }

    extractDatesFromText(text) {
        let results = this.chrono.parse(text);
        if (results.length > 0) {
            let extractedDates = [];
            let originalText = text;
            let textWithoutDatesKeywords = text;
            let usedLanguage = getTextLanguageFromResult(results[0]);

            results.forEach((result) => {
                extractedDates.push(extractDateFromResult(result));
                textWithoutDatesKeywords = extractDatesKeyWordFromText(textWithoutDatesKeywords, result);
            });

            return {
                originalText,
                textWithoutDatesKeywords,
                extractedDates,
                usedLanguage
            };
        }
    }
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
    extractedDate.dateTextExtracted = result.text;
    extractedDate.dateTextExtractedIndex = result.index;
    return extractedDate;
}

function extractDatesKeyWordFromText(textWithoutDatesKeywords, result) {
    return textWithoutDatesKeywords.replace(result.text, '');
}