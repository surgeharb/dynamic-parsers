const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');

gulp.task('build', () => {
  const tsResult = gulp.src(['src/**/*.ts']).pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('./build'));
});

gulp.task('default', gulp.series(['build']), () => {});