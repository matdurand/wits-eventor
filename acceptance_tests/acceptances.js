var assert = require('assert');
import {english_times, english_subject, english_actions} from "../gobal-const";
import {getEventFromInput} from "../src/index";
let expect = require('chai').expect;

console.log(english_times);
console.log(english_subject);
console.log(english_actions);

describe('Acceptance tests', function () {
    english_subject.forEach((subject)=> {
        english_times.forEach((time)=> {
            var testInput = subject + " " + time;
            it("generated test: " + testInput, function () {
                var result = getEventFromInput(testInput);
                expect(result.originalInput).to.eql(testInput);
            });
        })
    });
});