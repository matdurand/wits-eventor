'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateKeywords = generateKeywords;
var keyword_extractor = require("keyword-extractor");

function generateKeywords(language, sentence) {
    if (typeof language !== 'string') {
        throw new Error('expecting a string language');
    }
    if (typeof sentence !== 'string') {
        throw new Error('expecting a string sentence');
    }

    if (language === 'en') {
        sentence = removeEnglishOwnershipApostrophe(sentence);
    }

    var extraction_result = keyword_extractor.extract(sentence, {
        language: convertISOLanguageCodeToText(language),
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
    });

    return extraction_result;
}

function removeEnglishOwnershipApostrophe(sentence) {
    sentence = sentence.replace(/\'s\s/g, ' ');
    sentence = sentence.replace(/\'s$/g, '');
    return sentence;
}

function convertISOLanguageCodeToText(language) {
    if (language === 'fr') return 'french';else if (language === 'en') return 'english';else throw new Error('Unsupported language ' + language);
}
//# sourceMappingURL=keyword-extractor.js.map