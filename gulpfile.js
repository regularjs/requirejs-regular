var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var spawn = require('child_process').spawn;
var pkg;


gulp.task('build', function(done) {
  webpack({
      entry: "./src/index.js",
      output: {
        filename: 'rgl.js',
        path: __dirname,
        library: "rgl",
        libraryTarget: 'umd'
      },
      resolve : {
        alias:{
          parser : '../bower_components/regularjs/dist/regular-parser.js',
          text: '../bower_components/requirejs-text/text.js'
        }
      }
  }, function(err, stats){
    if(stats.hasErrors() || err){
      throw stats.toJson().errors
    }else{
      console.log("done!")
    }
    done()
  })
});

gulp.task("default",["build"])

gulp.task("dev", function(){
  gulp.watch(['component.json', 'src/index.js'], ['build'])
  // var puer = spawn('puer', ["--no-reload"], {})
  // puer.stdout.on('data', function (data) {
  //   console.log(""+ data);
  // });
  // puer.stderr.on('data', function (data) {
  //   console.log('stderr: ' + data);
  // });

  // puer.on('close', function (code) {
  //   console.log('puer test compelete!');
  // });

})



