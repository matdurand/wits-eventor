var assert = require('assert');
var expect = require('chai').expect
import {Stemmer} from "../src/stemmer";

describe('stemmer', function () {
    it('should throw an error for an undefined language', function () {
        const stemmer = new Stemmer();
        expect(() => stemmer.stemKeywords('zz', ['a'])).to.throw(Error);
    });
});