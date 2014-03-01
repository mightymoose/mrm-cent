var gulp = require('gulp');
var karma = require('gulp-karma');

gulp.task('default', function(){
  return gulp.src(['*.test.js'])
    .pipe(karma({
      configFile: 'karma.conf.js'   
    }))
});
