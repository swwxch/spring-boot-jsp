var ChrhcHl = function(){
	version:'1.0.1';
};
/**
 * 把URL类型的编码转换为对象.例如： ChrhcHl.urlDecode("foo=1&bar=2");将会返回对象 {foo: "1", bar: "2"} 或者
 * ChrhcHl.urlDecode("foo=1&bar=2&bar=3&bar=4", false);将会返回 {foo: "1", bar: ["2","3", "4"]}.
 * 
 * @param {String}
 *            string
 * @param {Boolean}
 *            overwrite (可选)(默认是false).
 * @return {Object} 对象
 */
ChrhcHl.urlDecode = function (string, overwrite) {
    if (!string || !string.length) {
        return {};
    }
    var obj = {};
    var pairs = string.split('&');
    var pair, name, value;
    for (var i = 0, len = pairs.length; i < len; i++) {
        pair = pairs[i].split('=');
        name = decodeURIComponent(pair[0]);
        value = decodeURIComponent(pair[1]);
        if (overwrite !== true) {
            if (typeof obj[name] == "undefined") {
                obj[name] = value;
            } else if (typeof obj[name] == "string") {
                obj[name] = [obj[name]];
                obj[name].push(value);
            } else {
                obj[name].push(value);
            }
        } else {
            obj[name] = value;
        }
    }
    return obj;
};
/**
 * 把对象转换成URL的格式.例如 LEx.urlEncode({foo: 1, bar: 2});将会返回 "foo=1&bar=2".
 * 
 * @param {Object}
 *            o 需要转换的对象
 * @return {String} 转换成的URL字符串
 */
