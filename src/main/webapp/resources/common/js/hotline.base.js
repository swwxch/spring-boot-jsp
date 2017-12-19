
/*
 * HotlineUIBase
 */
function HotlineUIBase()
{
	
}
HotlineUIBase.prototype={
		/*
		 * 主界面Tab组件ID
		 */
		MainTabsId:"maintabs",
		
		
		/**
		 * 获取当前最顶层窗口
		 */
		topWindow:function()
		{
			
			if (parent != null) {
				return  parent;
			} else {
				return  window;
			}
			
		},
		
/**
 * 添加一个新的Tab页， 
 * @param titile tab名称
 * @param url   调用url
 * @param isdiv 使用div方式
 * @return 返回生成的jquery对象
 */
addOneTab:function (title, url,isdiv){
	window.parent.$("#content-body").css("display","block");
	window.parent.$("#mainPageDiv").css("display","none");
	var mainTabs = window.parent.$('#'+this.MainTabsId);
	var href=url;
	if(href.indexOf("?")!=-1)
	{
		href=href+"&_x="+Math.random();
		
		
	}
	else
	{
		href=href+"?_x="+Math.random();
	}
	//alert(mainTabs);
	var resultTab=null;
	var parentTab=mainTabs.tabs("getSelected");
	if (mainTabs.tabs('exists', title)){//如果tab已经存在,则选中并刷新该tab    	
        mainTabs.tabs('select', title);
        resultTab=this.refreshTab({tabTitle:title,url:href});
	} else {
		
    	if (!isdiv){
	    	var content = '<iframe scrolling="auto" frameborder="0" class="js-iframe" src="'+""+'" style="width:100%;height:100%;"></iframe>';
	    	resultTab=mainTabs.tabs('add',{
		    	title:title,
		    	closable:true,
		    	content:content,
		    	parent:parentTab,
		    	id:"tabPanelId_"+Math.random()*100000000000,
		    	cache:false
		    	//iconCls:icon||'icon-default'
	    	});
	    	resultTab = mainTabs.tabs("getSelected");
	    	if(resultTab && resultTab.find('iframe').length > 0){
	    		var _refresh_ifram = resultTab.find('iframe')[0];
	    		var refresh_url = href?href:_refresh_ifram.src;
	    		//_refresh_ifram.src = refresh_url;
	    		_refresh_ifram.contentWindow.location.href=refresh_url;
	    		var mainTabsHeight=window.parent.$(".warp-content").height();
	    		 mainTabs.css("height",mainTabsHeight-98);
	     		window.parent.$(".js-iframe").height(mainTabsHeight-98-20);
	    		}
	    	
           
	    	
	    	
    	} else {
    		
    		resultTab=mainTabs.tabs('add',{
		    	title:title,
		    	closable:true,
		    	href:href,
		    	parent:parentTab,
		    	id:"tabPanelId_"+Math.random()*100000000000,
		    	cache:false
		    	//iconCls:icon||'icon-default'
	    	});
	    	
    	}
    	
    	
    	//alert(resultTab.html());
	}
	return resultTab;
},

/**    
 * 刷新tab
 * @cfg 
 *example: {tabTitle:'tabTitle',url:'refreshUrl'}
 *如果tabTitle为空，则默认刷新当前选中的tab
 *如果url为空，则默认以原来的url进行reload
 */
refreshTab:function (cfg){
	var mainTabs = window.parent.$('#'+this.MainTabsId);
	var refresh_tab = cfg.tabTitle?mainTabs.tabs('getTab',cfg.tabTitle):mainTabs.tabs('getSelected');
	if(refresh_tab && refresh_tab.find('iframe').length > 0){
	var _refresh_ifram = refresh_tab.find('iframe')[0];
	var refresh_url = cfg.url?cfg.url:_refresh_ifram.src;
	//_refresh_ifram.src = refresh_url;
	_refresh_ifram.contentWindow.location.href=refresh_url;
	
	}
	return refresh_tab;
},

/*
 * 获取打开该Tab页的父Tab
 * @return 返回父Tab页的jquery对象
 */
getParentTab:function ()
{
	//alert(getCurrentTab().panel('options'));
	
	var parentTab=this.getCurrentTab().panel('options').parent;
	//alert(parentTab);
	//alert(parentTab.html());
	return parentTab;
},

/*
 * 获取当前Tab页
 * @return 返回当前Tab页jquery对象
 */
getCurrentTab:function()
{
	var mainTabs = window.parent.$('#'+this.MainTabsId);
	//alert(mainTabs);
	var currentTab=mainTabs.tabs("getSelected");
	return currentTab;
},

/*
 * 获取当前Tab的索引值
 * @return 返回当前Tab索引值
 */
getCurrentTabIndex:function ()
{
	var mainTabs = window.parent.$('#'+this.MainTabsId);
	var currentTab=mainTabs.tabs("getSelected");
	return currentTab;
},

/*
 * 关闭当前Tab页
 */
closeCurrentTab:function ()
{
	var mainTabs = window.parent.$('#'+this.MainTabsId);
	var currentTab=mainTabs.tabs("getSelected");
	var index =mainTabs.tabs('getTabIndex',currentTab);
	mainTabs.tabs('close',index);
},

/*
 * 触发父Tab页中的函数
 * @param func  执行的函数字符串
 */
trigerParentTabFunc:function (func)
{
	this.getParentTabWindow().eval(func);
},

/*
 * 获取父Tab页中的Window对象
 * @return 返回父Tab页中window对象
 */
getParentTabWindow:function ()
{
	var result=null;
	if($(this.getParentTab()).find("iframe"))
	{
		result=$(this.getParentTab()).find("iframe")[0].contentWindow
	}
	return result;
},

/*
 * 获取当前Tab页中的Window对象
 * @return 返回父Tab页中window对象
 */
getCurrentTabWindow:function ()
{
	var result=null;
	if($(this.getCurrentTab()).find("iframe"))
	{
		result=$(this.getCurrentTab()).find("iframe")[0].contentWindow;
	}
	return result;
},


/*
 * 刷新父Tab内容
 * @param tab页对象
 */
refreshParentTab:function()
{
	//alert(this.getParentTab().find("iframe")[0].src);
	//var loc = this.getParentTabWindow().location;
	//alert(loc);
	this.getParentTabWindow().$("form").submit();
	//loc.replace(loc.href);
	/*var _refresh_ifram = this.getParentTab().find('iframe')[0];
	alert(_refresh_ifram);
	alert(_refresh_ifram.innerHTML);
	var refresh_url =_refresh_ifram.src+"&_xx="+Math.random();
	alert(refresh_url);*/
	//_refresh_ifram.src = refresh_url;
	//_refresh_ifram.contentWindow.location.href=refresh_url;
	//alert(this.getParentTabWindow().location);
	//this.getParentTabWindow().location.reload();
	
},

/*
 * 处理验证出错信息 填充到表单中errorField 属性元素中
 */
processFieldError:function(jsonobj)
{
	var errors=jsonobj.errors;
	//alert(errors.length);
	for(var i=0;i<errors.length;i++)
	{
		var field=errors[i].field;
		var msg=errors[i].msg;
		//alert(field+"--"+msg);
		$("[errorField"+"="+field+"]").html(msg);
	}
	// else
	//{
	//	var beginIndex=data.lastIndexOf("<body>");
	//	var endIndex=data.lastIndexOf("</body>");
	//	$("body").html(data.substr(beginIndex+6,endIndex-beginIndex-6));
	//} 
},

/*
 * 生成dialog调用相关页面
 */
/*showDialog:function(cfg){
	var dialogId="dialog"+Math.random()*1000000000000000000;
	//alert(dialogId);
	var divElement=document.createElement("div");
	divElement.id=dialogId;
	//alert(divElement.id);
	//alert(cfg.iframe);
	if(cfg.iframe&&cfg.iframe==true&&cfg.href&&cfg.href!="")
	{
		var content='<iframe scrolling="auto" frameborder="0"  src="'+cfg.href+'" style="width:100%;height:100%;"></iframe>';
		divElement.innerHTML=content;
		cfg.href="";
	}
	//alert(cfg.onClose);
	if(cfg.onClose)
	{
		cfg.tempOnClose=cfg.onClose;
	}
	cfg.onClose=function()
	{
		if(cfg.tempOnClose)
		{
			cfg.tempOnClose();
		}
		else
		{
		}
		$('#'+dialogId).dialog("destroy");
		$('#'+dialogId).remove();
	};
	document.body.appendChild(divElement);
	$('#'+dialogId).dialog(cfg);
},*/

showDialog:function(cfg){
	return window.art.dialog(cfg);
},

/*
 * 选择用户组件
 */
/*selectUser : function (userObjId){
	var dialogId = "selUserDialog" ;
	$("<div/>").attr({"id":dialogId}).appendTo($("body")).hide();
	
	//选择默认
	if(userObjId && $("#" + userObjId).val().Trim()){
		var ids = $("#" + userObjId).val().split(",");
		var names = $("#" + userObjId + "Name").val().split(",");
		var data = {};
		for(var i=0;i<ids.length;i++){
			data[ids[i]] = names[i];
		}
		$("#" + dialogId).data(data);
	}
	
	$('#'+dialogId).load( basePath + "/common/selectUser" ,function(){
		$("#clearBtn").click(function(){
        	$("#" + userObjId).val("");
     		$("#" + userObjId + "Name").val("");
     		dialog.close();
     		$('#'+dialogId).remove();			
		});
	});
	var dialog = uiBase.showDialog({
        title:"选择人员",
        width: "820px",
        padding: "0 10px",
        content:document.getElementById(dialogId),
        cancel:function(){
        	$('#'+dialogId).remove();
        },
        cancelVal:"返回",
        ok:function(){
        	var data = $("#" + dialogId).data();
    		var ids = "", names = "";
    		for ( var p in data) {
    			ids += (p + ",");
    			names += (data[p] + ",");
    		}
    		if (ids) {
    			$('#' + userObjId).val(ids.substring(0, ids.length - 1));
    			$('#' + userObjId + 'Name').val(names.substring(0, names.length - 1));
    		} else {
    			$('#' + userObjId ).val("");
    			$('#' + userObjId + 'Name').val("");
    		}
        	$('#'+dialogId).remove();
        },
        okVal:"确定",

        lock:true
    });	
},*/

/*
 * zxy 修改为使用最上层window弹出方式
 */
selectUser : function (userObjId ,isSingle,inteliOrg){
	var topWin=this.topWindow();
	
	var dialogId = "selUserDialog" ;
	if(topWin.$("#" + dialogId)) {
		topWin.$("#" + dialogId).remove();
	}
	topWin.$("<div/>").attr({"id":dialogId}).appendTo(topWin.$("body")).hide();
	
	//选择默认
	if(userObjId && $("#" + userObjId).val().Trim()){
		var ids = $("#" + userObjId).val().split(",");
		var names = $("#" + userObjId + "Name").val().split(",");
		var data = {};
		for(var i=0;i<ids.length;i++){
			data[ids[i]] = names[i];
		}
		topWin.$("#" + dialogId).data(data);
	}
	
	var selType = "mult";

	if(isSingle){
		selType = "single";
	}
		
	var url = basePath + "/common/selectUser/" +  selType+"?inteliOrg="+inteliOrg+"&_x="+Math.random();
	//alert(url);
	topWin.$('#'+dialogId).load(url ,function(){
		/*topWin.$("#clearBtn").click(function(){
        	$("#" + userObjId).val("");
     		$("#" + userObjId + "Name").val("");
     		dialog.close();
     		$('#'+dialogId).remove();			
		});*/
	});
	var dialog = art.dialog({
        title:"选择人员",
        width: "800px",
        height:"480px",
        padding: "0 10px",
        content:topWin.document.getElementById(dialogId),
        cancel:function(){
        	topWin.$('#'+dialogId).remove();
        },
        cancelVal:"返回",
        ok:function(){
        	var data = topWin.$("#" + dialogId).data();
    		var ids = "", names = "";
    		for ( var p in data) {
    			ids += (p + ",");
    			names += (data[p] + ",");
    		}
    		if (ids) {
    			$('#' + userObjId).val(ids.substring(0, ids.length - 1));
    			$('#' + userObjId + 'Name').val(names.substring(0, names.length - 1));
    		} else {
    			window.art.dialog({
    	            title: '消息提示',
    	            icon: 'warning',
    	            content: "请至少选择一个人员"
    			});
    			return false;
    			//$('#' + userObjId ).val("");
    			//$('#' + userObjId + 'Name').val("");
    		}
    		topWin.$('#'+dialogId).remove();
        },
        okVal:"确定",
        button: [
                 {
                     name: '清除',
                     callback: function () {
                    	$("#" + userObjId).val("");
                 		$("#" + userObjId + "Name").val("");
                 		topWin.$('#'+dialogId).remove();
                     }
                 }
             ],
        lock:false
    });	
},

/*
 * sunjiyun add 
 */
selectUserDept : function (userObjId ,isSingle,treecheckbox){
	var topWin=this.topWindow();
	
	var dialogId = "selUserDialog" ;
//	var deptDialogId = "selUserDeptDialog" ;
	
	if(topWin.$("#" + dialogId)) {
		topWin.$("#" + dialogId).remove();
	}
	
	/*if(topWin.$("#" + deptDialogId)) {
		topWin.$("#" + deptDialogId).remove();
	}*/
	
	
	topWin.$("<div/>").attr({"id":dialogId}).appendTo(topWin.$("body")).hide();
	
	//topWin.$("<div/>").attr({"id":deptDialogId}).appendTo(topWin.$("body")).hide();
	
	//选择默认
	if(userObjId && $("#" + userObjId).val().Trim()){
		var ids = $("#" + userObjId).val().split(",");
		var names = $("#" + userObjId + "Name").val().split(",");
		var data = {};
		for(var i=0;i<ids.length;i++){
			data[ids[i]] = names[i];
		}
		topWin.$("#" + dialogId).data(data);
	}
	
	var selType = "mult";

	if(isSingle){
		selType = "single";
	}
		
	url = basePath + "/common/selectUserDept?selType="+selType+"&treecheckbox=1";

	
	
	topWin.$('#'+dialogId).load(url ,function(){
		/*topWin.$("#clearBtn").click(function(){
        	$("#" + userObjId).val("");
     		$("#" + userObjId + "Name").val("");
     		dialog.close();
     		$('#'+dialogId).remove();			
		});*/
	});
	var dialog = art.dialog({
        title:"选择人员",
        width: "800px",
        height:"480px",
        padding: "0 10px",
        content:topWin.document.getElementById(dialogId),
        cancel:function(){
        	topWin.$('#'+dialogId).remove();
        },
        cancelVal:"返回",
        ok:function(){
        	var data = topWin.$("#" + dialogId).data();
//        	console.log(topWin.$.fn.zTree.getZTreeObj("treeOrg"));
        	var treeObj=topWin.$.fn.zTree.getZTreeObj("treeOrg");
        	nodes=treeObj.getCheckedNodes(true);
         	var v="";
			var names="";
			for(var i=0;i<nodes.length;i++){
         		var nodetmp = nodes[i];
         		if(!nodetmp.isParent){
         			if(!(i==(nodes.length-1))){
	         			v+=nodes[i].id + ",";
	        	 		names+=nodes[i].name + ",";
         			}else{
         				v+=nodes[i].id; 
	        	 		names+=nodes[i].name ;
         			}
         		}
          }
			//console.log( $(" #search_accepterdept"));
			console.log(v);
			
			 $("#search_accepterDept").val(v);
        	
        	
    		var ids = "", names = "";
    		for ( var p in data) {
    			ids += (p + ",");
    			names += (data[p] + ",");
    		}
    		if (ids) {
    			$('#' + userObjId).val(ids.substring(0, ids.length - 1));
    			$('#' + userObjId + 'Name').val(names.substring(0, names.length - 1));
    		} else {
    			window.art.dialog({
    	            title: '消息提示',
    	            icon: 'warning',
    	            content: "请至少选择一个人员"
    			});
    			return false;
    			//$('#' + userObjId ).val("");
    			//$('#' + userObjId + 'Name').val("");
    		}
    		topWin.$('#'+dialogId).remove();
        },
        okVal:"确定",
        button: [
                 {
                     name: '清除',
                     callback: function () {
                    	$("#" + userObjId).val("");
                 		$("#" + userObjId + "Name").val("");
                 		topWin.$('#'+dialogId).remove();
                     }
                 }
             ],
        lock:false
    });	
},

/*
 * 选择组织
 */
/*selectOrg : function (selOrg){
	var dialogId = "selOrgDialog" ;
	$("<div style='width:600px;'/>").attr({"id":dialogId}).appendTo($("body")).hide();
	
	//选择默认
	if(selOrg && $("#" + selOrg).val().Trim()){
		var ids = $("#" + selOrg).val().split(",");
		var names = $("#" + selOrg + "Name").val().split(",");
		var data = {};
		for(var i=0;i<ids.length;i++){
			data[ids[i]] = names[i];
		}
		$("#" + dialogId).data(data);
	}
	
	$('#'+dialogId).load( basePath + "/common/selectOrg" ,function(){
	});
	uiBase.showDialog({
        title:"选择组织",
        width: "650px",
        padding: "0 10px",
        content:document.getElementById(dialogId),
        cancel:function(){
        	$('#'+dialogId).remove();
        },
        cancelVal:"返回",
        ok:function(){      	
        	var id=$("#orgId").val();
	 		var name=$("#orgName").val();
	 		var code=$("#orgCode").val();
	 		
	 		$("#" + selOrg).val(id);
	 		$("#" + selOrg + "Name").val(name);
        },
        okVal:"确定",        
        button: [
                 {
                     name: '清除',
                     callback: function () {
                    	$("#" + selOrg).val("");
                 		$("#" + selOrg + "Name").val("");
                 		$('#'+dialogId).remove();
                     }
                 }
             ],
        lock:true
    });	
}*/
/*
 * zxy 修改为使用最上层window弹出方式
 */
selectOrg : function (selOrg,inteliOrg){
	var topWin=this.topWindow();
	var dialogId = "selOrgDialog" ;
	if(topWin.$("#" + dialogId))
	{
		topWin.$("#" + dialogId).remove();
	}
	topWin.$("<div style='width:600px;'/>").attr({"id":dialogId}).appendTo(topWin.$("body")).hide();
	
	//选择默认
	if(selOrg && $("#" + selOrg).val().Trim()){
		var ids = $("#" + selOrg).val().split(",");
		var names = $("#" + selOrg + "Name").val().split(",");
		topWin.$("#" + dialogId).data("ids",ids);
		topWin.$("#" + dialogId).data("names",names);
	}
	
	topWin.$('#'+dialogId).load( basePath + "/common/selectOrg?inteliOrg="+inteliOrg+"&_x="+Math.random() ,function(){
	});
	topWin.uiBase.showDialog({
        title:"选择组织",
        width: "650px",
        height:"480px",
        padding: "0 10px",
        content:topWin.document.getElementById(dialogId),
        cancel:function(){
        	topWin.$('#'+dialogId).remove();
        },
        cancelVal:"返回",
        ok:function(){      	
        	var id=topWin.$("#orgId").val();
	 		var name=topWin.$("#orgName").val();
	 		var code=topWin.$("#orgCode").val();
	 		
	 		$("#" + selOrg).val(id);
	 		$("#" + selOrg + "Name").val(name);
	 		
	 		topWin.$('#'+dialogId).remove();
        },
        okVal:"确定",        
        button: [
                 {
                     name: '清除',
                     callback: function () {
                    	$("#" + selOrg).val("");
                 		$("#" + selOrg + "Name").val("");
                 		topWin.$('#'+dialogId).remove();
                     }
                 }
             ],
        lock:false
    });	
}

};
/*
 * 生成全局uiBase函数
 */
