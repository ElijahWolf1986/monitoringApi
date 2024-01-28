const router = require('express').Router();
const { getSnmpOids } = require('../data/snmp');

router.put('/', getSnmpOids);

module.exports = { router };
