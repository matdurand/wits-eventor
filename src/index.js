import {DateExtractor} from "./datesExtractor";
import {generateKeywords} from "./keyword-extractor";
import {Stemmer} from "./stemmer";
var dataExtractor = new DateExtractor();

export function getEventFromInput(userInput) {
    //datesExtractor.call
    //stemmer.call
    //worldWordBankPompette

    const result = dataExtractor.extractDatesFromText(userInput);
    if (result) {
        const keywords = generateKeywords(result.usedLanguage, result.textWithoutDatesKeywords);
        const stemmedKeywords = new Stemmer().stemKeywords(result.usedLanguage, keywords);


        return {
            "originalInput": userInput,
            "time": result.extractedDates[0].dateTextExtracted
        }
    } else {
        return {
            "originalInput": userInput
        }
    }
}

export class reponse {
    constructor(subject, time, action, originalInput) {
        this.subject = subject;
        this.time = time;
        this.action = action;
        this.originalInput = originalInput
    }
}