const gulp = require('gulp');
const babel = require('gulp-babel');



gulp.task('babel', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('default', () => {
  gulp.watch('src/app.js', ['babel']);
});