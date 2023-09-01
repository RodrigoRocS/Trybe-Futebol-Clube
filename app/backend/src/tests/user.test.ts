import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import userMock from './mocks/user.mock';
import UserService from '../services/user.services';
import { IToken } from '../Interfaces/Login/IToken';

chai.use(chaiHttp);
const { expect } = chai;



describe('POST /login', function () { 
    beforeEach(function () { sinon.restore(); });
  
    it('Verifica se retorna um token ao fazer login com dados validos.', async function () {
  
     const response = await chai.request(app).post('/login').send(userMock.validUser)
     
     expect(response.status).to.be.equal(200)
     expect(response.body).to.have.property('token');
  
    })

    it('Verifica se retorna status bad request ao fazer login sem email.', async function () {
      
        const response = await chai.request(app).post('/login').send(userMock.userNoEmail);
      
        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
      });

      it('Verifica se retorna status bad request ao fazer login sem senha.', async function () {
      
        const response = await chai.request(app).post('/login').send(userMock.userNoPsw);
      
        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
      });

      it('Verifica se retorna status 401 e a mensagem "Token not found" sem token.', async function () {
        const response = await chai.request(app).get('/login/role');
      
        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal({ message: 'Token not found' });
      });

      it('Verifica se retorna status 401 e a mensagem "Token must be a valid token" com token inválido.', async function () {
        const invalidToken = 'token_inválido';
        const response = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${invalidToken}`);
      
        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
      });

      it('Verifica se retorna status 200 e a role do usuário com token válido.', async function () {
        const userService = new UserService();
        sinon.stub(userService, 'verifyRole').resolves({ status: 'SUCCESSFUL', data: { role: 'admin' } });
        const response = await userService.verifyRole(userMock.tokenValid);
      
        expect(response.status).to.be.equal('SUCCESSFUL');
        expect(response.data).to.deep.equal({ role: 'admin' });
      });
  
  });