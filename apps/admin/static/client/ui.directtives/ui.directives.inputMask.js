addScripts([
    "/../vendors/inputmask/min/inputmask/inputmask.min.js",
    "/../vendors/inputmask/min/inputmask/inputmask.date.extensions.min.js",
    "/../vendors/inputmask/min/inputmask/inputmask.numeric.extensions.min.js",
    "/../vendors/inputmask/min/inputmask/inputmask.phone.extensions.min.js",
    "/../vendors/inputmask/min/inputmask/inputmask.regex.extensions.min.js",
])
angularDefine(function(mdl){
    /**
 * <input-mask [type={text|number|date|time}] mask='' [ng-model=..] [ng-change=...] ></input-mask>
 */
    ___bootstrapUI___.directive("inputMask",function(){
        return {
            restrict:"ECA",
            template:"<input type='text'/>",
            replace:true,
            link:function(s,e,a){
                var im = new Inputmask("99-9999999");
                Inputmask.extendAliases({
                    'numeric': {
                    autoUnmask: true,
                    allowPlus: true,
                    allowMinus: true
                    }
                });
                Inputmask("numeric").mask($(e[0])[0]);
                //Inputmask("numeric").mask($(e[0])[0]);
                
            }
        }
    });
})