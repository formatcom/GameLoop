//Dependencias
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulp        = require('gulp');
var minifyHTML  = require('gulp-minify-html');
var minifyCSS   = require('gulp-minify-css');
var minifyJS    = require('gulp-uglify');
var rename      = require('gulp-rename');
var concatJS    = require('gulp-concat');
var concatCSS   = require('gulp-concat-css');
var del         = require('del');

//Archivos a copiar a dist

var _PROYECTOJS = 'assets/js/**/*';

var _BASE = [
	'index.html'
];

gulp.task('minify-js', function () {
    gulp.src(_PROYECTOJS)
    .pipe(minifyJS())
    .pipe(concatJS('main.min.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(reload({stream: true, once: true}));
});


gulp.task('copyBase', function(){
	gulp.src(_BASE)
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true, once: true}));
});


gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

gulp.task('watch', function() {
    // Cambios principales
    gulp.watch(_PROYECTOJS, ['minify-js']);
    gulp.watch(_BASE,  ['copyBase']);
});

gulp.task('server', function () {
  browserSync({
    notify: false,
    server: 'dist/'
  });
});

//Tarea por defecto
gulp.task('default', ['clean'], function() {
    gulp.start('copyBase', 'minify-js', 'server', 'watch');
});


