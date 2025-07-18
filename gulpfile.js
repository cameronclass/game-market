"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify-es").default;
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const notify = require("gulp-notify");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const prettyHtml = require("gulp-pretty-html");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

/* Paths */
const srcPath = "src/";
const distPath = "dist/";

const path = {
  build: {
    html: distPath,
    js: distPath + "assets/js/",
    css: distPath + "assets/css/",
    images: distPath + "assets/images/",
    fonts: distPath + "assets/fonts/",
  },
  src: {
    html: srcPath + "*.html",
    js: srcPath + "assets/js/app.js",
    css: srcPath + "assets/scss/*.scss",
    images:
      srcPath +
      "assets/images/**/*.{jpg,png,gif,ico,webp,webmanifest,xml,json}",
    svg: srcPath + "assets/images/**/**/*.svg",
    fonts: srcPath + "/assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
    txt: srcPath + "*.txt",
  },
  watch: {
    html: srcPath + "**/*.html",
    js: srcPath + "assets/js/**/*.js",
    css: srcPath + "assets/scss/**/*.scss",
    images:
      srcPath +
      "assets/images/**/**/*.{jpg,png,gif,ico,webp,webmanifest,xml,json}",
    svg: srcPath + "assets/images/**/**/*.svg",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
    txt: srcPath + "*.txt",
  },
  clean: "./" + distPath,
};

/* Tasks */

function serve() {
  browserSync.init({
    server: {
      baseDir: "./" + distPath,
    },
    notify: false,
    open: false, // не открывать браузер автоматически
    reloadDelay: 300, // добавляем задержку для уменьшения нагрузки
  });
}

function html(cb) {
  panini.refresh();
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(
      panini({
        root: srcPath,
        layouts: srcPath + "layouts/",
        partials: srcPath + "partials/",
        helpers: srcPath + "helpers/",
        data: srcPath + "data/",
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

// Отдельная задача для production HTML
function htmlBuild(cb) {
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(
      panini({
        root: srcPath,
        layouts: srcPath + "layouts/",
        partials: srcPath + "partials/",
        helpers: srcPath + "helpers/",
        data: srcPath + "data/",
      })
    )
    .pipe(
      prettyHtml({
        indent_size: 4,
        indent_char: " ",
        unformatted: ["code", "pre", "em", "strong", "span", "i", "b", "br"],
      })
    )
    .pipe(dest(path.build.html));
}

function css(cb) {
  return src(path.src.css, { base: srcPath + "assets/scss/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "SCSS Error",
            message: "Error: <%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(
      sass({
        includePaths: "./node_modules/",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

// Отдельная задача для production CSS
function cssBuild(cb) {
  return src(path.src.css, { base: srcPath + "assets/scss/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "SCSS Error",
            message: "Error: <%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(
      sass({
        includePaths: "./node_modules/",
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(cssbeautify())
    .pipe(dest(path.build.css)) // Сначала записываем в выходную директорию
    .pipe(
      cssnano({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(removeComments())
    .pipe(dest(path.build.css)); // Записываем минимизированный CSS
}


function js(cb) {
  return src(path.src.js, { base: srcPath + "assets/js/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "JS Error",
            message: "Error: <%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

// Отдельная задача для production JS
function jsBuild(cb) {
  return src(path.src.js, { base: srcPath + "assets/js/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "JS Error",
            message: "Error: <%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(dest(path.build.js));
}

function images(cb) {
  return src(path.src.images)
    .pipe(dest(path.build.images))
    .pipe(browserSync.stream());
}

// Отдельная задача для production images
function imagesBuild(cb) {
  return src(path.src.images)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 65, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.images));
}

function svg(cb) {
  return src(path.src.svg)
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }));
}

function txt(cb) {
  return src(path.src.txt)
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function fonts(cb) {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }));
}

function clean(cb) {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
  gulp.watch([path.watch.svg], svg);
  gulp.watch([path.watch.txt], txt);
}

// Сборка для разработки (development)
const build = gulp.series(
  clean,
  gulp.parallel(html, css, js, images, fonts, svg, txt)
);

// Сборка для продакшена (production)
const buildProd = gulp.series(
  clean,
  gulp.parallel(htmlBuild, cssBuild, jsBuild, imagesBuild, fonts, svg, txt)
);

const watch = gulp.parallel(build, watchFiles, serve);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.svg = svg;
exports.txt = txt;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.buildProd = buildProd;
exports.watch = watch;
exports.default = watch;
