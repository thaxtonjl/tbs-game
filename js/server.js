/*global console, __dirname, exports, process, require */
(function () {
    'use strict';

    var connectLivereload = require('connect-livereload'),
        express = require('express'),
        liveReload,
        path = require('path'),
        RELOAD_PORT = 35739,
        SERVER_PORT = process.env.PORT || 5010,
        STATIC_PATH = __dirname + '/../src',
        tinyLr = require('tiny-lr');

    exports.reload = function (event) {
        var fileName = path.relative(STATIC_PATH, event.path);
        console.log('Reloading browser...');
        liveReload.changed({
            body: {
                files: [fileName]
            }
        });
    };

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
