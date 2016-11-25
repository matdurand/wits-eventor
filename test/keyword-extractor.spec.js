import {generateKeywords} from "../src/keyword-extractor";
var expect = require('chai').expect;

describe('keyword extractor', () => {

    it('should throw an error with language undefined', () => {
        expect(() => generateKeywords(undefined, '')).to.throw(Error);
    });

    it('should throw an error with sentence undefined', () => {
        expect(() => generateKeywords('fr', undefined)).to.throw(Error);
    });

    describe('french', function () {
        const testFr = [
            ""
        ];

    });

    describe('english', function () {
        const testEn = [
            {
                sentence: "tomorrow's practice cancelled, moved to next monday",
                tokens: ["tomorrow", "practice", "cancelled", "moved", "monday"]
            },
            {
                sentence: "a sentence ending with an ownership apostrophe's",
                tokens: ["sentence", "ending", "ownership", "apostrophe"]
            }
        ];

        testEn.forEach((testCase) => {
            it('should give the expected token for <' + testCase.sentence + '>', () => {
                const tokens = generateKeywords('en', testCase.sentence);
                expect(tokens).to.eql(testCase.tokens);
            })
        });
    });

    describe('french', function () {
        const testFr = [
            {
                sentence: "il y a une pratique demain à midi dans le deuxième champs de pratique",
                tokens: ["pratique", "demain", "midi", "champs"]
            }
        ];

        testFr.forEach((testCase) => {
            it('should give the expected token for <' + testCase.sentence + '>', () => {
                const tokens = generateKeywords('fr', testCase.sentence);
                expect(tokens).to.eql(testCase.tokens);
            })
        });
    });

});