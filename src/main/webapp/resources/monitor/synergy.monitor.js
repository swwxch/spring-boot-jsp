var hotline = hotline || {};
hotline.util = hotline.util || {};
var playbackXmlDoc = null;
var lRecLocation=0;
function init(){

	try{
		console.log(cameraId);
		//设置单一窗口
		  var OCXobj = document.getElementById("PlayBackOCX");
		 
		  OCXobj.SetPlayWndOne();
		  
		  if((cameraId == "" || cameraId == null || cameraId == "null") && (cameraIndexCode == "" || cameraIndexCode == null || cameraIndexCode == "null")){
	        alert("无法得到cameraId或cameraIndexCode");
	        return;
	    }
		
	    if(cameraIndexCode == "" || cameraIndexCode == null || cameraIndexCode == "null"){
	    	
	    	getTreeDataAjax(cameraId, dealCamera);
	    }else{
	    	getTreeDataAjax(cameraIndexCode, dealCamera);
	    }
	    
	    SetlocalParam();
	    
	}catch (e) {
		
		 new Chrhc_dialog({
             title:"视频控件下载",
       
      
             content:'请点击【下载】按钮安装视频控件，安装完毕后重启IE浏览器再登录',
             ok:function(){
            	 $.fileDownload(path+"/resources/general/core/monitor/cmsocx.exe", {httpMethod : "POST"});
             },
             okVal:"下载",
             cancel:function(){
            	 
             },
             cancelVal:"返回",
             id: "dialog_agentocxdownload_monitor",
             lock:true
       
         }
		);
		 /*new Chrhc_dialog({
			resizable: true,
			modal: true,
			title:"控件下载",
			content:"<div><a style='color=blue;' href='"+path+"/resources/general/core/monitor/cmsocx.exe'>系统检测到还没有安装视频播放控件，请点击下载最新控件！</a></div>",
			width:200,
			buttons: {
			}
		});*/
	}
}
/*****设置本地参数******/
function SetlocalParam()
{
    var OCXobj = document.getElementById("PlayBackOCX");   
    PicType = '.jpg';
    PicPath = 'd:\\chrhc\\Clip';
    RecordPath ='d:\\chrhc\\Rec';
    
    strXML = "<?xml version='1.0'?><Parament><CappicMode>"+ PicType +"</CappicMode><CappicPath>"+ PicPath +"</CappicPath><CutPath>"+ RecordPath +"</CutPath><CutFileSize>2</CutFileSize></Parament>";
    OCXobj.SetLocalParam(strXML);
}

function Destroy(){
		var RemoteCfgOcxObj = document.getElementById("PlayBackOCX");
		 alert(RemoteCfgOcxObj.id);
           if(RemoteCfgOcxObj != null) {
               RemoteCfgOcxObj.Destroy();
           }
}

function getTreeDataAjax(id, func){
	 var url=path;
	 url +="/monitor/vacamerainfo/getCameraInfoForPlayBack?cameraId="+encodeURI(id);
	 $.ajax({type: "GET",url: url,cache: false,global: false, success: function (data) {

		 	if(data.status=='success'){
		 		var retArray=data.result;
		 		  var retObj =retArray [0];
	        	  func(retObj, id);
	        	  SetPlayBackParam();
		 	}else{
		 		
		 		  alert("获取录像回放信息失败，请稍后重试！");
		 	}
        	
         }
     });
}
function dealCamera(retObj, id){
    playbackXmlDoc = buildPlayBackParam(retObj);
}

function SetPlayBackParam(){
    var PlayBackOCXObj = document.getElementById("PlayBackOCX");
     PlayBackOCXObj.SetPlayBackParam(playbackXmlDoc.xml);
}
function changeLocation(listObj){
    for(var i=0; i<listObj.options.length; i++){
        if(listObj.options[i].selected == true){
            playbackXmlDoc.getElementsByTagName("RecLocation")[0].text = listObj.options[i].value;
            break;
        }
    }
}
function buildPlayBackParam(playBackParam){
    var XmlDoc = new ActiveXObject("MSXML2.DOMDocument");
    var Instruction = XmlDoc.createProcessingInstruction("xml","version='1.0' encoding='utf-8'");
    XmlDoc.appendChild(Instruction);
    
    var Root = XmlDoc.createNode(1,"Parament","");
    
    var wndIndex = document.getElementById("PlayBackOCX").GetFocusWndIndex();
    
    Element = XmlDoc.createElement("PlayWndIndex");
    Element.text = wndIndex;
    Root.appendChild(Element);
    
    Element = XmlDoc.createElement("ZoneID");
    Element.text = playBackParam.netZoneId;
    Root.appendChild(Element);
    
    Element = XmlDoc.createElement("RecLocation");
    Element.text = playBackParam.recordType[0];  
   // Element.text = lRecLocation; 
    Root.appendChild(Element);

    Element = XmlDoc.createElement("DevType");
    Element.text = playBackParam.devTypeCode;   
    Root.appendChild(Element);
    
    Element = XmlDoc.createElement("CameraID");
    Element.text = playBackParam.cameraId;
    Root.appendChild(Element);  
    
    Element = XmlDoc.createElement("CameraName");
    Element.text = playBackParam.cameraName;    
    Root.appendChild(Element);
    
    Element = XmlDoc.createElement("VRMUrl");
    Element.text = playBackParam.vrmUrl;
    Root.appendChild(Element);
    
    Element = XmlDoc.createElement("DecodeTag");
	Element.text = playBackParam.decodeTag;
	Root.appendChild(Element);
	
    Element = XmlDoc.createElement("Company");
	Element.text = playBackParam.company;
	Root.appendChild(Element);
    
    if(playBackParam.isCascade){
        Element = XmlDoc.createElement("IsCascade");
        Element.text = 1;
        Root.appendChild(Element);
        
        Element = XmlDoc.createElement("PCode");
		Element.text = playBackParam.pCode;
		Root.appendChild(Element);
        
        Element = XmlDoc.createElement("CameraIndexCode");
        Element.text = playBackParam.cameraIndexCode;
        Root.appendChild(Element);
        
        Element = XmlDoc.createElement("CascadeServerIp");
        Element.text = playBackParam.cascadeIp;
        Root.appendChild(Element);      
        
        Element = XmlDoc.createElement("CascadeServerPort");
        Element.text = playBackParam.cascadePort;
        Root.appendChild(Element);  
    }else{
        Element = XmlDoc.createElement("IsCascade");
        Element.text = 0;
        Root.appendChild(Element);
        
        Element = XmlDoc.createElement("PCode");
		Element.text = "";
		Root.appendChild(Element);
        
        Element = XmlDoc.createElement("CameraIndexCode");
        Element.text = "";
        Root.appendChild(Element);
        
        Element = XmlDoc.createElement("CascadeServerIp");
        Element.text = "";
        Root.appendChild(Element);      
        
        Element = XmlDoc.createElement("CascadeServerPort");
        Element.text = "";
        Root.appendChild(Element);  
    }
    
    Element = XmlDoc.createElement("DownLoadRight");
	Element.text = "0";
	Root.appendChild(Element);
    
    XmlDoc.appendChild(Root);
       
    return XmlDoc;
}

