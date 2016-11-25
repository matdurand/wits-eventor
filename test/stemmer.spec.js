var assert = require('assert');
var expect = require('chai').expect;
import {Stemmer} from "../src/stemmer";

const stemmer = new Stemmer();

describe('stemmer', () => {
    it('should throw an error for an undefined language', () => {
        expect(() => stemmer.stemKeywords('zz', ['a'])).to.throw(Error);
    });

    it('should return a object with the original keyword and the stemmed keyword', () => {
        expect(stemmer.stemKeywords('en', 'weakness')).to.eql({originalKeyword: 'weakness', stemmedKeyword: 'weak'});
    });

    describe('english', () => {
        it('should stem plurials', () => {
            expect(stemmer.stemKeywords('en', 'cells')).to.eql({
                originalKeyword: 'cells',
                stemmedKeyword: 'cell'
            });
        });
    });

    describe('french', () => {
        it('should stem plurials', () => {
            expect(stemmer.stemKeywords('fr', 'pluriels')).to.eql({
                originalKeyword: 'pluriels',
                stemmedKeyword: 'pluriel'
            });
        });
    });

});