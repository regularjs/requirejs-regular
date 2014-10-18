
define('rgl',['text', 'parser'], function (text, parser) {

    if(!text.get && typeof nodeRequire !== "undefined" && typeof process !== 'undefined'){
        text.get = function (url, callback, errback) {
            var fs = nodeRequire("fs");
            var file = fs.readFileSync(url, 'utf8');
            //Remove BOM (Byte Mark Order) from utf8 files if it is there.
            if (file.indexOf('\uFEFF') === 0) {
                file = file.substring(1);
            }
            callback(file);
        }
    }

    if(!text.get) text.get = function(){}

    var tpl = function(str, data){
        return str.replace(/\{\{(\w+)\}\}/g, function(all, name){
            return data[name] || ""
        })
    }

    var buildMap = {};
    var template = 'define("{{pn}}!{{mn}}", function(){ return {{ast}} });\n';


    function load(name, req, onLoad, config){
        // load text1 files with text1 plugin
        text.load(name, req, function(data,r){
            onLoad(data);
            buildMap[name] = data;
        }, config);
    }


    function write(pn, mn, writeModule){
        if(buildMap[mn]){
            writeModule(
                tpl(template,{
                    pn: pn,
                    mn: mn,
                    ast: parser.parse(buildMap[mn])
                })
            )
        }
    }
    return {
        load : load,
        write : write
    };

});
