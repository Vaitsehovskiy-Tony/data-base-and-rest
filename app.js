const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5ec256155bf64a4688141b8d', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use((err, req, res, next) => {
  const status = err.message || 500;
  let message = err.message;
  if (err.name === 'ValidationError') {
    return res.status(400).send('valid error');
  }

  if(status == 500) {
    console.error(err.stack || err);
    message = 'unexpected error';
  }

  res.status(status).send(message);

});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
