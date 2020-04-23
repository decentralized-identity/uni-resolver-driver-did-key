'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.resolve = function resolve (req, res, next, identifier, accept) {
  Default.resolve(identifier, accept)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
