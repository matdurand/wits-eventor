var assert = require('assert');
import {
    english_times,
    english_subject,
    english_actions,
    french_times,
    french_actions,
    french_subject
} from "./test-const";
import {Eventor} from "../src/Eventor";
let expect = require('chai').expect;

const eventor = new Eventor();
eventor.addSubjectDictionary('en', english_subject);
eventor.addSubjectDictionary('fr', french_subject);
eventor.addActionDictionary('en', english_actions);
eventor.addActionDictionary('fr', french_actions);

function testUserInputWithExpectedOutputs(testInput, action, subject, time) {
    it("generated test: " + testInput, function () {
        var result = eventor.getEventFromInput(testInput);
        expect(result.originalInput).to.eql(testInput);
        expect(result.time).to.eql(time);
        //expect(result.action).to.eql(action);
        expect(result.subject).to.eql(subject);
    });
}

describe('Acceptance tests', function () {
    english_subject.forEach((subject) => {
        english_actions.forEach((action) => {
            english_times.forEach((time) => {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput, action, subject, time);
            })
        });
    });

    french_subject.forEach((subject) => {
        french_actions.forEach((action) => {
            french_times.forEach((time) => {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput, action, subject, time);
            })
        });
    });
});