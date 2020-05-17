const express = require('express');
const path = require('path');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
