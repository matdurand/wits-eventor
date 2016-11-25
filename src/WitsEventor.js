import {generateKeywords} from "./keyword-extractor";
import {DateExtractor} from "./datesExtractor";
import {Stemmer} from "./stemmer";
import {_} from "underscore";

export class WitsEventor {
    constructor() {
        this.subjectDictionaries = {};
        this.actionDictionaries = {};
        this.dateExtractor = new DateExtractor();
    }

    addSubjectDictionary(language, subjects) {
        this.subjectDictionaries[language] = buildDictionary(language, subjects);
    }

    addActionDictionary(language, actions) {
        this.actionDictionaries[language] = buildDictionary(language, actions);
    }

    getEventFromInput(userInput) {
        const dateExtractionResult = this.dateExtractor.extractDatesFromText(userInput);
        if (dateExtractionResult) {
            const keywords = generateKeywords(dateExtractionResult.usedLanguage, dateExtractionResult.textWithoutDatesKeywords);
            const stemmingResult = new Stemmer().stemKeywords(dateExtractionResult.usedLanguage, keywords);
            const stemmedKeywords = _.pluck(stemmingResult, 'stemmedKeyword');
            const subject = findSubject.call(this, dateExtractionResult.usedLanguage, stemmedKeywords);
            if (subject) {
                const action = findAction.call(this, dateExtractionResult.usedLanguage, stemmedKeywords);
                return {
                    originalInput: userInput,
                    time: dateExtractionResult.extractedDates[0].dateTextExtracted,
                    start: dateExtractionResult.extractedDates[0].start,
                    end: dateExtractionResult.extractedDates[0].end,
                    action,
                    subject
                }
            } else {
                return {
                    "originalInput": userInput,
                    "error": "No subject found"
                };
            }
        } else {
            return {
                "originalInput": userInput,
                "error": "No dates found"
            };
        }
    }
}

function findSubject(language, stemmedKeywords) {
    const dict = this.subjectDictionaries[language];
    return findFirstDictionary(dict, stemmedKeywords);
}

function findAction(language, stemmedKeywords) {
    const dict = this.actionDictionaries[language];
    return findFirstDictionary(dict, stemmedKeywords);
}

function findFirstDictionary(dictionary, stemmedKeywords) {
    if (!dictionary)
        return undefined;
    const foundKeyword = _.find(stemmedKeywords, (stemmedKeyword) => dictionary[stemmedKeyword]);
    if (foundKeyword) {
        return dictionary[foundKeyword];
    }
}

function buildDictionary(language, words) {
    if (typeof language !== 'string') {
        throw new Error('expecting a string language');
    }
    if (!Array.isArray(words)) {
        throw new Error('dictionary content should be an array of words');
    }

    const dict = {};
    words.forEach((word) => {
        const stemmingResult = new Stemmer().stemKeywords(language, word);
        dict[stemmingResult.stemmedKeyword] = word;
    });

    return dict;
}
