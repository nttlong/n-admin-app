!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})}function n(){}function t(e){if(!(this instanceof t))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],u(e,this)}function o(e,n){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,t._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null!==t){var o;try{o=t(e._value)}catch(f){return void i(n.promise,f)}r(n.promise,o)}else(1===e._state?r:i)(n.promise,e._value)})):e._deferreds.push(n)}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var o=n.then;if(n instanceof t)return e._state=3,e._value=n,void f(e);if("function"==typeof o)return void u(function(e,n){return function(){e.apply(n,arguments)}}(o,n),e)}e._state=1,e._value=n,f(e)}catch(r){i(e,r)}}function i(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&t._immediateFn(function(){e._handled||t._unhandledRejectionFn(e._value)});for(var n=0,r=e._deferreds.length;r>n;n++)o(e,e._deferreds[n]);e._deferreds=null}function u(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,i(n,e))})}catch(o){if(t)return;t=!0,i(n,o)}}var c=setTimeout;t.prototype["catch"]=function(e){return this.then(null,e)},t.prototype.then=function(e,t){var r=new this.constructor(n);return o(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(e,t,r)),r},t.prototype["finally"]=e,t.all=function(e){return new t(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},t.resolve=function(e){return e&&"object"==typeof e&&e.constructor===t?e:new t(function(n){n(e)})},t.reject=function(e){return new t(function(n,t){t(e)})},t.race=function(e){return new t(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},t._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){c(e,0)},t._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in l?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=e):l.Promise=t});
var _dialog_root_url;
function dialog_root_url(value) {
    _dialog_root_url = value;
}
function findScopeById(id){
    var eles=$(".ng-scope");
    var ret=undefined;
    for(var i=0;i<eles.length;i++){
        ret=angular.element(eles[i]).scope();
        if(ret.$id===id){
            break;
        }
        else {
            ret=undefined;
        }
    }
    return ret;
}
function dialog($scope) {
    if(angular.isNumber($scope)){
        $scope=findScopeById($scope);
    }
    function getScript(content) {
        if (content.indexOf("<body>") > -1) {
            var x = content.indexOf("<body>") + "<body>".length;
            var y = content.indexOf("</body>");
            content = content.substring(x, y);
        }
        var ret = [];
        var i = content.indexOf("<script>");
        while (i > -1) {
            var j = content.indexOf("</script>", i);
            var script = content.substring(i + "<script>".length, j);
            ret.push(script);
            content = content.substring(0, i) + content.substring(j + "</script>".length, content.length);
            i = content.indexOf("<script>");
        }
        return {
            scripts: ret,
            content: content
        };
    }
    function compile(scope, scripts, content,_params) {
        var subScope = scope.$new(true, scope);

        for (var i = 0; i < scripts.length; i++) {
            var fn = eval(scripts[i]);
            fn(subScope,_params);
        }
        var frm = $('<div><div class="modal fade" id="myModal" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +

            '<div class="modal-header">' +


            '<h4 class="modal-title"><img src=""/ style="height:40px"><span>...</span></h4>' +
            '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
            '</div>' +
            '<div class="modal-body">' +

            '</div>' +
            '</div></div>'
        );
        var $ele = $("<div>" + content + "</div>");

        var child = $($ele.children()[0])
        frm.attr("title",child.attr("title"))
        frm.attr("icon",child.attr("icon"))
        $ele.children().appendTo(frm.find(".modal-body")[0]);
        subScope.$element=frm

        subScope.$watch(function () {
            return subScope.$element.find(".modal-body").children().attr("title");
        }, function (val) {
            if(angular.isDefined(val)){
                subScope.$element.find(".modal-title span").html(val);
            }
        });
        subScope.$watch(function () {
            return subScope.$element.find(".modal-body").children().attr("icon");
        }, function (val) {
            if(angular.isDefined(val)){
                subScope.$element.find(".modal-title img").attr("src", val);
            }
            else{
                subScope.$element.find(".modal-title img").hide()
            }

        });
        if(!$scope.$root.$compile){
            throw("Please use '$compile' at controller then set '$scope.$root.$compile=$compile'")
        }
        $scope.$root.$compile(frm.contents())(subScope);
        subScope.$element = $(frm.children()[0]);
        subScope.$applyAsync();

        return subScope;
    }
    function ret(scope) {
        var me = this;
        me.url = function (_url) {
            if (_dialog_root_url) {
                me._url = _dialog_root_url + "/" + _url;
            }
            else {
                me._url = _url;
            }

            return me;
        }
        me.params=function(data){
            me._params=data;
            return me;
        }
        me.done = function (callback) {


            $.ajax({
                method: "GET",
                url: me._url,
                success: function (res) {
                    var ret = getScript(res);
                    var sScope = compile(scope, ret.scripts, ret.content,me._params);
                    if (callback) {
                        callback(sScope);
                    }
                    sScope.$element.appendTo("body");
                    function watch() {
                        if (!$.contains($("body")[0], sScope.$element[0])) {
                            sScope.$destroy();
                        }
                        else {
                            setTimeout(watch, 500);
                        }
                    }
                    watch();
                    sScope.$element.modal()
                        .on("hidden.bs.modal", function () {
                            sScope.$element.remove();

                        });

                    function watch() {
                        if (!$.contains($("body")[0], sScope.$element[0])) {

                            sScope.$destroy();
                        }
                        else {
                            setTimeout(watch, 500);
                        }
                    }
                    sScope.$doClose = function () {
                        sScope.$element.modal('hide')
                    }
                    watch();
                }
            })
        }
    }
    return new ret($scope);
}
function $url() {
    function ret() {
        var me = this;
        me.data = {};
        if (window.location.href.indexOf("#") > -1) {
            var ref = window.location.href.split('#')[1];
            var items = ref.split('&');
            for (var i = 0; i < items.length; i++) {
                me.data[items[i].split('=')[0]] = items[i].split('=')[1];
            }
        }
        me.param = function (key, value) {
            me.data[key] = value;
            return me;
        }
        me.clear = function () {
            me.data = {}
            return me;
        }
        me.url = function () {
            var ret = "";
            var keys = Object.keys(me.data);
            for (var i = 0; i < keys.length; i++) {
                ret += keys[i] + "=" + me.data[keys[i]] + "&"
            }
            return ret.substring(0, ret.length - 1);
        }
        me.apply = function () {
            window.location.href = "#" + decodeURIComponent( me.url());
        }

    }
    return new ret();
}
function history_navigator($scope) {
    var oldUrl;
    function historyMonitorStart(handler) {
        function run() {
            if (oldUrl != window.location.href) {

                if (historyChangeCallback.length > 0) {
                    if (window.location.href.indexOf('#') > -1) {
                        var data = {};
                        var url = window.location.href.split('#')[1];
                        var items = url.split('&');
                        var ret = {};
                        for (var i = 0; i < items.length; i++) {
                            data[items[i].split('=')[0]] = decodeURI(window["unescape"](items[i].split('=')[1]));
                        }
                        for (var i = 0; i < historyChangeCallback.length; i++) {
                            historyChangeCallback[i](data);
                        }
                        var keys = Object.keys($scope.$history.events);
                        for (var i = 0; i < keys.length; i++) {
                            if (!$scope.$history.events[keys[i]].hasStartCall) {
                                var obj = {
                                    key: keys[i],
                                    data: data,
                                    done: function () {
                                        if ($scope.$history.events[obj.key])
                                            $scope.$history.events[obj.key].handler(obj.data);
                                    }
                                }
                                setTimeout(function () {
                                    obj.done();
                                }, 300);

                            }
                        }

                    }
                    else {
                        historyChangeCallback[historyChangeCallback.length - 1]({});
                    }
                }
                oldUrl = window.location.href;
            }
            setTimeout(run, 100);
        }
        run();
    }

    var historyChangeCallback = [];
    function applyHistory(scope) {

        scope.$history = {
            isStart: true,
            events: {},
            data: function () {
                if (window.location.href.indexOf('#') == -1)
                    return {};
                var url = window.location.href.split('#')[1];
                var items = url.split('&');
                var ret = {};
                for (var i = 0; i < items.length; i++) {
                    ret[items[i].split('=')[0]] = decodeURI(window["unescape"](items[i].split('=')[1]));
                }
                return ret;
            },
            change: function (callback) {
                var _data = scope.$history.data();
                callback(_data);
                scope.$$$$historyCallback = callback;
                historyChangeCallback.push(callback);

            },
            redirectTo: function (bm) {
                window.location.href = bm;
            },
            onChange: function (subScope, handler) {

                scope.$history.events["scope_" + subScope.$id] = {
                    handler: handler,
                    hasStartCall: true,
                    scope: subScope
                };
                subScope.$on("$destroy", function () {
                    delete scope.$history.events["scope_" + subScope.$id];
                });
                if (scope.$history.events["scope_" + subScope.$id].hasStartCall) {
                    handler(scope.$history.data());
                    scope.$history.events["scope_" + subScope.$id].hasStartCall = false;
                }

            }
        };
        function URLObject(obj) {
            obj.$url = this;
            var me = this;
            me.data = obj.$history.data();
            me.clear = function () {
                me.data = {};
                return me;
            };
            me.item = function (key, value) {
                if (!me.data) {
                    me.data = {};
                }
                me.data[key] = value;
                return me;
            };
            me.done = function () {
                var keys = Object.keys(me.data);
                var retUrl = "";
                for (var i = 0; i < keys.length; i++) {
                    retUrl += keys[i] + "=" + window["escape"](encodeURI(me.data[keys[i]])) + "&";
                }
                retUrl = window.location.href.split('#')[0] + '#' + retUrl.substring(0, retUrl.length - 1);
                return retUrl;
            };
            var x = 1;
        }
        new URLObject(scope);
        historyMonitorStart(historyChangeCallback);
    }
    return new applyHistory($scope);
}

