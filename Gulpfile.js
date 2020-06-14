const { series } = require('gulp');
const gulp = require('gulp');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const cleanFile = require('gulp-clean');

const config = require("D:/Projects/tnyPlayer/config.js");
const buildPath = config.buildPath;


// Copy all html as is
function html() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest(buildPath));
}

// Compile CSS file and move them to the app folder
function css() {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildPath));
}


// Compile JS files and move them to the buildPath folder
function js() { 
    return gulp.src('src/**/*.js')
        // .pipe(babel())
        .pipe(gulp.dest(buildPath));
}

// Copy JSON files 
function json() {
    return gulp.src('src/**/*.json')
        // .pipe(babel())
        .pipe(gulp.dest(buildPath));
}

function jsx() {
    return gulp.src('src/**/*.jsx')
        .pipe(babel())
        .pipe(gulp.dest(buildPath));
}


function clean() {
    return gulp.src(buildPath, { read: false })
        .pipe(cleanFile());
}

// Export the "start" task.
exports.build = series(html, css, js, jsx, json);
exports.clean = clean;
exports.cleanInstall = series(clean, html, css, js, jsx, json);
