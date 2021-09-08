const path = require('path');
const gulp = require('gulp');
const process = require('process');
const fancylog = require("fancy-log");
const rimraf = require("rimraf");
const ftp = require('vinyl-ftp');
const fs = require('fs');
const os = require('os');
const { spawn } = require("child_process");
const dotenv = require('dotenv');
const rsync = require('./rsync')

function rmbuild() {
  var cwd = process.cwd();
  let pathBuild = path.join(cwd, 'build');
  if (fs.existsSync(pathBuild)) {
    fancylog(`deleting directory ${pathBuild}  ...`);
    rimraf.sync(pathBuild);
    fancylog(`deleting done`);
  }
}

function build_production(alldone) {
  gulp.series(
    function (cb) {
      rmbuild();
      fancylog('npx react-scripts build');

      let cmd = os.platform() == "win32" ? "npx.cmd" : "npx";
      const npx = spawn(cmd, ["react-scripts", "build"]);

      npx.stdout.on("data", data => {
        fancylog(data.toString());
      });

      npx.stderr.on("data", data => {
        fancylog.error(data.toString());
      });

      npx.on('error', (error) => {
        fancylog.error(error);
      });

      npx.on("close", code => {
        fancylog(`return code: ${code}`);
        cb();
      });
    },
    function(done) { done(); alldone(); }
  )();
};

function genGetKey() {
  let production = {};
  let productionLocal = {};
  if (fs.existsSync('.env.production')) {
    let b = fs.readFileSync('.env.production');
    production = dotenv.parse(b);
  }
  if (fs.existsSync('.env.production.local')) {
    let b = fs.readFileSync('.env.production.local');
    productionLocal = dotenv.parse(b);
  }

  let getKey = (key) => productionLocal[key] || production[key];
  return getKey;
}


function deploy_production_ftp(cb) {
  let getKey = genGetKey();

  let conn = ftp.create({
    host:      getKey("DEPLOY_URL"),
    user:      getKey("DEPLOY_LOGIN"),
    password:  getKey("DEPLOY_PASWORD"),
    parallel:  10,
    log: (data) => fancylog(data),
  });

  return gulp.series(
    () => gulp.src(
      path.join('.', 'build', '**'),
      {
        buffer: false,
        base: path.join('.', 'build')
      }
    ).pipe(conn.dest(getKey('DEPLOY_FOLDER'))),
    () => {
      return gulp.src(
        path.join('.', 'build', 'static', '**'),
        {
          buffer: false,
          base: path.join('.', 'build')
        }
      ).pipe(conn.dest(getKey('DEPLOY_BACKEND_FOLDER')));
    },
    (done) => { done(); cb() }
  )()
}


function deploy_production_rsync(cb) {
  let getKey = genGetKey();
  let srcPath = path.join('build', '**')
  let hostName = `${getKey('DEPLOY_SFTP_USER')}@${getKey('DEPLOY_URL')}`
  let dest = getKey("DEPLOY_SFTP_DIRECTORY")
  let dest_backend = getKey("DEPLOY_SFTP_BACKEND_DIRECTORY") + '/static'
  console.log('src', srcPath, 'host', hostName, 'dst', dest)

  let rsync_args = {
    // exclude: config.deploy.exclude_html, // Excludes files from deploy
    hostname: hostName,
    recursive: true,
    archive: true,
    silent: false,
    compress: true,
    clean: true,
    omit_dir_times: true,
    no_perms: true,
  }


  if (process.platform === 'win32') {
    let RSYNC_WIN_CMD = getKey('RSYNC_WIN_CMD');
    let RSYNC_WIN_CMD_SSH = '"' + getKey('RSYNC_WIN_CMD_SSH') + '"';
    let RSYNC_WIN_CWRSYNCHOME = getKey('RSYNC_WIN_CWRSYNCHOME');

    process.env.CWRSYNCHOME = RSYNC_WIN_CWRSYNCHOME;
    process.env.CWOLDPATH = process.env.PATH;
    process.env.PATH = process.env.CWRSYNCHOME + '\\bin;' + process.env.PATH;

    rsync_args.shell = RSYNC_WIN_CMD_SSH;
    rsync_args.rsync_cmd = RSYNC_WIN_CMD;
  }

  return gulp.series(
    () => gulp.src(srcPath)
      .pipe(rsync({ root: 'build', destination: dest, ...rsync_args })),
    () => gulp.src(path.join('build', 'static', 'media', '**'))
      .pipe(rsync({ root: path.join('build', 'static'), destination: dest_backend, ...rsync_args })),
    () => gulp.src(path.join('build', 'static', 'css', '**'))
      .pipe(rsync({ root: path.join('build', 'static'), destination: dest_backend, ...rsync_args })),
    () => gulp.src(path.join('build', 'static', 'js', '**'))
      .pipe(rsync({ root: path.join('build', 'static'), destination: dest_backend, ...rsync_args })),
    (done) => { done(); cb(); }
  )();
}


gulp.task('build', function(cb) { return build_production(cb); });
gulp.task('deploy', function(cb) { return deploy_production_ftp(cb);  });
gulp.task('sdeploy', function(cb) { return deploy_production_rsync(cb); });
gulp.task('bdeploy', function(cb) { return gulp.series("build", "deploy", (done) => { done(); cb(); })(); });
gulp.task('bsdeploy', function(cb) { return gulp.series("build", "sdeploy", (done) => { done(); cb(); })(); });
gulp.task('rmbuild', function(cb) { rmbuild(); cb() });
