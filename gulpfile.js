var gulp = require('gulp');
var karma = require('gulp-karma');

var testFiles = [
  'lib/angular/angular.js',
  'lib/angular-mocks/angular-mocks.js',
  'centrifuge.js',
  'cent.js',
  'spec/*.test.js'
];

gulp.task('test', function(){
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('default', function(){
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
