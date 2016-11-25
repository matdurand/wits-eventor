import {WitsEventor} from "../src/Eventor";
let expect = require('chai').expect;

describe('eventor', () => {

    it('should throw an error when pushing an empty dictionary', () => {
        expect(() => new WitsEventor().addSubjectDictionary('fr', undefined)).to.throw(Error);
    });

    it('should throw an error when pushing a dictionary with a unknown language', () => {
        expect(() => new WitsEventor().addSubjectDictionary('zz', ['a', 'b'])).to.throw(Error);
    });

    it('should return a non matching result if the subject is not found in the dictionary', () => {
        const eventor = new WitsEventor();
        eventor.addSubjectDictionary('en', ['Meeting']);
        const result = eventor.getEventFromInput('Practice tomorrow at noon');
        expect(result.error).to.eql('No subject found');
    });

    it('should return a non matching result if there is no dates', () => {
        const eventor = new WitsEventor();
        const result = eventor.getEventFromInput('Practice');
        expect(result.error).to.eql('No dates found');
    });

    it('should return a matching result with a subject from the subject list with a exact match', () => {
        const eventor = new WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        const result = eventor.getEventFromInput('Practice tomorrow at noon');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
    });

    it('should return a matching result with a subject from the subject list ignoring case', () => {
        const eventor = new WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        const result = eventor.getEventFromInput('practice tomorrow at noon');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
    });

    it('should return a matching result with a subject from the subject list ignoring plurials', () => {
        const eventor = new WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        const result = eventor.getEventFromInput('practices tomorrow at noon');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
    });

    it('should return a matching result with a subject and an action', () => {
        const eventor = new WitsEventor();
        eventor.addSubjectDictionary('en', ['Practice']);
        eventor.addActionDictionary('en', ['Cancel']);
        const result = eventor.getEventFromInput('Practice cancelled tomorrow morning');
        expect(result.error).to.be.undefined;
        expect(result.subject).to.eql('Practice');
        expect(result.action).to.eql('Cancel');
    });
});