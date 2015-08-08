var gulp = require('gulp'),
  browserSync = require('browser-sync');

gulp.task('default', function() {
  browserSync({
    files: "**",
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('./*.*', ['default']);
});