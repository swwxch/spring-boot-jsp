﻿$(function(){
	//当屏幕分辨率为1280及以上左侧菜单显示，1024及以下，左侧菜单隐藏，点击展示
	if($(window).width()>1200){
		$(".sidebar").css("display","block");
		$(".mini-menu").css("display","none");
		$(".content").css("margin-left","240px");
	}
	else{
		$(".sidebar").css("display","none");
		$(".content").css("margin-left","0");
		$(".mini-menu").css("display","block");
	}	
	//页面加载时自动设定内容区域高度，防止出现滚动条
	$(".warp-content").css("height",$(window).height()-80);
	$(".sidebar").css("height",$(window).height()-80);//等高
	$(".content").css("height",$(window).height()-80);
	var bodywidth = ($(document).width() - 560)/2;
	var bodyheight = ($(document).height() - 550)/2;
	$(".frame-position-c").css("left",bodywidth)
	                        .css("top",bodyheight);
	//左侧tab-content 高度设置
	var tabheight = $(window).height()- 214;
	$(".tab-content").css("height",tabheight-2);
	//右侧index高度设置
	$("#mainPageDiv").css("height",$(window).height()-180);
	//底部版权copyright始终底部对齐
	$(".copyright").css("width",$(".content").width()-5);
});
$(window).resize(function(){
	//当屏幕分辨率为1280及以上左侧菜单显示，1024及以下，左侧菜单隐藏，点击展示
	if($(window).width()>1200){
		$(".sidebar").css("display","block");
		$(".mini-menu").css("display","none");
		$(".content").css("margin-left","240px");
	}
	else{
		$(".sidebar").css("display","none");
		$(".content").css("margin-left","0");
		$(".mini-menu").css("display","block");
	}
  	//页面窗口改变时自动设定内容区域高度
	$(".warp-content").css("height",$(window).height()-80);
	$(".sidebar").css("height",$(window).height()-80);//等高	
	$(".panel-body-noborder").css("width",$("#content-body").width());
	$(".content").css("height",$(window).height()-80);
	$(".easyui-tabs").css("height",$(window).height()-178);	
	$(".js-iframe").css("height",$(window).height()-198);
	$(".tabs-wrap").css("width","100%");
    //窗口宽度大于1275时，强制显示左侧菜单
	if($(".sidebar").css("display") == "none" && $(window).width()>1275){
                $(".sidebar").fadeIn();
                $(".mini-menu").fadeOut();
            }
	//webchat聊天窗口始终显示在中间
	var bodywidth = ($(document).width() - 560)/2;
	var bodyheight = ($(document).height() - 550)/2;
	$(".frame-position-c").css("left",bodywidth)
	                        .css("top",bodyheight);
	//左侧tab-content 高度设置
	var tabheight = $(window).height()- 214;
	$(".tab-content").css("height",tabheight-2);
	//右侧index高度设置
	$("#mainPageDiv").css("height",$(window).height()-180);
	//底部版权copyright始终底部对齐
	$(".copyright").css("width",$(".content").width()-5);
	
});
$(function(){
	//如果li的class包含disabled，则此时禁用，点击时返回FALSE
	$(".nav>li").click(function(){
		if($(this).hasClass("disabled")){
			return false;
		}
	});
	//tooltip
	try {
		$(".table-fixed-layout td:not(td:has(input[type='checkbox'])):not(td:has(i)):not(td:has(a))").each(function(){
			var _td = $(this);
			if(_td.text().trim()!=""){
//				_td.tooltip({
//			        position: 'right',
//			        trackMouse : true,
//			        content: function(){
//			            var cc = $(this).text();
//			            return cc;
//			        }
//			    });
				$(this).attr("title",$(this).text().trim());
			}
		});
	} catch (e) {
		// TODO: handle exception
	}
	
	
	
	
	
	//统一添加必填项样式*
	$("input[required],select[required],textarea[required]").each(function(){
		var prevValue = $(this).prev(".field-title").html();
		if($(this).attr("type")=="radio"||$(this).attr("type")=="checkbox"){
			var thisID = $(this).attr("id");
			prevValue = $("label.field-title[for="+thisID+"]").html();
			$("label.field-title[for="+thisID+"]").html("<span style='color:red;'>*</span>"+prevValue);
		}
		if($(this).parent().attr("class")=="haveparent"){
			var _prevValue = $(this).parent().prev(".field-title").html();
			$(this).parent().prev(".field-title").html("<span style='color:red;'>*</span>"+_prevValue);
		    $(this).css("backgroundColor","#FFFFBB");
		}
		else{$(this).prev(".field-title").html("<span style='color:red;'>*</span>"+prevValue);
		$(this).css("backgroundColor","#FFFFBB");}
	});
});