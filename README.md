#Requirejs Plugin for regularjs

A [requirejs](http://requirejs.org/)/AMD plugin for load [Regularjs](https://github.com/regularjs)'s template.


## Download

1  __bower__

```shell
bower install regularjs-regular --save
```



2 __use git__

```
git clone git@github.com:regularjs/requirejs-regular
```

3 __[directly download rgl.js]()__




## Config

```
require.config({
   ...
    paths : {
        "rgl": 'path/to/requirejs-regular/rgl',
        //...
    }
    ...
});
```

## Usage

```
require.config({
    paths : {
        "rgl": '../../bower_components/regularjs-regular/rgl',
        "regularjs": '../../bower_components/regularjs/dist/regular'
    }
});



require(['rgl!./foo.html', 'regularjs'], function( tpl, Regular){

    var Foo = Regular.extend({
      template: tpl
    })
  
    new Foo({}).$inject("#app")

});

```

where in `foo.html`

```html
<h2>{{message}}</h2>
```


## Optimizer

With [optimizer](http://requirejs.org/docs/optimization.html), after the compiling step. the Regularjs template will be preparsed to ast

__for Example __

the dependency  `rgl!foo.html` in example above

```html
<h2>{{message}}</h2>
```

will  be converted to ast like below

```javascript
define("rgl!foo.html", function(){ return [{"type":"element","tag":"h2","attrs":[],"children":[{"type":"expression","body":"_c_._sg_('message', _d_['message'])","constant":false,"setbody":"_c_._ss_('message',_p_,_d_, '=')"}]}] 
});
```


Optimizer Example [see Demo's build.js](https://github.com/regularjs/requirejs-regular/blob/master/demo/build.js)


## License

MITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
