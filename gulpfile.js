const gulp = require('gulp')
const { src,dest,parallel,series } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const minifyCss = require('gulp-clean-css')
const del = require('del')


// Html

const html = () => {
    return gulp.src('dist/**/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
}

exports.html = html


// Styles

const styles = () => {
    return src([
        'dist/styles/**/*.css'
    ])
        .pipe(minifyCss())
        .pipe(dest('dist/styles'))
}

exports.styles = styles

// Clean

const clean = () => {
    return del([
        'dist/styles/blocks',
        'dist/styles/**/*.css',
        '!dist/styles/index.css'
    ])
}

exports.clean = clean


// Default


gulp.task('build', gulp.series(
    gulp.parallel(
        html,
        styles
    ),
    gulp.parallel(
        clean
    )))