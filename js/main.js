/*global process */
(function () {
    'use strict';

    var clientPort = process.env.PORT || 5010,
        gulp = require('gulp'),
        gulpOpen = require('gulp-open'),
        runSequence = require('run-sequence'),
        server = require('./server');

    gulp.task('connect', function () {
        server.start();
    });

    gulp.task('default', function (callback) {
        runSequence('serve', 'watch', callback);
    });

    gulp.task('open', ['default'], function () {
        gulp.src('./src/index.html')
            .pipe(gulpOpen({
                uri: 'http://localhost:' + clientPort + '/'
            }));
    });

    gulp.task('serve', function (callback) {
        runSequence('connect', callback);
    });

    gulp.task('watch', function () {
        gulp.watch([
            './src/**'
        ], function (event) {
            console.log(event.type + ': ' + event.path);
            server.reload(event);
        });
    });

}());
