'use strict';

const utils = require('../utils/writer.js');
// const Default = require('../service/DefaultService');
import {resolve as Default} from "../service/DefaultService.js";


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
