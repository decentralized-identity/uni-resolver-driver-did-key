'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.resolve = function resolve (req, res) {
    const identifier = req.params['identifier'];
    const accept = req.get('accept');
    Default.resolve(identifier, accept)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
