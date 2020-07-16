//
const { task, src, dest, watch, series, parallel } = require("gulp");
//
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const sourceMaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const cssMinify = require("gulp-minify-css");
const prefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const liveReload = require("gulp-livereload");
const babel = require("gulp-babel");
const pugEngin = require("gulp-pug");
const imagemin = require("gulp-imagemin");
const imageminPngquat = require("imagemin-pngquant");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const rollup = require("@rollup/stream");
const rollupBabel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

///////////////////////////////////
//// SRC - DEST
// SRC
const SRC_FOLDER = {
  style: ["./src/css/**/*.scss", "./src/css/**/*.css"],
  js: "./src/js/**/*.js",
  pug1: "./src/html/*.pug",
  pug2: "./src/html/**/*.pug",
  img: "./dist/img/**/*.{png, jpg, jpeg}",
  jsModule: "./src/js/app.js",
};
///////////////////////////////////
// DEST
const DEST_FOLDER = {
  style: "./dist/css",
  js: "./dist/js",
  pug: "./dist",
  img: "./dist/img/",
};
///////////////////////////////////
//// TASKS
// TASK - STYLE
const style = () => {
  //
  return src(SRC_FOLDER.style)
    .pipe(
      plumber(function (error) {
        console.log("Style Task Error");
        console.log(error);
        this.emit("end");
      })
    )
    .pipe(cssMinify())
    .pipe(sourceMaps.init())
    .pipe(concat("style.css"))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(sourceMaps.write())
    .pipe(prefixer())
    .pipe(dest(DEST_FOLDER.style))
    .pipe(liveReload());
};

// TASK - JS
const js = () => {
  return src(SRC_FOLDER.js)
    .pipe(
      plumber(function (error) {
        console.log("Javascript Task Error");
        console.log(error);
        this.emit("end");
      })
    )
    .pipe(sourceMaps.init())
    .pipe(
      babel({
        presets: ["es2015"],
      })
    )
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(sourceMaps.write())
    .pipe(dest(DEST_FOLDER.js))
    .pipe(liveReload());
};
// TASK - JS MODULE
const jsModule = () => {
  return rollup({
    input: SRC_FOLDER.jsModule,
    plugins: [commonjs(), nodeResolve()],
    output: { sourcemap: true },
    // cache: cache,
    format: "iife",
  })
    .on("bundle", function (bundle) {
      // Update cache data after every bundle is created
      cache = bundle;
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(sourceMaps.write())
    .pipe(dest(DEST_FOLDER.js))
    .pipe(liveReload());
};
// TASK PUG JS
const pug = () => {
  return src(SRC_FOLDER.pug1)
    .pipe(pugEngin({ pretty: true }))
    .pipe(dest(DEST_FOLDER.pug))
    .pipe(liveReload());
};
// TASK IMAGE COMP
const imageComp = () => {
  src(SRC_FOLDER.img)
    .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.svgo(), imageminPngquat(), imageminJpegRecompress()]))
    .pipe(dest(DEST_FOLDER.img));
};
///////////////////////////////////
//// WATCH TASKS
const watcher = () => {
  console.log("Watch Run");
  // SERVER AND LIVERELOAD
  require("./server.js");
  liveReload.listen();
  // WATCH STYLE CSS AND SASS
  watch(SRC_FOLDER.style, series(style));
  // WATCH JAVASCRIPT
  watch(SRC_FOLDER.js, series(js));
  // WATCH PUG
  watch(SRC_FOLDER.pug2, series(pug));
  // WATCH USE JAVASCRIPT MODULE
  // watch(SRC_FOLDER.js, series(jsModule));
};

///////////////////////////////////
// EXPORTS
// DEFAULT NORMAL
exports.default = parallel(pug, style, js, watcher);
exports.build = imageComp;
// DEFAULT USE JS MODULE
// exports.default = parallel(pug, style, jsModule, watcher);
