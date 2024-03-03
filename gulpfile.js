const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const inject = require('gulp-inject')
const sass = require('gulp-sass')(require('node-sass'))
const cssnano = require('gulp-cssnano')
const browserSync = require('browser-sync').create()

function html() {
	const header = gulp.src('src/partials/header.html')
	const footer = gulp.src('src/partials/footer.html')
	const head = gulp.src('src/partials/head.html')

	return gulp.src('src/pages/**/*.html')
		.pipe(inject(head, {
			starttag: '<!-- inject:head -->',
			endtag: '<!-- endinject -->',
			transform: function (filePath, file) {
				return file.contents.toString('utf8')
			}
		}))
		.pipe(inject(header, {
			starttag: '<!-- inject:header -->',
			endtag: '<!-- endinject -->',
			transform: function (filePath, file) {
				return file.contents.toString('utf8')
			}
		}))
		.pipe(inject(footer, {
			starttag: '<!-- inject:footer -->',
			endtag: '<!-- endinject -->',
			transform: function (filePath, file) {
				return file.contents.toString('utf8')
			}
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream())
}

function js() {
	return gulp.src('src/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream())
}

function json() {
	return gulp.src('src/*.json')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream())
}

function css() {
	return gulp.src('src/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
		}))
		.pipe(cssnano())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
}

function assets() {
	return gulp.src('src/assets/**/*')
		.pipe(gulp.dest('dist/assets'))
}

function cleanDist() {
	return gulp.src('dist/*', { read: false })
		.pipe(clean())
}

exports.build = gulp.series(cleanDist, gulp.parallel(html, css, js, json, assets))

function serve() {
	browserSync.init({
		server: {
			baseDir: 'dist',
		},
	})
}

gulp.task('watch', function () {
	serve()
	gulp.watch('src/**/*.html', gulp.series(html))
	gulp.watch('src/**/*.scss', gulp.series(css))
	gulp.watch('src/**/*.js', gulp.series(js))
	gulp.watch('src/**/*.json', gulp.series(json))
	gulp.watch('src/assets/**/*', gulp.series(assets))
})

gulp.task('css', css)
gulp.task('js', js)
gulp.task('json', json)
gulp.task('html', html)
gulp.task('assets', assets)
gulp.task('clean', cleanDist)