import {DateExtractor} from "../src/datesExtractor";
let assert = require('assert');
let expect = require('chai').expect;

let textOne = "Tomorrow's practice cancelled, moved to next wednesday";
let textTwo = "Today's game is cancelled";
let textThree = "Next practice will be friday at 10 o'clock";
let textFour = "Envoye dont à maison!";

describe('dateExtractor', function () {

    const dateExtractor = new DateExtractor();

    it('should return undefined when nothing is extracted', function () {
        let result = dateExtractor.extractDatesFromText(textFour);
        expect(result).to.eql(undefined);
    });

    it('should return extracted dates with one text date in text', function () {
        let result = dateExtractor.extractDatesFromText(textFour);
        expect(result).to.eql(undefined);
    });

    it('should return extracted dates with multiple text date in text', function () {

    });

});