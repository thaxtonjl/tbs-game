/*global console, __dirname, exports, process, require */
(function () {
    'use strict';
    var connectLivereload = require('connect-livereload'),
        express = require('express'),
        liveReload,
        RELOAD_PORT = 35739,
        SERVER_PORT = process.env.PORT || 5010,
        STATIC_PATH = __dirname + '/../src',
        tinyLr = require('tiny-lr');
    exports.start = function () {
        var app = express();
        liveReload = tinyLr();
        liveReload.listen(RELOAD_PORT);
        app.use(connectLivereload());
        app.use(express['static'](STATIC_PATH));
        app.listen(SERVER_PORT, function () {
            console.log('Listening on ' + SERVER_PORT);
        });
    };
}());
