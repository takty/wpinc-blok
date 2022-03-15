/**
 * Gulp file
 *
 * @author Takuto Yanagida
 * @version 2022-03-14
 */

/* eslint-disable no-undef */
'use strict';

const SRC_JS   = ['src/assets/**/*.js', '!src/assets/**/*.min.js'];
const SRC_PHP  = ['src/**/*.php'];
const SRC_PO   = ['src/languages/**/*.po', '!src/languages/**/wpinc-*.po'];
const SRC_JSON = ['src/languages/**/*.json'];
const DIST     = './dist';

const gulp = require('gulp');
const $    = require('gulp-load-plugins')({ pattern: ['gulp-*', '!gulp-sass'] });


// -----------------------------------------------------------------------------


const js = () => {
	if (SRC_JS.length === 0) return done();
	return gulp.src(SRC_JS, { base: 'src' })
		.pipe($.plumber())
		.pipe($.babel())
		.pipe($.terser())
		.pipe($.changed(DIST, { hasChanged: $.changed.compareContents, extension: '.min.js' }))
		.pipe($.rename({ extname: '.min.js' }))
		.pipe(gulp.dest(DIST));
};


// -----------------------------------------------------------------------------


const php = () => {
	if (SRC_PHP.length === 0) return done();
	return gulp.src(SRC_PHP)
		.pipe($.plumber())
		.pipe($.changed(DIST, { hasChanged: $.changed.compareContents }))
		.pipe(gulp.dest(DIST));
};


// -----------------------------------------------------------------------------


const po = () => {
	if (SRC_PO.length === 0) return done();
	return gulp.src(SRC_PO, { base: 'src' })
		.pipe($.plumber())
		.pipe($.gettext())
		.pipe($.changed(DIST, { hasChanged: $.changed.compareContents }))
		.pipe(gulp.dest(DIST));
};

const json = () => {
	if (SRC_JSON.length === 0) return done();
	return gulp.src(SRC_JSON, { base: 'src' })
		.pipe($.plumber())
		.pipe($.changed(DIST, { hasChanged: $.changed.compareContents }))
		.pipe(gulp.dest(DIST));
};

const locale = gulp.parallel(po, json);


// -----------------------------------------------------------------------------


const watch = () => {
	gulp.watch(SRC_JS, js);
	gulp.watch(SRC_PHP, php);
	gulp.watch(SRC_PO, po);
	gulp.watch(SRC_JSON, json);
};

exports.build = gulp.parallel(js, php, locale);

exports.default = gulp.series(exports.build, watch);