uiBase=new HotlineUIBase();



/*
 * ajax 调用统一处理
 */

//开始
$(document).ajaxStart(function(){
	//alert("ajaxStart");
});

$(document).ajaxSend(function(e,xhr,opt){
	   //alert("ajaxSend");
	});




$(document).ajaxSuccess(function(evt, request, settings){
	//alert("ajaxSuccess");
});

$(document).ajaxStop(function(){
	//alert("ajaxStop");
});

$(document).ajaxComplete(function(event, xhr, settings) {
	/* 绑定事件 */
	//alert("ajaxComplete");
	var contenttype = xhr.getResponseHeader('Content-Type');
	if ((contenttype && contenttype.indexOf('json') >= 0) && xhr.readyState == "4") {
		//var flag = String(settings.url).indexOf("loadMenu") == -1 ? false : true;
		//alert(xhr.responseText);
		var jsonObj=eval("("+xhr.responseText+")");
		/*
		 * 字段验证统一处理
		 */
		if(jsonObj.type=="fieldError")
		{
			uiBase.processFieldError(jsonObj);
		}
		if(jsonObj.type=="result"&&jsonObj.result=="1")
		{
			//art.dialog({title: '提示',icon: 'succeed',lock: true,content: '保存成功，2秒后会自动关闭……',time:2});
		}
		if(jsonObj.type=="versionException"&&jsonObj.result=="2")
		{
			art.dialog({title: '提示',icon:'warning',lock: true,content: jsonObj.msg});
		}
	}
});

