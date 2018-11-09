angularDefine(function(mdl){
    debugger;
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
                debugger;
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
    
       
})