
require.config({
    paths : {
        "rgl": '../../rgl',
        "regularjs": '../../bower_components/regularjs/dist/regular'
    },
    rgl: {
      BEGIN: '{{',
      END: '}}'
    }

});


require(['rgl!foo.html', 'rgl!foo.html', 'regularjs'], function(foo, haha , Regular){

  Regular.config({
    END: '}}',
    BEGIN: '{{'
  })

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
