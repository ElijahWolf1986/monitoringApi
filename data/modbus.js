const Node = require('../models/node');
const ModbusRTU = require('modbus-serial');
const BadRequestError = require('../errors/BadRequestError.js');

const startDgu = async (req, res, next) => {
  const { ip, port, clientId } = req.body;
  const client = new ModbusRTU();
  client
    .connectTCP(ip, { port: port })
    .then(() => {
      client.setID(clientId);
      client.writeCoil(0, 1).then((data) => {
        return res.status(200).send(data);
      });
    })
    .catch((err) => {
      return next(
        new BadRequestError(err, 'Не удалось создать узел, попробуйте позже')
      );
    });
};

const stopDgu = async (req, res, next) => {
  const { ip, port, clientId } = req.body;
  const client = new ModbusRTU();
  client
    .connectTCP(ip, { port: port })
    .then(() => {
      client.setID(clientId);
      client.writeCoil(1, 1).then((data) => {
        return res.status(200).send(data);
      });
    })
    .catch((err) => {
      return next(
        new BadRequestError(err, 'Не удалось создать узел, попробуйте позже')
      );
    });
};

const getParamsDgu = async (req, res, next) => {
  const { ip, port, clientId } = req.body;
  const client = new ModbusRTU();
  client
    .connectTCP(ip, { port: port })
    .then(() => {
      client.setID(clientId);
      client.readInputRegisters(0, 41).then((params) => {
        return res.status(200).send(params.data);
      });
    })
    .catch((err) => {
      console.log(err.code);
      return next(
        new BadRequestError('Не удалось опросить узел, попробуйте позже')
      );
    });
};

const getAlarmsDgu = async (req, res, next) => {
  const { ip, port, clientId } = req.body;
  const client = new ModbusRTU();
  client
    .connectTCP(ip, { port: port })
    .then(() => {
      client.setID(clientId);
      client.readDiscreteInputs(35, 34).then((params) => {
        return res.status(200).send(params.data);
      });
    })
    .catch((err) => {
      console.log(err.code);
      return next(
        new BadRequestError('Не удалось опросить узел, попробуйте позже')
      );
    });
};

module.exports = {
  startDgu,
  stopDgu,
  getParamsDgu,
  getAlarmsDgu,
  // updateUptime,
};
