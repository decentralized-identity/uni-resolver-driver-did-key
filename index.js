'use strict';

import http from 'http';
import express from 'express';
import {resolve} from './controllers/Default.js';

const serverPort = 8080;

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

app.get('/1.0/identifiers/:identifier', resolve);

http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});
