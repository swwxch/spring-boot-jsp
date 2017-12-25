<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/hotlinejsphead.jsp"%>
<!doctype html>
<html lang="zh">
<head>
    <%@ include file="/WEB-INF/views/common/hotlinemeta.jsp"%>
    <title>工作日历管理3</title>
    <%@ include file="/WEB-INF/views/common/hotlinecss.jsp"%>
    <link type="text/css" rel="stylesheet" href="${ctx}/resources/workcalendar/css/widget/DatePicker/datepicker.css">

</head>
<body>
<div class="col-md-12">
    <div class="row">
        <div class="grid simple">
            <div class="grid-title">
                <h4>工作日历管理</h4>
                <div class="tools">
                    <div style="float:right;">
                        <div style="float:left; margin-right:15px;">
                            <div style="float:left;width:25px; height:25px; background-color:#008000;">&nbsp;</div>
                            <span>绿色代表节假日</span>
                        </div>
                        <div style="float:left; margin-right:15px;">
                            <div style="float:left;width:25px; height:25px; background-color:#ff0000;">&nbsp;</div>
                            <span>红色代表补班</span>
                        </div>
                        <div style="float:left;">
                            <select id="slyear"></select>
                        </div>
                    </div>
                </div>
            </div>
            <form  action="${ctx}/workcalendar/add?_x=<%=System.currentTimeMillis() %>" method="get" id="serachForm">
                <input type="hidden" id="workyear" name="workyear">
                <div class="index-grid-body">

                    <div class="col-md-12 m-t-30">
                        <div class="information-form">
                            <div class="col-md-12 ie8correct" >
                                <div id="J_datePicker"></div>

                            </div>


                        </div>
                    </div>
                    <div class="col-md-12 footer-btn padding-2 m-t-20">

                        <input type="button" id="getCameraInfo"   class="btn  btn-primary" value="设置为节假日"/>

                        <input type="button"  class="btn  btn-primary" value="设置为补班" id="save" />

                        <input type="button" value="返回" class="btn btn-default" id="quxiao"/>

                    </div>
                </div>

            </form>

        </div>
    </div>
</div>
<%@ include file="/WEB-INF/views/common/hotlinejs.jsp"%>
<script	src="${ctx}/resources/monitor/synergy.monitor.js"	type="text/javascript"></script>
<script	src="${ctx}/resources/monitor/synergy.common.js"	type="text/javascript"></script>
<script	src="${ctx}/resources/workcalendar/js/kit.js"	type="text/javascript"></script>

<script	src="${ctx}/resources/workcalendar/js/array.js"	type="text/javascript"></script>
<script	src="${ctx}/resources/workcalendar/js/date.js"	type="text/javascript"></script>
<script	src="${ctx}/resources/workcalendar/js/dom.js"	type="text/javascript"></script>


<script	src="${ctx}/resources/workcalendar/js/selector.js"	type="text/javascript"></script>
<script	src="${ctx}/resources/workcalendar/js/widget/DatePicker/datepicker.js"	type="text/javascript"></script>

<script	src="${ctx}/resources/workcalendar/js/widget/DatePicker/datepicker-n-months.js"	type="text/javascript"></script>


