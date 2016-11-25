"use strict";

var _testConst = require("./test-const");

var _WitsEventor = require("../src/WitsEventor");

var assert = require('assert');

var expect = require('chai').expect;

var eventor = new _WitsEventor.WitsEventor();
eventor.addSubjectDictionary('en', _testConst.english_subject);
eventor.addSubjectDictionary('fr', _testConst.french_subject);
eventor.addActionDictionary('en', _testConst.english_actions);
eventor.addActionDictionary('fr', _testConst.french_actions);

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
    _testConst.english_subject.forEach(function (subject) {
        _testConst.english_actions.forEach(function (action) {
            _testConst.english_times.forEach(function (time) {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput, action, subject, time);
            });
        });
    });

    _testConst.french_subject.forEach(function (subject) {
        _testConst.french_actions.forEach(function (action) {
            _testConst.french_times.forEach(function (time) {
                var testInput = action + " " + subject + " " + time;
                testUserInputWithExpectedOutputs(testInput, action, subject, time);
            });
        });
    });
});
//# sourceMappingURL=acceptances.js.map