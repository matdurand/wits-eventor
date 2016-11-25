import {DateExtractor} from "./datesExtractor";
var dataExtractor = new DateExtractor();

export function getEventFromInput(userInput) {
    //datesExtractor.call
    //stemmer.call
    //worldWordBankPompette
    console.log(userInput);
    var result = dataExtractor.extractDatesFromText(userInput);

    return {
        "originalInput": userInput,
        "time": result.extractedDates[0].dateTextExtracted
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