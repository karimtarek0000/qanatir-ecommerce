//
const { task, src, dest, watch, series, parallel } = require("gulp");
//
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const sourceMaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const cssMinify = require("gulp-clean-css");
const prefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const server = require("browser-sync").create();
const gulpClean = require("gulp-clean");
const babel = require("gulp-babel");
const pugEngin = require("gulp-pug");
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
  style: ["./src/css/*/*.scss", "./src/css/**/*.css"],
  styleWatch: ["./src/css/**/*.scss", "./src/css/**/*.css"],
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
//
const dir = {
  src: "./",
  dest: "./dist/",
};
///////////////////////////////////
// PRODUCTION
const DEST_FOLDER_PRO = {
  style: `${DEST_FOLDER.style}/*.css`,
  js: `${DEST_FOLDER.js}/*.js`,
};
///////////////////////////////////
//// TASKS
// TASK - STYLE - DEVELOPMENT
const styleDev = () => {
  //
  return src(SRC_FOLDER.style)
    .pipe(
      plumber(function (error) {
        console.log("Style Task Error");
        console.log(error);
        this.emit("end");
      })
    )
    .pipe(sourceMaps.init())
    .pipe(concat("style.css"))
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(dest(DEST_FOLDER.style));
};
// TASK - JS
const jsDev = () => {
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
    .pipe(concat("main.js"))
    .pipe(sourceMaps.write())
    .pipe(dest(DEST_FOLDER.js));
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
    .pipe(dest(DEST_FOLDER.js));
};

// TASK PUG JS
const pug = () => {
  return src(SRC_FOLDER.pug1)
    .pipe(pugEngin({ pretty: true }))
    .pipe(dest(DEST_FOLDER.pug));
};

// TASK - STYLE - PRODUCTION
const stylePro = () => {
  //
  return src(DEST_FOLDER_PRO.style)
    .pipe(prefixer())
    .pipe(cssMinify())
    .pipe(gulpClean())
    .pipe(rename("style.min.css"))
    .pipe(dest(DEST_FOLDER.style));
};

// TASK - JS - PRODUCTION
const jsPro = () => {
  return src(DEST_FOLDER_PRO.js)
    .pipe(uglify())
    .pipe(gulpClean())
    .pipe(rename("main.min.js"))
    .pipe(dest(DEST_FOLDER.js));
};

// RELOAD SERVER
async function reload() {
  server.reload();
}

///////////////////////////////////
//// WATCH TASKS
const watcher = async () => {
  // SERVER
  await server.init({
    server: {
      baseDir: dir.dest,
    },
    port: 5000,
  });
  console.log("Watch Run");
  // WATCH STYLE CSS AND SASS
  watch(SRC_FOLDER.styleWatch, parallel(styleDev, reload));
  // WATCH JAVASCRIPT
  watch(SRC_FOLDER.js, parallel(jsDev, reload));
  // WATCH PUG
  watch(SRC_FOLDER.pug2, parallel(pug, reload));
  // WATCH USE JAVASCRIPT MODULE
  // watch(SRC_FOLDER.js, parallel(jsModule, reload));
};
///////////////////////////////////
// EXPORTS
// DEFAULT NORMAL
exports.default = parallel(pug, styleDev, jsDev, watcher);
exports.build = series(stylePro, jsPro);
// DEFAULT USE JS MODULE
// exports.default = parallel(pug, styleDev, jsModule, watcher);
