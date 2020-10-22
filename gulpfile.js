const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('test:ts', shell.task(`tsc -w`));

gulp.task('test:server', shell.task(`mm-server`));

gulp.task('test', gulp.parallel('test:ts', 'test:server'));

gulp.task('build:drop-console', () => {
	const uglify = require('gulp-uglify-es').default;

	return gulp.src('dist/**/*.js')
		.pipe(uglify({
			compress: {
				drop_console: true
			},
			output: {
				comments: false
			}
		}))
		.pipe(gulp.dest(`dist/`));
});

gulp.task('default', gulp.parallel('build:drop-console'));
