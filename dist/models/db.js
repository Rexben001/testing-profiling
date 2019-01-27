"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const user = [{
  user_id: 1,
  firstname: 'Ben',
  lastname: 'Rex',
  othernames: 'Seyi',
  email: 'rex@gmail.com',
  phonenumber: '234567890',
  username: 'Rexben',
  registered: '12-12-12',
  is_admin: false,
  report: []
}];
const party = [{
  party_id: 1,
  name: 'Action People (AP)',
  hqAddress: '10, Allison Street, Lagos',
  logoUrl: 'https://politico.com/ap_logo'
}];
const office = [{
  office_id: 1,
  type: 'State',
  name: 'Governor',
  region: 'Ogun'
}];
const candidate = [{
  id: 1,
  office: 2,
  party: 2,
  candidate: 1,
  qualification: 'B.A.'
}];
const vote = [{
  vote_id: 1,
  createdOn: '10-10-10',
  createdBy: 1,
  office: 1,
  body: 'Displeasure in the result of the gubernutoral election in Lagos. I want to make a petition'
}];
const petition = [{
  petition_id: 1,
  createdOn: '10-10-10',
  createdBy: 1,
  body: 'Displeasure in the result of the gubernutoral election in Lagos. I want to make a petition'
}];
var _default = {
  petition,
  candidate,
  office,
  user,
  party,
  vote
};
exports.default = _default;