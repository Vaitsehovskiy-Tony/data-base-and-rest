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
const { PORT } = require('./config/index');


const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// подключаем rate-limiter
app.use(limiter);
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
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected t0 MongoDB');
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log('Connection error');
  });


app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate(signUpSchema), createUser);
app.post('/signin', celebrate(signInSchema), login);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const status = err.status || 500;
  const { message } = err;
  if (err.status === '401' || err.joi) {
    return res.status(401).send(`validation error; ${err.massage}`);
  }
  if (err.status === '403' || err.joi) {
    return res.status(403).send(`validation error; ${err.massage}`);
  }
  if (err.status === '404' || err.joi) {
    return res.status(404).send(`validation error; ${err.massage}`);
  }
  if (err.status === '400' || err.joi) {
    return res.status(400).send(`validation error; ${err.massage}`);
  }
  res.status(status).send({ message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
