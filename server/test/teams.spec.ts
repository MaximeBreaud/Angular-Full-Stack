import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import teamModel from '../models/teamModel';

const should = chai.use(chaiHttp).should();

describe('teams', () => {

  beforeEach((done) => {
    teamModel.remove({}, (err) => {
      done();
    });
  });

  describe('Backend tests for teams', () => {

    it('should get all the teams', (done) => {
      chai.request(app)
        .get('/api/teams')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get teams count', (done) => {
      chai.request(app)
        .get('/api/teams/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new team', (done) => {
      const newTeam = new teamModel({ name: 'Fluffy', weight: 4, age: 2 });
      chai.request(app)
        .post('/api/team')
        .send(newTeam)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a team by its id', (done) => {
      const newTeam = new teamModel({ name: 'team', weight: 2, age: 4 });
      newTeam.save((error, newteam) => {
        chai.request(app)
          .get(`/api/team/${newteam.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newteam.id);
            done();
          });
      });
    });

    it('should update a team by its id', (done) => {
      const newTeam = new teamModel({ name: 'team', weight: 2, age: 4 });
      newTeam.save((error, newteam) => {
        chai.request(app)
          .put(`/api/team/${newteam.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a team by its id', (done) => {
      const newTeam = new teamModel({ name: 'team', weight: 2, age: 4 });
      newTeam.save((error, newteam) => {
        chai.request(app)
          .delete(`/api/team/${newteam.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


