var requirejs = require('requirejs');

requirejs.optimize({
    //stubModules can be used to remove unneeded plugins after build
    stubModules : ['rgl'],
    mainConfigFile : 'scripts/main.js',
    baseUrl : 'scripts',
    name : 'main',
    optimize : 'none',
    out : 'scripts/main_built.js'
}, function(msg){
    console.log(msg)
});
