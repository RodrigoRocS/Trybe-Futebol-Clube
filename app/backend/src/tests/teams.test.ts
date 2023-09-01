import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);
const { expect } = chai;



describe('GET /teams', function () { 
    beforeEach(function () { sinon.restore(); });
  
    it('Verifica se retorna todos os times cadastrados.', async function () {
  
     const response = await chai.request(app).get('/teams')
    //  console.log(response);
     
     expect(response.status).to.be.equal(200)
     expect(response.body).to.be.deep.equal(teamsMock.allTeams)
  
    })

    it('Verifica se retorna o time correto na busca por id.', async function () {
  
      const response = await chai.request(app).get('/teams/5')
     //  console.log(response);
      
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(teamsMock.teamById)
   
     })
  
  });