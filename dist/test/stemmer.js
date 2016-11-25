'use strict';

var _stemmer = require('../src/stemmer');

var assert = require('assert');
var expect = require('chai').expect;


var stemmer = new _stemmer.Stemmer();

describe('stemmer', function () {
    it('should throw an error for an undefined language', function () {
        expect(function () {
            return stemmer.stemKeywords('zz', ['a']);
        }).to.throw(Error);
    });

    it('should return a object with the original keyword and the stemmed keyword', function () {
        expect(stemmer.stemKeywords('en', 'weakness')).to.eql({ originalKeyword: 'weakness', stemmedKeyword: 'weak' });
    });

    describe('english', function () {
        it('should stem plurials', function () {
            expect(stemmer.stemKeywords('en', 'cells')).to.eql({
                originalKeyword: 'cells',
                stemmedKeyword: 'cell'
            });
        });
    });

    describe('french', function () {
        it('should stem plurials', function () {
            expect(stemmer.stemKeywords('fr', 'pluriels')).to.eql({
                originalKeyword: 'pluriels',
                stemmedKeyword: 'pluriel'
            });
        });
    });
});
//# sourceMappingURL=stemmer.js.map