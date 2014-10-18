require.config({
    // set paths since they are outside the baseUrl
    paths : {
        "rgl": '../../rgl',
        "text": '../../bower_components/requirejs-text/text',
        "regularjs": '../../bower_components/regularjs/dist/regular'
    }
});


// template is loaded and compiled dynamically
// the ".mustache" extension is inferred based on the settings above
// using `require` instead of define since this is our "entry-point"
require(['rgl!foo.html', 'text!foo.html', 'regularjs'], function(foo, haha , Regular){
    console.log(foo)
    console.log(haha)

    var Foo = Regular.extend({
      template: foo
    })
    var Haha = Regular.extend({
      template: haha
    })


    new Foo({
      data: {
        message: "rgl init Component "
      }
    }).$inject("#app")

    new Haha({
      data: {
        message: "text init Component "
      }
    }).$inject("#app")


});
