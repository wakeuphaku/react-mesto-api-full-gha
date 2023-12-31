const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const AccesError = require('../errors/AccesError');
const NotFoundError = require('../errors/NotFoundError');

const CREATED = 201;

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line consistent-return
module.exports.createCards = async (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  try {
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.status(CREATED).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequest('Некорректные данные'));
    }
    return next(err);
  }
};

// eslint-disable-next-line consistent-return
module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return next(new NotFoundError('Карточка не найдена '));
    }
    if (card.owner.toString() !== req.user._id.toString()) {
      throw new AccesError('Нет прав');
    }
    card.deleteOne()
      .then(() => res.status(200).send(card))
      .catch(next);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequest('Некорректные данные'));
    }
    next(err);
  }
};
// eslint-disable-next-line consistent-return
module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      return next(new NotFoundError('Некорректные данные'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Некорректные данные'));
    } else {
      next(err);
    }
  }
};
// eslint-disable-next-line consistent-return
module.exports.unlikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      return next(new NotFoundError('Некорректные данные'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Некорректные данные'));
    } else {
      next(err);
    }
  }
};
