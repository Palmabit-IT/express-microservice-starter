'use strict';

exports.errorHandler = function (err, req, res, next) {
  if (err.status === 400) {
    return res.status(400).send(err || 'Bad request');
  }
  if (err.status === 500) {
    return res.status(500).send(err || 'Internal server error');
  }
  next(err);
};
