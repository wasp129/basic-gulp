'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var compile = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var compress = require('gulp-imagemin');
var runSequence = require('run-sequence');


// Concat all scss files into one large master-scss file
gulp.task("concat", function() {
	console.log("Concatenating all SCSS files --> style.scss")
	return gulp.src(["./src/scss/main.scss", "./src/scss/1200.scss", "./src/scss/960.scss", "./src/scss/780.scss"])
	.pipe(concat("style.scss"))
	.pipe(gulp.dest("./src/"));

});

// Compile the master-scss file into one regular css file
// Add vendor prefixing
gulp.task("compile", function() {
	console.log("Compiling style.scss --> style.css")
	return gulp.src("./src/style.scss")
	.pipe(compile())
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(gulp.dest("./dist/css/"));
});


// Compress all images in src/img
gulp.task("compress", function() {
	console.log("Compressing all images in src/img")
	return gulp.src("./src/img/*")
	.pipe(compress())
	.pipe(gulp.dest("./dist/img/"))
});

// Listens for changes to any scss file, and fires 'concat' and 'compile'
gulp.task("gulp dev", function() {
	return watch(["./src/scss/*.scss", "./src/img/"], function() {
		runSequence("concat", "compile", "compress");
	});
});