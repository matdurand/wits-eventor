'use strict';

var _stemmer = require('../src/stemmer');

var assert = require('assert');
var expect = require('chai').expect;


describe('stemmer', function () {
    it('should throw an error for an undefined language', function () {
        var stemmer = new _stemmer.Stemmer();
        expect(function () {
            return stemmer.stemKeywords('zz', ['a']);
        }).to.throw(Error);
    });
});
//# sourceMappingURL=stemmer.js.map