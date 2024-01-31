const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { router } = require('./routes');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const app = express();

app.use(cors());
app.use(helmet());

mongoose.connect(`${MONGO_URL}`)
  .then(() => console.log('база данных подключена'))
  .catch((err) => console.error(err));
app.use(requestLogger);
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '657ae2eea0c268245901e59b',
  };
  next();
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
