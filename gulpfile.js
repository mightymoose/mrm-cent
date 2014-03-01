var gulp = require('gulp');
var karma = require('gulp-karma');

gulp.task('default', function(){
  var testFiles = [
    'lib/angular/angular.js',
    'lib/angular-mocks/angular-mocks.js',
    '*.test.js'
  ]

  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
});