function searchPlayBack(){
    var checkResult = checkFormParam();
    if(!checkResult.result){
        alert(checkResult.reason);
        return;
    }
    
    var starttime = document.getElementById("StartTime").value; 
    var endtime = document.getElementById("EndTime").value;
    
    var XmlDoc = new ActiveXObject("MSXML2.DOMDocument");
    var Instruction = XmlDoc.createProcessingInstruction("xml","version='1.0' encoding='utf-8'");
    XmlDoc.appendChild(Instruction);    
    var Root = XmlDoc.createNode(1,"Parament","");
    Element = XmlDoc.createElement("BeginTime");
    Element.text = starttime;
    Root.appendChild(Element);
    Element = XmlDoc.createElement("EndTime");  
    Element.text =  endtime;
    Root.appendChild(Element);
    Element = XmlDoc.createElement("RecordType");
    var rectype = document.getElementById("RecType").value; 
    Element.text = rectype; 
    Root.appendChild(Element);
    
    XmlDoc.appendChild(Root);   
    //alert(XmlDoc.xml);
    try {
        
        document.getElementById("PlayBackOCX").StartQueryRecord(XmlDoc.xml);
    }catch(e){
        alert("录像搜索失败！");
    }
}

function checkFormParam(){
    var retObj = {result:true, reason:""};
    
    var starttime = document.getElementById("StartTime").value; 
    var endtime = document.getElementById("EndTime").value;
    
    if(!strDateTime(starttime)){
        retObj.result = false;
        retObj.reason = "开始时间格式不正确，请重新输入！\n正确的格式如：2010-01-01 00:00:00";
        return retObj;
    }
    if(!strDateTime(endtime)){
        retObj.result = false;
        retObj.reason = "结束时间格式不正确，请重新输入！\n正确的格式如：2010-01-01 00:00:00";
        return retObj;
    }
    
    
    var result = hotline.util.compareDateTime(endtime, starttime);
    if(result < 0){
        retObj.result = false;
        retObj.reason = "结束时间不能早于开始时间！";
        return retObj;
    }
    
    var st = hotline.util.getTime(starttime);
    var et = hotline.util.getTime(endtime);
    var dif = et - st;
    if(dif > 3*24*3600*1000){
        retObj.result = false;
        retObj.reason = "查询时间不要超过三天！！";
        return retObj;
    }
    return retObj;
}
/**
 * 得到时间 format: yyyy-MM-dd hh:mm:ss 1970-01-01 00:00:00
 * 
 * @param {}
 *            date
 * @return {} 单位毫秒
 */
hotline.util.getTime = function(date) {

	if (date == null || date == "") {
		date = new Date();
		return date.getTime();
	}

	var dt = date.split(" ");
	var vdate = dt[0].split("-");
	var vtime = dt[1].split(":");
	var ndate = new Date(vdate[0], vdate[1] - 1, vdate[2], vtime[0], vtime[1],
			vtime[2]);
	return ndate.getTime();
};
hotline.util.compareDateTime = function(endDate, startDate) {
	var endTime = hotline.util.getTime(endDate);
	var startTime = hotline.util.getTime(startDate);
	if (endTime == startTime)
		return "0";
	if (endTime > startTime)
		return "1";
	if (endTime < startTime)
		return "-1";
};
Date.prototype.toCommonCase=function(){
    var xYear=this.getFullYear();
    var xMonth=this.getMonth()+1;
    if(xMonth<10){
        xMonth="0"+xMonth;
    }

    var xDay=this.getDate();
    if(xDay<10){
        xDay="0"+xDay;
    }

    var xHours=this.getHours();
    if(xHours<10){
        xHours="0"+xHours;
    }

    var xMinutes=this.getMinutes();
    if(xMinutes<10){
        xMinutes="0"+xMinutes;
    }

    var xSeconds=this.getSeconds();
    if(xSeconds<10){
        xSeconds="0"+xSeconds;
    }
    
    return xYear+"-"+xMonth+"-"+xDay+" "+xHours+":"+xMinutes+":"+xSeconds;
};