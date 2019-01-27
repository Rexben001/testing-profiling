"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.should();

describe('POST /parties', () => {
  it('it should post a new political party', done => {
    const newParty = {
      party_id: 2,
      name: 'Lion Action People (LAP)',
      hqAddress: '10, Allison Street, Jos',
      logoUrl: 'https://politico.com/lap_logo'
    };

    _chai.default.request(_app.default).post('/api/v1/parties').send(newParty).end((err, res) => {
      res.should.have.status(201);
      res.body.data.name.should.equal('Lion Action People (LAP)');
      res.body.data.logoUrl.should.equal('https://politico.com/lap_logo');
      res.body.data.hqAddress.should.be.a('String');
      done(err);
    });
  });
});
describe('GET /parties', () => {
  it('it should get all political parties', done => {
    _chai.default.request(_app.default).get('/api/v1/parties').end((err, res) => {
      res.should.have.status(200);
      res.body.data.should.be.a('Array');
      res.body.data[0].name.should.equal('Action People (AP)');
      res.body.data[1].logoUrl.should.equal('https://politico.com/lap_logo');
      done(err);
    });
  });
});
describe('GET /parties/<party-id>', () => {
  it('it should get a specific political party', done => {
    _chai.default.request(_app.default).get('/api/v1/parties/1').end((err, res) => {
      res.should.have.status(200);
      res.body.data.name.should.equal('Action People (AP)');
      res.body.data.logoUrl.should.equal('https://politico.com/ap_logo');
      done(err);
    });
  });
  it('it should return error 404', done => {
    _chai.default.request(_app.default).get('/api/v1/parties/5').end((err, res) => {
      res.should.have.status(404);
      res.body.error.should.equal('Unable to retrieve party');
      done(err);
    });
  });
});
describe('PATCH /parties/<party-id>/name', () => {
  it('it should edit a specific political party', done => {
    const editParty = {
      name: 'National Action People (NAP)'
    };

    _chai.default.request(_app.default).patch('/api/v1/parties/1/name').send(editParty).end((err, res) => {
      res.should.have.status(200);
      res.body.data[0].name.should.equal('National Action People (NAP)');
      res.body.data[0].id.should.equal(1);
      done(err);
    });
  });
  it('it should return error 404', done => {
    const editParty = {
      name: 'National Action People (NAP)'
    };

    _chai.default.request(_app.default).patch('/api/v1/parties/5/name').send(editParty).end((err, res) => {
      res.should.have.status(404);
      res.body.error.should.equal('Unable to retrieve party');
      done(err);
    });
  });
});
describe('DELETE /parties/<party-id>', () => {
  it('it should delete a specific political party', done => {
    _chai.default.request(_app.default).delete('/api/v1/parties/1').end((err, res) => {
      res.should.have.status(200);
      res.body.data[0].message.should.equal('You have successfully deleted National Action People (NAP)');
      done(err);
    });
  });
  it('it should return error 404', done => {
    _chai.default.request(_app.default).delete('/api/v1/parties/5').end((err, res) => {
      res.should.have.status(404);
      res.body.error.should.equal('Unable to retrieve party');
      done(err);
    });
  });
});
describe('POST /offices', () => {
  it('it should post a new political office', done => {
    const newOffice = {
      office_id: 2,
      type: 'Federal',
      name: 'President',
      region: 'Country'
    };

    _chai.default.request(_app.default).post('/api/v1/offices').send(newOffice).end((err, res) => {
      res.should.have.status(201);
      res.body.data.type.should.equal('Federal');
      res.body.data.name.should.equal('President');
      res.body.data.region.should.be.a('String');
      done(err);
    });
  });
});
describe('GET /offices', () => {
  it('it should get all political offices', done => {
    _chai.default.request(_app.default).get('/api/v1/offices').end((err, res) => {
      res.should.have.status(200);
      res.body.data.should.be.a('Array');
      res.body.data[0].type.should.equal('State');
      res.body.data[1].name.should.equal('President');
      done(err);
    });
  });
});
describe('GET /offices/<office-id>', () => {
  it('it should get a specific political office', done => {
    _chai.default.request(_app.default).get('/api/v1/offices/1').end((err, res) => {
      res.should.have.status(200);
      res.body.data.type.should.equal('State');
      res.body.data.name.should.equal('Governor');
      done(err);
    });
  });
  it('it should return error 404', done => {
    _chai.default.request(_app.default).get('/api/v1/offices/5').end((err, res) => {
      res.should.have.status(404);
      res.body.error.should.equal('Unable to retrieve party');
      done(err);
    });
  });
});