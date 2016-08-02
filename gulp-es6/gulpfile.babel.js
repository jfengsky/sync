'use strict'

import gulp from 'gulp'
import less from 'gulp-less'

const PATHS = {
  less: 'less/',
  dest: 'build/'
}

gulp.task('less', () => {
  gulp.src(`${PATHS.less}**/*.less`)
    .pipe(less())
    .pipe(gulp.dest(`${PATHS.dest}css/`))
})