<script type="text/javascript">

    var wca = ${wca};
    var wcb = ${wcb};
    var workyear = "${workyear}";
    /* $kit.$(function() {
     var ar1arry = [];
     var ar2arry = [];

     $.each(wca,function(i,o){
     ar1arry.push(new Date(Date.parse(o.dateTime.replace(/-/g,   "/"))));
     })
     $.each(wcb,function(i,o){
     ar2arry.push(new Date(Date.parse(o.dateTime.replace(/-/g,   "/"))));
     })
     window.picker = new $kit.ui.DatePicker.NMonths({
     //ar1:[new Date(Date.parse("2015-2-10".replace(/-/g,   "/"))),new Date(2015,1,11),new Date(2015,1,12)],
     //ar2:[new Date(2015,3,9),new Date(2015,3,10),new Date(2015,3,11)]
     ar1:ar1arry,
     ar2:ar2arry
     });
     picker.init();
     $kit.el('#J_datePicker').appendChild(picker.picker);
     picker.show();
     picker.ev({
     ev : 'change',
     fn : function(e) {
     //alert(picker.getValue());
     }
     });
     picker.fill();
     }) */



    $().ready(function() {
        Chrhc_Monitor= function(){
            this.options= {
                contentId : 'rightcontent',
                listGridId:"grid-body",
                basePath : '${ctx}/workcalendar/',
            };
        };
        Chrhc_Monitor.prototype = {
            save:function (type){

                /*$.ajax({
                 type: "POST",
                 url: this.options.basePath+"update" ,
                 data: $("#editForm").serialize(),
                 dataType:"json",
                 async:false,
                 success: function(data){
                 if(data.type=="result"&&data.result=="1")
                 {
                 uiBase.refreshParentTab();
                 //uiBase.trigerParentTabFunc('$("form").submit()');
                 uiBase.closeCurrentTab();
                 }
                 }
                 });*/
                var code = $('#code').val();
                if(code == "" || code == null){
                    Chrhc_dialog({title:'保存提示',icon: 'face-sad',content: '请先获取摄像机信息，2秒后会自动关闭……',time:2});
                    return;
                }
                var contoller =  new ChrhcHl.Contoller("monitor/vacamerainfo");
                contoller.setParameterFrom($("#editForm").serialize());
                var ret = contoller.execute("update");
                if(ret.type=="result"&&ret.result=="1")
                {
                    Chrhc_dialog({title:'保存提示',icon: 'succeed',content: '保存成功，2秒后会自动关闭……',time:2});

                    //uiBase.trigerParentTabFunc('$("form").submit()');

                    try{
                        uiBase.refreshParentTab();
                        uiBase.closeCurrentTab();
                    }catch(e){

                        uiBase.closeCurrentTab();
                    }
                }

            },
            getCameraInfo:function(type){

                var ar1arry = [];
                if(type == '0'){
                    ar1arry =	picker.getWorkDate();
                }else{
                    ar1arry =	picker.getHolidayDate();
                }

                var ar1arrya = [];
                $.each(ar1arry,function(i,o){
                    var formated = $kit.date.formatDate(o,  $kit.date.parseFormat(picker.config.dateFormat), picker.config.language);
                    ar1arrya.push(formated);
                })
                var contoller =  new ChrhcHl.Contoller("workcalendar");

                contoller.setParameter("ar1arry",ar1arrya);
                contoller.setParameter("workType",type);
                contoller.setParameter("workyear",$("#slyear").val());
                var ret = contoller.execute("saveworkcalendar");
                debugger;
                if(ret.code=="200")
                {

                    Chrhc_dialog({title:'保存提示',icon: 'succeed',content: '保存成功，2秒后会自动关闭……',time:2});
                    $("#workyear").val($("#slyear").val());
                    $("#serachForm").submit();
                }


            }


        };

        //设置下拉框的年份
        function setselectyear(){
            var sel=$("#slyear");

            var cyear;
            var value;
            if(value==null){
                var now=new Date();
                cyear=now.getFullYear();
                value=cyear;
            }else{
                cyear=value;
            }
            for(var i=0;i<=10;i++){
                /*  var op=new Option();
                 op.value=parseInt(cyear)-(5-i);
                 op.text=parseInt(cyear)-(5-i);
                 sel.add(op); */
                var yvalue = parseInt(cyear)-(5-i);
                var option = $("<option>").val(yvalue).text(yvalue);
                sel.append(option);
            }
            //sel.selectedIndex=5;
            if(workyear != null && workyear != 'null'){
                cyear = workyear;
            }
            sel.val(cyear);
        };
        function setworkcalendar(workyear){

            var ar1arry = [];
            var ar2arry = [];

            $.each(wca,function(i,o){
                ar1arry.push(new Date(Date.parse(o.dateTime.replace(/-/g,   "/"))));
            })
            $.each(wcb,function(i,o){
                ar2arry.push(new Date(Date.parse(o.dateTime.replace(/-/g,   "/"))));
            })
            window.picker = new $kit.ui.DatePicker.NMonths({
                //ar1:[new Date(Date.parse("2015-2-10".replace(/-/g,   "/"))),new Date(2015,1,11),new Date(2015,1,12)],
                //ar2:[new Date(2015,3,9),new Date(2015,3,10),new Date(2015,3,11)]
                ar1:ar1arry,
                ar2:ar2arry,
                date:workyear+':01:01'
            });
            picker.init();
            $kit.el('#J_datePicker').appendChild(picker.picker);
            picker.show();
            picker.ev({
                ev : 'change',
                fn : function(e) {
                    //alert(picker.getValue());
                }
            });
            picker.fill();
        }
        function init(){
            setselectyear();

            setworkcalendar(workyear);
        }

        init();

        var monitor = new Chrhc_Monitor();

        $("#save").click(function(){
            /*  if( $("#editForm").valid() ){
             monitor.save("add");
             } */
            monitor.getCameraInfo("1");

        });
        $("#getCameraInfo").click(function(){
            monitor.getCameraInfo("0");
        });
        $("#quxiao").on("click",function(){
            uiBase.closeCurrentTab();
        });
        $("#slyear").change(function(){
            var slworkyear = $(this);
            var workyeara = slworkyear.val();

            $("#workyear").val(workyeara);
            $("#serachForm").submit();
        });


    });



</script>
</body>
</html>