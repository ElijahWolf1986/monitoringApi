const router = require('express').Router();
const { getSnmpOids } = require('../data/snmp');

router.get('/', getSnmpOids);

module.exports = { router };
