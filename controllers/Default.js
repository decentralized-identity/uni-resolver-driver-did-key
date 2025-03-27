'use strict';

import * as utils from '../utils/writer.js';
import * as Service from '../service/DefaultService.js';

export function resolve(req, res) {
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
}