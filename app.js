/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors, celebrate } = require('celebrate');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(limiter);// подключаем rate-limiter
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { signInSchema } = require('./schemas/signInSchema');
const { signUpSchema } = require('./schemas/signUpSchema');


// подключаемся к серверу mongo
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected t0 MongoDB');
  })
  .catch(() => {
    console.log('Connection error');
  });


app.use(express.static(path.join(__dirname, 'public')));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.post('/signup', celebrate(signUpSchema), createUser);
app.post('/signin', celebrate(signInSchema), login);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use(errorLogger);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  let { message } = err;
  if (err.name === 'ValidationError' || err.joi) {
    return res.status(400).send(`validation error: ${err.massage}`);
  }
  if (status === 500) {
    console.error(err.stack || err);
    message = 'unexpected error';
  }
  return res.status(status).send({ message });
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
