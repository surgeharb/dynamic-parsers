const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');

gulp.task('build', () => {
  const tsResult = gulp.src(['src/**/*.ts']).pipe(tsProject());
  tsResult.js.pipe(gulp.dest('./build'));
  tsResult.dts.pipe(gulp.dest('./build'));
  return tsResult;
});

// gulp.task('build', () => {
//   const tsResult = gulp.src(['src/**/*.ts']).pipe(tsProject());
//   tsResult.dts.pipe(gulp.dest('./build'));
//   return;
// });

gulp.task('default', gulp.series(['build']), () => {});