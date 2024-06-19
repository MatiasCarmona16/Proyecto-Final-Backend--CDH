import * as chai from 'chai';
import { createHash } from "../../src/utils/bcryps.js";

const expect = chai.expect;

describe('Testeo para la libreria de Encriptacion de password-Bcryps', () => {

    //before

    //beforeEach

    //It-01

    it('La funcion deberia crear una password encriptada.', function () {

        //Given
        const passwordTest = '12345abc'

        //Then
        const result = createHash(passwordTest)
        console.log(result)

        //Assert 
        expect(result).not.to.be.NaN;
        expect(result).not.to.be.undefined;
        expect(result).not.to.be.null;
        expect(result).not.to.be.empty;
        expect(result).not.equal(passwordTest);
    })
})