'use strict';

var _Eventor = require('../src/Eventor');

var expect = require('chai').expect;

describe('eventor', function () {

    it('should throw an error when pushing an empty dictionary', function () {
        expect(function () {
            return new _Eventor.WitsEventor().addSubjectDictionary('fr', undefined);
        }).to.throw(Error);
    });

    it('should throw an error when pushing a dictionary with a unknown language', function () {
        expect(function () {
            return new _Eventor.WitsEventor().addSubjectDictionary('zz', ['a', 'b']);
        }).to.throw(Error);
    });

    it('should return a non matching result if the subject is not found in the dictionary', function () {
        var eventor = new _Eventor.WitsEventor();
        eventor.addSubjectDictionary('en', ['Meeting']);
        var result = eventor.getEventFromInput('Practice tomorrow at noon');
        expect(result.error).to.eql('No subject found');
    });

    it('should return a non matching result if there is no dates', function () {
        var eventor = new _Eventor.WitsEventor();
        var result = eventor.getEventFromInput('Practice');
        expect(result.error).to.eql('No dates found');
    });

    it('should return a matching result with a subject from the subject list with a exact match', function () {
        var eventor = new _Eventor.WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        var result = eventor.getEventFromInput('Practice tomorrow at noon');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
    });

    it('should return a matching result with a subject from the subject list ignoring case', function () {
        var eventor = new _Eventor.WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        var result = eventor.getEventFromInput('practice tomorrow at noon');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
    });

    it('should return a matching result with a subject from the subject list ignoring plurials', function () {
        var eventor = new _Eventor.WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        var result = eventor.getEventFromInput('practices tomorrow at noon');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
    });

    it('should return a matching result with a subject and an action', function () {
        var eventor = new _Eventor.WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        eventor.addActionDictionary('en', ['Cancel']);
        var result = eventor.getEventFromInput('Practice cancelled tomorrow morning');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
        expect(result.action).to.eql('Cancel');
    });
});
//# sourceMappingURL=WitsEventor.spec.js.map