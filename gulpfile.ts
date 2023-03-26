/* eslint-disable @typescript-eslint/explicit-function-return-type */
import gulp from "gulp";
import ts from "gulp-typescript";

const transferRootPaths = () => {
  const rootPaths = ["src/public/**/*", "favicon.ico", "src/**/*.html"];

  return gulp
    .src(rootPaths, {
      base: "./",
      allowEmpty: true,
    })
    .pipe(gulp.dest("dist"));
};

const transferJSONs = () => {
  return gulp
    .src(["src/**/*.json"], {
      base: "./",
    })
    .pipe(gulp.dest("dist"));
};

const transferFiles = gulp.parallel(transferRootPaths, transferJSONs);

const compileTypescript = () => {
  const tsProject = ts.createProject("tsconfig.prod.json", {
    rootDir: "./",
    sourceMap: false,
    pretty: false,
    removeComments: false,
  });

  return tsProject
    .src()
    .pipe(tsProject())
    .on("error", () => {
      console.log("Despite TsProject errors found, proceeding with gulp");
    })
    .js.pipe(gulp.dest("dist"));
};

const defaultTask = gulp.series(transferFiles, compileTypescript);
export default defaultTask;