function ng_app(modulelName,controllerName,injection, fn,ngStartSymbol,ngEndSymbol) {
    injection.push("imageupload","q-ui");
    var app = angular.module(modulelName, injection, function ($interpolateProvider) {
        if(ngStartSymbol){
            $interpolateProvider.startSymbol(ngStartSymbol);
            $interpolateProvider.endSymbol(ngStartSymbol);
        }
        
    });
    var controller = app.controller(controllerName, ["$compile", "$scope", function ($compile, $scope) {
        $scope.$root.$compile = $compile;
        $scope.$root.$dialog =dialog;
        history_navigator($scope.$root);
        fn($scope);
        
          
        $scope.$applyAsync();
    }]);
}
var _appDirectiveSetRootUrl;
function appDirectiveSetRootUrl(url) {
    _appDirectiveSetRootUrl = url;
}
var mdl = angular.module("q-ui", []);
mdl.service("$dialog",["$compile",function($compile){
    function getScope(id) {
        var elem;
        $('.ng-scope').each(function(){
            var s = angular.element(this).scope(),
                sid = s.$id;

            if(sid == id) {
                elem = this;
                return false; // stop looking at the rest
            }
        });
        return elem;
    }
    return function(scope){
        scope.$root.$compile=$compile
        scope.$root.$dialog=function(id){
            if(!id){
                return $dialog(scope.$root)
            }
            else {
                var ele=getScope(id)
                subScope=angular.element(ele).scope()
                return dialog(subScope)
            }

        }
    }
}])
// candidate portal directive ui
mdl.directive("qTemplate", ["$compile", function ($compile) {

    function loadUrl(url, handler) {
        var $mask = $("<div class='mask'></div>");
        $mask.appendTo("body");
        $.ajax({
            url: _appDirectiveSetRootUrl? _appDirectiveSetRootUrl + "/" + url:url,
            method: "get",
            success: function (res) {
                $mask.remove();
                handler(undefined, { url: url, res: res });
            },
            error: function (err) {
                $mask.remove();
                handler(err);
            }
        })
    }
    function getScript(res) {
        var content = res.res;
        if (content.indexOf("<body>") > -1) {
            var x = content.indexOf("<body>") + "<body>".length;
            var y = content.indexOf("</body>",x);
            content = content.substring(x, y);
        }
        var ret = [];
        var i = content.indexOf("<script>");
        while (i > -1) {
            var j = content.indexOf("</script>", i);
            var script = content.substring(i + "<script>".length, j);
            ret.push(script);
            content = content.substring(0, i) + content.substring(j + "</script>".length, content.length);
            i = content.indexOf("<script>");
        }
        return {
            scripts: ret,
            content: content,
            url:res.url
        };
    }
    function compile(scope, scripts, content,url) {
        
        var subScope = scope.$new(true, scope);
        
        var $ele = $("<div>" + content + "</div>");
        subScope.$element = $ele.children();
        $compile($ele.contents())(subScope);
        subScope.$applyAsync();

        return {
            scope:subScope,
            run:function(){
                if (scripts && (scripts.length > 0)) {
                    for (var i = 0; i < scripts.length; i++) {
                        try {
                        
                            var fn = Function("var ret=" + scripts[i] + ";return ret")();
                            fn(subScope);
                        }
                        catch (ex) {
                            throw ({
                                error: ex,
                                url: url
                            })
                            console.log(scripts[i])
                        }
                    }
                }
            }

        } 
    }
    return {
        restrict: "ACE",
        link: function (scope, ele, attr) {
            attr.$observe("url", function (value) {
                loadUrl(value, function (err, content) {
                    var ret = getScript(content);
                    var retObj = compile(scope, ret.scripts, ret.content,ret.url);
                    ele.empty();
                    retObj.scope.$element.appendTo(ele[0]);
                    function watch() {
                        if (!$.contains($("body")[0], retObj.scope.$element[0])) {
                            retObj.scope.$destroy();
                        }
                        else {
                            if(retObj.run){
                                setTimeout(function(){
               retObj.run();
                                    retObj.run=undefined;
                                },50);
                                
                            }
                            setTimeout(watch, 500);
                        }
                    }
                    watch();
                })
            })
        }
    }
}]);
//angular.module('imageupload', [])
mdl.directive('image', function($q) {
        'use strict'

        var URL = window.URL || window.webkitURL;

        var getResizeArea = function () {
            var resizeAreaId = 'fileupload-resize-area';

            var resizeArea = document.getElementById(resizeAreaId);

            if (!resizeArea) {
                resizeArea = document.createElement('canvas');
                resizeArea.id = resizeAreaId;
                resizeArea.style.visibility = 'hidden';
                document.body.appendChild(resizeArea);
            }

            return resizeArea;
        }

        var resizeImage = function (origImage, options) {
            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;
            var quality = options.resizeQuality || 0.7;
            var type = options.resizeType || 'image/jpg';

            var canvas = getResizeArea();

            var height = origImage.height;
            var width = origImage.width;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            //draw image on canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(origImage, 0, 0, width, height);

            // get the data from canvas as 70% jpg (or specified type).
            return canvas.toDataURL(type, quality);
        };

        var createImage = function(url, callback) {
            var image = new Image();
            image.onload = function() {
                callback(image);
            };
            image.src = url;
        };

        var fileToDataURL = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };


        return {
            restrict: 'A',
            scope: {
                image: '=',
                resizeMaxHeight: '@?',
                resizeMaxWidth: '@?',
                resizeQuality: '@?',
                resizeType: '@?',
            },
            template:"<input type='file'/>",
            link: function postLink(scope, element, attrs, ctrl) {

                var doResizing = function(imageResult, callback) {
                    createImage(imageResult.url, function(image) {
                        var dataURL = resizeImage(image, scope);
                        imageResult.resized = {
                            dataURL: dataURL,
                            type: dataURL.match(/:(.+\/.+);/)[1],
                        };
                        callback(imageResult);
                    });
                };

                var applyScope = function(imageResult) {
                    scope.$apply(function() {
                        //console.log(imageResult);
                        if(attrs.multiple)
                            scope.image.push(imageResult);
                        else
                            scope.image = imageResult; 
                    });
                };


                element.bind('change', function (evt) {
                    //when multiple always return an array of images
                    if(attrs.multiple)
                        scope.image = [];

                    var files = evt.target.files;
                    for(var i = 0; i < files.length; i++) {
                        //create a result object for each file in files
                        var imageResult = {
                            file: files[i],
                            url: URL.createObjectURL(files[i])
                        };

                        fileToDataURL(files[i]).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        if(scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                            doResizing(imageResult, function(imageResult) {
                                applyScope(imageResult);
                            });
                        }
                        else { //no resizing
                            applyScope(imageResult);
                        }
                    }
                });
            }
        };
    });
