'use strict';

var _datesExtractor = require('../src/datesExtractor');

var assert = require('assert');
var expect = require('chai').expect;

var textOne = "Tomorrow's practice cancelled, moved to next wednesday";
var textTwo = "Today's game is cancelled";
var textFour = "Envoye dont à maison!";
var frenchText = 'La pratique de demain est annulée. Prochaine pratique sera demain à 10h';
var englishText = "Next practice will be friday at 10 o'clock";

describe('dateExtractor', function () {

    var dateExtractor = new _datesExtractor.DateExtractor();

    it('should return undefined when nothing is extracted', function () {
        var result = dateExtractor.extractDatesFromText(textFour);
        expect(result).to.eql(undefined);
    });

    it('should return extracted dates with one text date in text', function () {
        var result = dateExtractor.extractDatesFromText(textTwo);
        expect(result.extractedDates.length).to.eql(1);
        expect(result.extractedDates[0].dateTextExtracted).to.eql('Today');
        expect(result.extractedDates[0].dateTextExtractedIndex).to.eql(0);
    });

    it('should return extracted dates with multiple text date in text', function () {
        var result = dateExtractor.extractDatesFromText(textOne);
        expect(result.extractedDates.length).to.eql(2);

        expect(result.extractedDates[0].dateTextExtracted).to.eql('Tomorrow');
        expect(result.extractedDates[0].dateTextExtractedIndex).to.eql(0);

        expect(result.extractedDates[1].dateTextExtracted).to.eql('next wednesday');
        expect(result.extractedDates[1].dateTextExtractedIndex).to.eql(40);
    });

    it('should return good used language for french text', function () {
        var result = dateExtractor.extractDatesFromText(frenchText);
        expect(result.usedLanguage).to.eql('fr');
    });

    it('should return good used language for english text', function () {
        var result = dateExtractor.extractDatesFromText(englishText);
        expect(result.usedLanguage).to.eql('en');
    });
});
//# sourceMappingURL=datesExtractor.spec.js.map