'use strict';

const utils = require('../utils/writer.js');
const Service = require('../service/DefaultService.js');

exports.resolve = function resolve (req, res) {
    const identifier = req.params['identifier'];
    const accept = req.get('accept');
    console.log('request: ' + identifier);
    console.log('accept: ' + accept);
    Service.resolve(identifier, accept)
        .then(function (response) {
            console.log('result: ' + JSON.stringify(response));
            utils.writeJson(res, response);
        })
        .catch(function (error) {
            console.error(error);
            utils.writeJson(res, { code:500, payload:'' + error });
        });
};