mdl.service("$ajax",[function(){
    var instance={
        onBeforeCall:undefined,
        onAfterCall:undefined
    }
    function executor(owner,id){
        this.owner=owner;
        this._id=id;
    }
    executor.prototype.__exec=function(callback,_id,_data){
        var me=this;
        var sender=undefined;
        if(instance.onBeforeCall){
            sender=instance.onBeforeCall();
        }
        var callId=_id;
        var callData=_data;
        if(!_id){
            callId=me._id;
        }
        if(!_data){
            callData=me._data;
        }
        $.ajax({
            url:me.owner.url,
            method:"POST",
            headers:{"AJAX-POST":callId},
            data:JSON.stringify(callData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:function(res){
                if(instance.onAfterCall){
                    instance.onAfterCall(me,sender);
                }
                if(callback){
                    callback(undefined,res);
                }
            },
            error:function(ex){
                if(instance.onAfterCall){
                    instance.onAfterCall(me,sender);
                }
                if(callback){
                    callback(ex,undefined);
                }
            }

        });
    }
    executor.prototype.with=function(data){
        this._data=data;
        return this;
        
    }
    executor.prototype.set=function(data){
        var keys=Object.keys(data);
        if(!this._data){
            this._data=data;
        }
        for(var i=0;i<keys.length;i++){
            var key=keys[i];
            var val=data[key];
            this._data[key]=val;
        }
        return this;
    }
    executor.prototype.done=function(callback){
        var me=this;
        if(!callback){
            return new Promise(function(resolve,reject){
                me.__exec(function(e,r){
                    if(e){
                        reject(e);
                    }
                    else {
                        resolve(r);
                    }
                });
            });
        } else {
            return me.__exec(callback);
        }
    }
    function Caller(url){
        this.url=url;
    }
   
    
    Caller.prototype.call=function(id,data,callback){
        var ret= new executor(this,id);
        if(typeof data=="function"){
            callback=data;
            data=undefined;
        }
        if(data){
            ret.with(data);
        }
        if(callback){
            return ret.__exec(callback);
        }
        return ret;
    }
    Caller.prototype.callAll=function(){
        var promises=[];
        var _executor=new executor(this);
        var args=arguments;
        for(var i=0;i<args.length;i++){
            promises.push(new Promise(function(resole,reject){
                var arg=args[i];
                _executor.__exec(function(e,r){
                    if(e){
                        reject(e);
                    }
                    else {
                        if(arg.done){
                            arg.done(r);
                            resole(r);
                        }
                    }
                    
                },arg.id,arg.data);
            }));
        }
        return Promise.all(promises);
    }
    return {
        setOnBeforeCall:function(cb){
            instance.onAfterCall=cb;
        },
        setOnAfterCall:function(cb){
            instance.onAfterCall=cb;
        },
        with:function(url){
            return new Caller(url);
        }

    }
}])
mdl.directive("ajax",["$ajax","$parse",function($ajax,$parse){
    return {
        restrict:"ECA",
        transclude:true,
        replace:true,
        priority:1,
        scope:false,
        template:"<ajax-caller ng-transclude></ajax-caller>",
        link:function(s,e,a){
            e.attr("s-id",angular.element(e[0]).scope().$id);
            if(a.ws){
                $parse(a.ws).assign(s,$ajax.with(a.url));
            }
            else {
                $parse("$ws").assign(s,$ajax.with(a.url));
            }
        }
    }
}]);
/**
 * <call data-id="ajax function name" [data-params="param variable"] [data-callback="callback function name"] [data-function="function name"/>
 */
mdl.directive("call",["$parse",function($parse){
    return {
        restrict:"ECA",
        priority:2,
        scope:false,
        link:function(s,e,a){
         
            s.$watch(e.parent().attr("ws")||"$ws",function(o,v){
                var scope=findScopeById(e.parent().attr("s-id")*1);
                var ws=undefined;
                function exec(){
                    
                        var data=scope.$eval(a.params);
                        ws.call(a.id,data,function(e,r){
                            if(e){
                                throw(e);
                                return;
                            }
                            if(a.callback){
                                var fn=scope.$eval(a.callback);
                                if(angular.isFunction(fn)){
                                    fn(r);
                                }
                            }
                            if(a.ngModel){
                                $parse(a.ngModel).assign(scope,r);
                                scope.$applyAsync();
                            }
                        });
                }
                if(angular.isDefined(v)){
                    ws=v;
                    if(a.id && (!a.function)){
                        exec();

                    }
                    else {
                        $parse(a.function).assign(scope,exec);
                    }
                }
            })
            
        }
    }
}])
function makeUpForm(divRow,a){
   
                // divRow.hide();
               
                var rows=divRow.children();
                for(var x=0;x<rows.length;x++){
                    var eles=$(rows[x]).children();
                    var tmpDiv=$("<div></div>");

                    for(var i=0;i<eles.length;i++){
                        var div=$("<div class='form-element'></div>");
                        $(eles[i]).appendTo(div[0]);
                        div.appendTo(tmpDiv[0]);
                    }
                    $(rows[x]).addClass("row")
                    tmpDiv.contents().appendTo(rows[x]);

                }
                for(var x=0;x<rows.length;x++){
                    var eles=$(rows[x]).children();
                    var mdCols=(a.mdCols||"3,9").split(',');
                    var smCols=(a.smCols||"4,8").split(',');
                    var lgCols=(a.lgCols||"2,4,2,4").split(',');
                    var xsCols=(a.xsCols||"12").split(',');
                    var mdIndex=0;
                    var smIndex=0;
                    var lgIndex=0;
                    var xsIndex=0;

                    var mdTotal=0;
                    var smTotal=0;
                    var lgTotal=0;
                    var xsTotal=0;
                    for(var i=0;i<eles.length;i++){
                        if($($(eles[i]).children()[0]).attr("break")!== undefined){
                            console.log(lgTotal);
                            var _xs=12-xsTotal %12;
                            var _sm=12-smTotal %12;
                            var _md=12-mdTotal %12;
                            var _lg=12-lgTotal %12;
                            $(eles[i]).addClass("col-xs-"+_xs);
                            $(eles[i]).addClass("col-sm-"+_sm);
                            $(eles[i]).addClass("col-md-"+_md);
                            $(eles[i]).addClass("col-lg-"+_lg);
                            $(eles[i]).css("border","solid 4px red");
                            $(eles[i]).css("clear","right");
                            mdIndex=0;
                            smIndex=0;
                            lgIndex=0;
                            xsIndex=0;

                            mdTotal=0;
                            smTotal=0;
                            lgTotal=0;
                            xsTotal=0;
                        }
                        else {
                            var xsValue=xsCols[xsIndex]*1;
                            if($($(eles[i]).children()[0]).attr("xs-span")){
                                var xsSpanValue=$($(eles[i]).children()[0]).attr("xs-span")*1;
                                for(var j=1;j<xsSpanValue;j++){
                                    xsIndex++;
                                    if(xsIndex<xsCols.length){
                                        xsValue+=xsCols[xsIndex]*1;
                                    }
                                }
                            }
                            xsTotal+=xsValue;
                            $(eles[i]).addClass("col-xs-"+xsValue);
                            var smValue=smCols[mdIndex]*1;
                            if($($(eles[i]).children()[0]).attr("sm-span")){
                                var smSpanValue=$($(eles[i]).children()[0]).attr("sm-span")*1;
                                for(var j=1;j<smSpanValue;j++){
                                    smIndex++;
                                    if(smIndex<smCols.length){
                                        smValue+=smCols[smIndex]*1;
                                    }
                                }
                            }
                            smTotal+=smValue;
                            $(eles[i]).addClass("col-sm-"+smValue);
                            var mdValue=mdCols[mdIndex]*1;
                            if($($(eles[i]).children()[0]).attr("md-span")){
                                var mdSpanValue=$($(eles[i]).children()[0]).attr("md-span")*1;
                                for(var j=1;j<mdSpanValue;j++){
                                    mdIndex++;
                                    if(mdIndex<mdCols.length){
                                        mdValue+=mdCols[mdIndex]*1;
                                    }
                                }
                            }
                            mdTotal+=mdValue;
                            $(eles[i]).addClass("col-md-"+ mdValue);
                            var lgValue=lgCols[lgIndex]*1;
                            if($($(eles[i]).children()[0]).attr("lg-span")){
                                var lgSpanValue=$($(eles[i]).children()[0]).attr("lg-span")*1;
                                for(var j=1;j<lgSpanValue;j++){
                                    lgIndex++;
                                    if(lgIndex<lgCols.length){
                                        lgValue+=lgCols[lgIndex]*1;
                                    }
                                }
                            }
                            lgTotal+=lgValue;
                            $(eles[i]).addClass("col-lg-"+lgValue);
                            if(mdIndex+1<mdCols.length){
                                mdIndex++;
                            }
                            else {
                                mdIndex=0;
                            }
                            if(smIndex+1<smCols.length){
                                smIndex++;
                            }
                            else {
                                smIndex=0;
                            }
                            if(lgIndex+1<lgCols.length){
                                lgIndex++;
                            }
                            else {
                                lgIndex=0;
                            }
                            if(xsIndex+1<xsCols.length){
                                xsIndex++;
                            }
                            else {
                                xsIndex=0;
                            }
                        }

                    }
                }
                return divRow;
}

mdl.directive("formData",["$parse","$compile",function($parse,$compile){
    return {
        restrict:"ECA",
        transclude:true,
        priority:0,
        template:"<div ng-transclude></div>",
        replace:true,
        link:function(s,e,a){
         
          
            function watch(){
                if(e.attr("data-template")){
                    init(decodeURIComponent(e.attr("data-template")));
                }
                else {
                    setTimeout(watch,10);
                }    
            }
            function init(html){
              
                var subScope = s.$new();
                subScope.data=s.$eval(a.source);
                s.$watch(a.source,function(o,v){
                    console.log(v);
                    subScope._=o;
                    subScope.$applyAsync();

                })
                var divRow=$("<div></div>");
                divRow.html(html);
                $compile(divRow.contents())(subScope);
                divRow=makeUpForm(divRow,a);
                
                divRow.contents().appendTo(e[0])

                s.$apply();
            }
            watch();
        }
    }
}]);
mdl.directive("formTemplate",[function(){
    return {
        restrict:"ECA",
        compile: function(element, attributes){
            var originHtml=element.html();
            element.empty();
            return {
                pre: function(s, e, a, c, t){
                   e.parent().attr("data-template",encodeURIComponent(originHtml));
                    e.remove();
                    
                },
                post: function(s, e, a, c, t){
                   
                }
            }
        }
    }
}]);
mdl.directive("formLayout",["$parse","$compile",function($parse,$compile){
    return {
        restrict:"ECA",
        template:"<div ng-transclude></div>",
        transclude:true,
        replace:true,
        priority:0,
        
        link:function(s,e,a){
            
            function watch(){
                if(e.attr("data-template")){
                    init(decodeURIComponent(e.attr("data-template")));
                }
                else {
                    setTimeout(watch,10);
                }    
            }
            function init(html){
                var divRow=$("<div></div>");
                divRow.html(html);
                $compile(divRow.contents())(s);
                divRow=makeUpForm(divRow,a);
                
                divRow.contents().appendTo(e[0])

                s.$apply();
            }
            watch();
        }
    }
}]);
mdl.directive("select2",["$parse",function($parse){
    return {
        restrict:"ECA",
        template:"<select style=\"width:100%\"></select>",
        replace:true,
        priority:10000,
        link:function(s,e,a){
            var config={
                data:s.$eval(a.source)||[],
                placeholder: a.placeholder,
                allowClear: true
            }
            var isManulaChange=false;
            var instance=$(e[0]).select2(config).data("select2");
            instance.$element.on("select2:select",function(evt){
                isManulaChange=true;
                if(a.ngModel){
                    $parse(a.ngModel).assign(s,$(evt.currentTarget).val());
                }
                if(a.ngChange){
                    var fn=s.$eval(a.ngChange);
                    if(angular.isFunction(fn)){
                        fn(v);
                    }
                }
                s.$applyAsync();
                isManulaChange=false;
            })
            a.$observe("placeholder",function(v){
                config.placeholder=v;
                instance.$element.select2(config);
            });
            s.$watch(a.ngModel,function(v,o){
                if(isManulaChange) return;
                if(v!=o){
                    instance.val(v).trigger("change");
                    
                }
            });
            s.$watch(a.source,function(v,o){
                if(o!==v){
                    //$(e[0]).select2("destroy");
                        config.data=v;
                        instance.$element.select2(config);
                        //instance=$(e[0]).select2(config).data("select2");
                        //instance.setData(v);
                }
            })
            
        }
    }
}]);
/**
 * <summernode [ng-model=...] [ng-change=...] [component-id=...]></sumnmernote>
 */
mdl.directive("summernote",["$parse",function($parse){
    function SummernoteInstance(ele){this.ele=ele;} ;
    SummernoteInstance.prototype.insertText=function(txt){
        $(this.ele[0]).summernote('insertText', txt);
        return this;
    }
    SummernoteInstance.prototype.createRange=function(){
        $(this.ele[0]).summernote('createRange');
        return this;
    }
    SummernoteInstance.prototype.enable=function(val){
        if(!val) {
            $(this.ele).summernote('disable');
        }
        else {
            $(this.ele).summernote('enable');
        }
        return this;
    }
    SummernoteInstance.prototype.insertImage=function(url,fileName){
        $(this.ele).summernote('insertImage', url, filename);
        return this;
    }
    
    return {
        restrict:"ECA",
        template:"<div><textarea></textarea></div>",
        replace:true,
        link:function(s,ele,a){
            var e=ele.find("textarea");
            var isManualChange=false;
            var isChangeByBinding=false;
           var instance=new SummernoteInstance(e[0]);
           if(a.componentId){
             $parse(a.componentId).assign(s,instance);
           } 
           $(e[0]).summernote();
           $(e[0]).summernote("code",s.$eval(a.ngModel)||"");
           $(e[0]).on('summernote.focus', function() {
              isManualChange=true;
           });
           $(e[0]).on('summernote.blur', function() {
             isManualChange=false;
           });
           $(e[0]).on('summernote.change', function(we, contents, $editable) {
               if(isChangeByBinding) return;
               if(a.ngModel){
                   var txt=contents;
                   $parse(a.ngModel).assign(s,contents);
               }
               if(a.ngChange){
                   var fn=s.$eval(a.ngChange);
                   if(angular.isFunction(fn)){
                       fn(txt);
                   }

               }
               s.$applyAsync(function(){
                 
               });
               
           });
          
           s.$watch(a.ngModel,function(v,o){
               if(isManualChange) return;
               if(v!==o){
                isChangeByBinding=true;
                 $(e[0]).summernote("code",v||"");
                 isChangeByBinding=false;
               }
           })
           


        }
    }
}]);
/**
 * <input-mask [type={text|number|date|time}] mask='' [ng-model=..] [ng-change=...] ></input-mask>
 */
mdl.directive("inputMask",function(){
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