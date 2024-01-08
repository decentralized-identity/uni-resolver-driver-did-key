'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.resolve = function resolve (req, res) {
    const identifier = req.params['identifier'];
    const accept = req.get('accept');
    console.log('request: ' + identifier);
    console.log('accept: ' + accept);
    Default.resolve(identifier, accept)
        .then(function (response) {
            console.log('result: ' + JSON.stringify(response));
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            console.log('error: ' + JSON.stringify(response));
            utils.writeJson(res, response);
        });
};
