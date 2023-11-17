const express = require('express');

const { errors } = require('celebrate');

const {
  celebrate,
  Joi,
} = require('celebrate');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const cors = require('cors');
const { requestLoggs, errorLoggs } = require('./middlewares/loggs');

const NotFoundError = require('./errors/NotFoundError');

const {
  createUsers,
  login,
} = require('./controllers/users');

const routes = require('./routes/index');

const auth = require('./middlewares/auth');

const regex = /^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im;

const corsUrl = [
  'https://mesto.haku.nomoredomainsmonster.ru',
  'http://mesto.haku.nomoredomainsmonster.ru',
  'http://localhost:3001',
  'https://localhost:3001',
];

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
});

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: corsUrl }));

app.use(requestLoggs);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required(),
      }),
  }),
  login,
);
app.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regex),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
}), createUsers);

app.use(auth);

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('Что то не так'));
});

app.use(errors());

app.use(errorLoggs);

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
