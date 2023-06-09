const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { bdlocaladdress } = require('./config');

const { PORT = 3000, dbaddress = bdlocaladdress } = process.env;
const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

mongoose.connect(dbaddress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(routes);
// app.use(dataCatcher);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
