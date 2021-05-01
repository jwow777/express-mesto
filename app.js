const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFound = require('./routes/notFound');

const { PORT = 3000 } = process.env;

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValid, userInfoValid } = require('./middlewares/validation');

const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);

app.disable('x-powered-by');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', loginValid, login);
app.post('/signup', userInfoValid, createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', notFound);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT);
