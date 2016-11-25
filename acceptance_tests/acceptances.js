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

function testUserInputWithExpectedOutputs(testInput) {
    it("generated test: " + testInput, function () {
        var result = getEventFromInput(testInput);
        expect(result.originalInput).to.eql(testInput);
    });
}

describe('Acceptance tests', function () {
    english_subject.forEach((subject)=> {
        english_actions.forEach((action)=> {
            english_times.forEach((time)=> {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput);
            })
        });
    });

    french_subject.forEach((subject)=> {
        french_actions.forEach((action)=> {
            french_times.forEach((time)=> {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput);
            })
        });
    });
});