ChrhcHl.urlEncode = function(o) {
	if (!o) {
		return "";
	}
	var buf = [];
	for ( var key in o) {
		var ov = o[key], k = encodeURIComponent(key);
		var type = typeof ov;
		if (type == 'undefined') {
			buf.push(k, "=&");
		} else if (type != "function" && type != "object") {
			buf.push(k, "=", encodeURIComponent(ov), "&");
		} else if (ChrhcHl.isDate(ov)) {
			var s = ChrhcHl.encode(ov).replace(/"/g, '');
			buf.push(k, "=", s, "&");
		} else if (ChrhcHl.isArray(ov)) {
			if (ov.length) {
				for ( var i = 0, len = ov.length; i < len; i++) {
					buf
							.push(k, "=",
									encodeURIComponent(ov[i] === undefined ? ''
											: ov[i]), "&");
				}
			} else {
				buf.push(k, "=&");
			}
		}
	}
	buf.pop();
	return buf.join("");
};
/**
 * 如果传入的参数是数组，就返回true，否则返回false.
 * 
 * @param {Object}
 *            object 需要测试的对象
 * @return {Boolean}
 */
ChrhcHl.isArray = function(v) {
	return v && typeof v.length == 'number' && typeof v.splice == 'function';
};
/**
 * 如果传入的参数是日期类型，就返回true，否则返回false.
 * 
 * @param {Object}
 *            object 需要测试的对象
 * @return {Boolean}
 */
ChrhcHl.isDate = function(v) {
	return v && typeof v.getFullYear == 'function';
};

/**
 * 测试是否为数字，如果不是则返回默认值.
 * 
 * @param {Mixed}
 *            value 应为数字，如果不是也会有默认值
 * @param {Number}
 *            defaultValue 如果值不是数字，返回的默认值
 * @public
 * @return {Number} 数字
 */
ChrhcHl.num = function(v, defaultValue) {
	if (typeof v != 'number' || isNaN(v)) {
		return defaultValue;
	}
	return v;
};

/**
 * 获得web项目访问路径
 * 
 * @param {}
 *           
 * @return {} web项目访问路径
 */
ChrhcHl.WebPath = function() {
	// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/uimcardprj
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
};
ChrhcHl.Contoller = function (fqname, action, url) {
    this.fqname = fqname;
    this.action = action || "";
    this.url = url || basePath + "/";
    this.paramsObj = {};
    this.returns = null;
};
ChrhcHl.Contoller.prototype = {
    setParameter: function (name, value) {
        this.paramsObj[name] = value;
    },
    setParameterFrom: function (value) {
    	value = value.replace(/\+/g," ");  
    	var fromJson = ChrhcHl.urlDecode(value);
        $.extend(this.paramsObj,fromJson);
    },
    execute: function (action,type,async,callbackfuc) {
        if (async == null) {
            async = false;
        }
        if(type == null){
        	type = "POST";
        }
        this.action = action || this.action;
        var curUrl = this.url + this.fqname + "/" +this.action;      
        var that = this; 
        var postData = null;
        if (this.paramsObj != null) {
            postData = ChrhcHl.urlEncode(this.paramsObj);
        }
      //  alert(postData+"ddddd");
        var o = {
            type: type,
            async: async,
            url: curUrl,
            data:postData,
            //contentType: "application/json; charset=UTF-8",
           // dataType: "json",
            success: function (msg) {
                that.returns = msg;
                if(msg.error){
                    that.error=msg.error;             
                }
                if(!msg){
                    that.error='服务器未返回数据';              
                }
                if(async)
                	{
                	 callbackfuc(msg);
                	}
               
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            	
               
            },
          
        };
       // return;
        $.ajax(o);
        if(this.error){
            Chrhc_dialog({title:"系统提示",content:'出错了'+this.error,time:15});
        }
        return this.returns;
    }
};
//art对话框
Chrhc_dialog = function (o,fun) {
	this._dialogContent = null;
    if (o.url) {
    	var that = this;
        $.ajax({
            url: o.url,
            async: false,
            success: function (data) {
                o.content = data;
               
 				if(fun){
						o.init=function () { eval(fun+ '()'); };
 	 				}
                
 				 that._dialogContent = art.dialog(o);
                
            },
            cache: false
        });  
    } else {
    	var dialogct = art.dialog(o);
    	this._dialogContent = dialogct;
    }
    return this._dialogContent;
    
};

Chrhc_dialog.prototype = {
    openUrl: function (url, title, buttons, rowData) {
        $.ajax({
            url: url,
            success: function (data) {
                this.dialogContent = art.dialog({
                    title: title,
                    content: data,
                    button: buttons
                            
                });
            },
            cache: false
        });
    },
    getDialogContent: function () {
        return this._dialogContent;
    }
};

(function($){$.toJSON=function(o)
	{if(typeof(JSON)=='object'&&JSON.stringify)
	return JSON.stringify(o);var type=typeof(o);if(o===null)
	return"null";if(type=="undefined")
	return undefined;if(type=="number"||type=="boolean")
	return o+"";if(type=="string")
	return $.quoteString(o);if(type=='object')
	{if(typeof o.toJSON=="function")
	return $.toJSON(o.toJSON());if(o.constructor===Date)
	{var month=o.getUTCMonth()+1;if(month<10)month='0'+month;var day=o.getUTCDate();if(day<10)day='0'+day;var year=o.getUTCFullYear();var hours=o.getUTCHours();if(hours<10)hours='0'+hours;var minutes=o.getUTCMinutes();if(minutes<10)minutes='0'+minutes;var seconds=o.getUTCSeconds();if(seconds<10)seconds='0'+seconds;var milli=o.getUTCMilliseconds();if(milli<100)milli='0'+milli;if(milli<10)milli='0'+milli;return'"'+year+'-'+month+'-'+day+'T'+
	hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
	if(o.constructor===Array)
	{var ret=[];for(var i=0;i<o.length;i++)
	ret.push($.toJSON(o[i])||"null");return"["+ret.join(",")+"]";}
	var pairs=[];for(var k in o){var name;var type=typeof k;if(type=="number")
	name='"'+k+'"';else if(type=="string")
	name=$.quoteString(k);else
	continue;if(typeof o[k]=="function")
	continue;var val=$.toJSON(o[k]);pairs.push(name+":"+val);}
	return"{"+pairs.join(", ")+"}";}};$.evalJSON=function(src)
	{if(typeof(JSON)=='object'&&JSON.parse)
	return JSON.parse(src);return eval("("+src+")");};$.secureEvalJSON=function(src)
	{if(typeof(JSON)=='object'&&JSON.parse)
	return JSON.parse(src);var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,'@');filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered))
	return eval("("+src+")");else
	throw new SyntaxError("Error parsing JSON, source is not valid.");};$.quoteString=function(string)
	{if(string.match(_escapeable))
	{return'"'+string.replace(_escapeable,function(a)
	{var c=_meta[a];if(typeof c==='string')return c;c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
	return'"'+string+'"';};var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};})(jQuery);
	ChrhcHl.encode = $.toJSON;
	ChrhcHl.decode = $.evalJSON;