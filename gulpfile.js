var gulp = require('gulp');
var webserver = require('gulp-webserver');
var _ = require('lodash');
var karma = require('karma').server;
var path = require('path');
var karmaParseConfig = require('karma/lib/config').parseConfig;

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: false,
      directoryListing: {
        path: 'app'
      },
      port: 3000,
      host: '0.0.0.0',
      fallback: 'app/index.html'
    }));
});

var karmaConfigPath = path.resolve('karma.conf.js');
var karmaConf = karmaParseConfig(karmaConfigPath, {});

// Run tests once and exit
gulp.task('test', function(done) {
  karma.start(_.assign({}, karmaConf, { autowatch: false, singleRun: true}), done);
});

// Watch for file changes and re-run tests on each change
gulp.task('tdd', function(done) {
  karma.start(_.assign({}, karmaConf, { autowatch: true, singleRun: false }), done);
});
