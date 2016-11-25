import {DateExtractor} from "./datesExtractor";
import {generateKeywords} from "./keyword-extractor";
import {Stemmer} from "./stemmer";

class WitsEventor {
    constructor() {
        this.dataExtractor = new DateExtractor();
        this.stemmer = new Stemmer();
    }

    getEventFromInput(userInput) {

        const result = this.dataExtractor.extractDatesFromText(userInput);
        if (result) {
            const keywords = generateKeywords(result.usedLanguage, result.textWithoutDatesKeywords);
            const stemmedKeywords = this.stemmer.stemKeywords(result.usedLanguage, keywords);
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
}

export {WitsEventor as default}
