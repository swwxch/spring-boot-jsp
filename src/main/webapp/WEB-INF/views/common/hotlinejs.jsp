<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script type="text/javascript" src="${ctx}/resources/common/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/jquery.easyui.min.js"></script>
<!--日历-->
<script type="text/javascript" src="${ctx}/resources/common/fullcalendar/fullcalendar.js"></script>
<!--弹出框-->
<script type="text/javascript" src="${ctx}/resources/common/js/jquery.artDialog.js?skin=default"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/iframeTool.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/ztree/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/ztree/jquery.ztree.excheck-3.5.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/common.js"></script>
<!--时间选择-->
<script type="text/javascript" src="${ctx}/resources/common/js/my97date/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/jquery.icheck.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/placeholder.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/hotline.base.js"></script>
<!--快捷键功能-->
<script type="text/javascript" src="${ctx}/resources/common/js/shortcut.js"></script>
<!-- jquery validate -->
<script type="text/javascript" src="${ctx}/resources/common/js/jquery.validate.js"></script>
<script type="text/javascript" src="${ctx}/resources/common/js/messages_cn.js"></script>
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="${ctx}/resources/common/js/html5shiv.min.js"></script>
      <script src="${ctx}/resources/common/js/respond.min.js"></script>
    <![endif]-->
<script>
$(document).ready(function(){
	
	jQuery('input[placeholder]').placeholder();
	
	$("input[type='checkbox'][icheck],input[type='radio'][icheck]").iCheck({
	    checkboxClass: 'icheckbox_square-blue',
	    radioClass: 'iradio_square-blue'
	});
	
	$('#js-checkall').next(".iCheck-helper").click(function(){
		var this_ = $(this);
		if(this_.parent().hasClass("checked")){
			$(".table-fixed-layout input").iCheck('check');
		}else {
			$(".table-fixed-layout input").iCheck('uncheck');
		}	
	});	
	
});
</script>

<script type="text/javascript">
<!--
//待办方法加入
var addUserTodoMsgDialog ;
function getNewTodoOrder(){
	$.ajax({
		type: "POST",
		url: "${ctx}/business/accept/getNewTodoOrder",
		dataType:"json",
		async:false,
		success: function(data){ 
  
		    if(data[0]){ 
		    	var content_ = "<a url='${ctx}/business/accept/modify/"+ data[0].id  +"?search_pageTag=todolist&_x=${random}' onclick=\"addUserTodoMsg(this,'" + data[0].curTaskId +"')\" href='javascript:return false;' iframe=true style='color: red;cursor:pointer'>您有1条新的待办业务[" + data[0].orderCode + "]</a>";
	 
				addUserTodoMsgDialog = art.dialog.notice({
			   	    title: '消息提醒',
			   	    width: 300,// 必须指定一个像素宽度值或者百分比，否则浏览器窗口改变可能导致artDialog收缩
			   	    content: content_,
			   	    icon: 'warning'
				});
			}

			//setTimeout('getNewTodoOrder()', 1000 * 60 * 1);  
		} 
	});
}

//更新用户读取状态
function addUserTodoMsg(obj,orderId){
	
	$.post( 
			"${ctx}/business/accept/addUserTodoMsg/" + orderId,
			{},
			function(data){
				if(addUserTodoMsgDialog){
					addUserTodoMsgDialog.close();
				}
				addTabtx(obj);
			}
		);
}
//-->
</script>
