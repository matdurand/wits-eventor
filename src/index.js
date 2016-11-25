export function getEventFromInput(userInput) {
    //datesExtractor.call
    //stemmer.call
    //worldWordBankPompette
    return {
        "originalInput": userInput
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