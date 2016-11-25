'use strict';

var _keywordExtractor = require('../src/keyword-extractor');

var expect = require('chai').expect;

describe('keyword extractor', function () {

    it('should throw an error with language undefined', function () {
        expect(function () {
            return (0, _keywordExtractor.generateKeywords)(undefined, '');
        }).to.throw(Error);
    });

    it('should throw an error with sentence undefined', function () {
        expect(function () {
            return (0, _keywordExtractor.generateKeywords)('fr', undefined);
        }).to.throw(Error);
    });

    describe('french', function () {
        var testFr = [""];
    });

    describe('english', function () {
        var testEn = [{
            sentence: "tomorrow's practice cancelled, moved to next monday",
            tokens: ["tomorrow", "practice", "cancelled", "moved", "monday"]
        }, {
            sentence: "a sentence ending with an ownership apostrophe's",
            tokens: ["sentence", "ending", "ownership", "apostrophe"]
        }];

        testEn.forEach(function (testCase) {
            it('should give the expected token for <' + testCase.sentence + '>', function () {
                var tokens = (0, _keywordExtractor.generateKeywords)('en', testCase.sentence);
                expect(tokens).to.eql(testCase.tokens);
            });
        });
    });

    describe('french', function () {
        var testFr = [{
            sentence: "il y a une pratique demain à midi dans le deuxième champs de pratique",
            tokens: ["pratique", "demain", "midi", "champs"]
        }];

        testFr.forEach(function (testCase) {
            it('should give the expected token for <' + testCase.sentence + '>', function () {
                var tokens = (0, _keywordExtractor.generateKeywords)('fr', testCase.sentence);
                expect(tokens).to.eql(testCase.tokens);
            });
        });
    });
});
//# sourceMappingURL=keyword-extractor.spec.js.map