$(document).ajaxError(function (event, XMLHttpRequest, ajaxOptions, thrownError) {
	 // thrownError 只有当异常发生时才会被传递 this;
	//alert("ajaxError");
});




/*
 * 全部替换
 */
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")),
				replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
};

/*
 * 全Trim
 */
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

/*
 * 左Trm
 */
String.prototype.LTrim = function() {
	return this.replace(/(^\s*)/g, "");
};

/*
 * 右Trm
 */
String.prototype.RTrim = function() {
	return this.replace(/(\s*$)/g, "");
};

addLog = function(type){
	//追加登入日志
	$.post(
			basePath+"/softphone/logSave/"+type+"?_x="+Math.random(),
	function(data){
			if(data.type=="result"&&data.result=="1")
			{
				//alert("登入成功");
			}
	}
				
	);

};

addCallLog = function(type,id){
//	ajax({async:false})
	var resultFlag;
	$.ajax({
		async:false,
		url:basePath+"/softphone/logCallSave/"+type+"/"+id+"?_x="+Math.random(),
		method:"post",
		dataType:"json",
		success:function (data){
			if(data.type=="result"&&data.result=="1")
			{
				//console.log("call log success");
				resultFlag =  data.data;
			}else{
				
				resultFlag =  false;
			}
	}
		
		
	});

	//alert(resultFlag);
	return resultFlag;
};

Date.prototype.format =function(format){
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	};
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format;
};

var art = uiBase.topWindow().$;

//数据保存标志 为true tab页可以直接关闭
var data_saved_for_tabPanel=false;