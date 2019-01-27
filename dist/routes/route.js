"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _adminController = _interopRequireDefault(require("../controllers/adminController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/parties', _adminController.default.getParties);
router.post('/parties', _adminController.default.createParty);
router.get('/parties/:party_id', _adminController.default.getParty);
router.patch('/parties/:party_id', _adminController.default.editParty);
router.patch('/parties/:party_id/name', _adminController.default.editParty);
router.delete('/parties/:party_id', _adminController.default.deleteParty);
router.post('/offices', _adminController.default.createOffice);
router.get('/offices', _adminController.default.getOffices);
router.get('/offices/:office_id', _adminController.default.getOffice);
var _default = router;
exports.default = _default;