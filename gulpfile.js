var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

gulp.task('start', function() {
    return gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task('clean', function() {
    gulp.src('dist/*').pipe(clean());
});

gulp.task('compress', function() {
    return gulp.src(['app/**/*.js', 'app/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
    return gulp.src(['css/*.css', '*.css'])
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['start']);
