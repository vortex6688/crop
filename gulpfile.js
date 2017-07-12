var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var imagemin    = require('gulp-imagemin');
var cp          = require('child_process');

// Static Server + watching scss/html files
gulp.task('serve', ['build-jekyll', 'sass', 'index', 'images', 'fonts'], function() {

    browserSync.init({
        server: "./docs"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("src/images/**/*.*", ['images']).on('change', browserSync.reload);
    gulp.watch("src/images/**/*.*", ['fonts']).on('change', browserSync.reload);
    gulp.watch("src/*.html", ['index']).on('change', browserSync.reload);
    gulp.watch("src/jekyll/**/*.html", ['build-jekyll']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});

// Copy index document in the production folder
gulp.task('index', function() {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
});

// Copy fonts in the production folder
gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*.*")
        .pipe(gulp.dest("docs/fonts/"))
        .pipe(browserSync.stream());
});

// Copy and reduce image size
gulp.task('images', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/images'))
        .pipe(browserSync.stream())
);

// Rebuild Jekyll
gulp.task('build-jekyll', (code) => {
  return cp.spawn('C:\\Ruby23-x64\\bin\\jekyll.bat', ['build', '--incremental'], {stdio: 'inherit'}) // Adding incremental reduces build time.
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code);
});

gulp.task('default', ['serve']);