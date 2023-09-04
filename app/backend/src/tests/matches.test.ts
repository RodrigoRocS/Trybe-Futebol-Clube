import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesService from '../services/matches.services';
import matchesMock from './mocks/matches.mock';


chai.use(chaiHttp);
const { expect } = chai;



describe('Matches', function () { 
    beforeEach(function () { sinon.restore(); });
  
    it('Verifica se retorna todas as partidas.', async function () {

        const response = await chai.request(app).get('/matches');
     
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesMock.allMatches);
    });

    it('Verifica se retorna apenas as partidas em andamento.', async function () {

        const response = await chai.request(app).get('/matches?inProgress=true');
     
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesMock.matchInProgressTrue);
    });

    it('Verifica se retorna apenas as partidas finalizadas.', async function () {

        const response = await chai.request(app).get('/matches?inProgress=false');
     
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesMock.matchInProgressFalse);
    });
  
  });