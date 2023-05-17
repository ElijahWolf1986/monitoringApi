const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const userRouter = require('./users').router;
const nodesRouter = require('./nodes').router;
const dguRouter = require('./modbus').router;
const snmpRouter = require('./snmp').router;

const NotFoundError = require('../errors/NotFoundError');
const checkPassword = require('../middlewares/check-password');
const { login, createUser } = require('../controllers/users');
const {
  validateSignin,
  validateSignup,
} = require('../middlewares/validationJoi');

router.post('/signup', validateSignup, checkPassword, createUser);
router.post('/signin', validateSignin, checkPassword, login);
router.use('/users', auth, userRouter);
router.use('/nodes', nodesRouter);
router.use('/dgu', dguRouter);
router.use('/snmp', snmpRouter);

router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
