const router = require('express').Router();
const {
  startDgu,
  stopDgu,
  getParamsDgu,
  getAlarmsDgu,
} = require('../data/modbus');

router.get('/', getParamsDgu);
router.post('/', startDgu);
router.put('/', getAlarmsDgu);
router.delete('/', stopDgu);

module.exports = { router };
