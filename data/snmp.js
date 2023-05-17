const Snmp = require('snmp-native');
const BadRequestError = require('../errors/BadRequestError.js');

// const getSnmpOid = async (req, res, next) => {
//   const { host, port, community, oid } = req.body;

//   const session = new Snmp.Session({ host, port, community });
//   session.get({ oid }, (error, data) => {
//     return res.status(200).send(data);
//   });
// };

const getSnmpOids = async (req, res, next) => {
  // Func for single and multiplay OID
  const { host, port, community, oids } = req.body;
  const session = new Snmp.Session({ host, port, community });
  const sum = [];
  session.getAll({ oids }, (error, data) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      data.forEach((res) => {
        sum.push(res);
      });
      return res.status(200).send(sum);
    }
  });
};

module.exports = {
  //   getSnmpOid,
  getSnmpOids,
};
