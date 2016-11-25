var assert = require('assert');
import {
    english_times,
    english_subject,
    english_actions,
    french_times,
    french_actions,
    french_subject
} from "../gobal-const";
import {getEventFromInput} from "../src/index";
let expect = require('chai').expect;

function testUserInputWithExpectedOutputs(testInput, action, subject, time) {
    it("generated test: " + testInput, function () {
        var result = getEventFromInput(testInput);
        expect(result.originalInput).to.eql(testInput);
        expect(result.time).to.eql(time);
        // expect(result.action).to.eql(action);
        // expect(result.subject).to.eql(subject);
    });
}

describe('Acceptance tests', function () {
    english_subject.forEach((subject)=> {
        english_actions.forEach((action)=> {
            english_times.forEach((time)=> {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput, action, subject, time);
            })
        });
    });

    french_subject.forEach((subject)=> {
        french_actions.forEach((action)=> {
            french_times.forEach((time)=> {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput, action, subject, time);
            })
        });
    });
});