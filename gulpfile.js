var gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

// Copy over all the HTML to the build folder
gulp.task('copy-html', function() {
  gulp.src('src/*.html')
  .pipe(gulp.dest('build'))
})

// Copy over all the JS to the build folder
gulp.task('copy-js', function() {
  gulp.src('src/js/*.js')
  .pipe(gulp.dest('build/js'))
})

// Copy over all the images to the build folder
gulp.task('copy-img', function() {
  gulp.src('src/img/*.svg')
  .pipe(gulp.dest('build/img'))

// Copy over all the data to the build folder
gulp.task('copy-data', function() {
  gulp.src('src/data/*.json')
  .pipe(gulp.dest('build/data'))
})

// Serve Application on localhost
gulp.task('serve', function() {
  browserSync.init({
    server: "./build",
    port: 3000
  });
  browserSync.stream();
});

// Minify and copy CSS files to the build folder
gulp.task('min-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'))
    // .pipe(connect.reload())
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['copy-js']).on('change', browserSync.reload);
  gulp.watch('src/img/*.svg', ['copy-img']).on('change', browserSync.reload);
  gulp.watch('src/css/*.css', ['min-css']).on('change', browserSync.reload);
  gulp.watch('src/*.html', ['copy-html']).on('change', browserSync.reload);
})

gulp.task('default', ['copy-html', 'copy-js', 'copy-data', 'copy-img', 'serve', 'watch']);
