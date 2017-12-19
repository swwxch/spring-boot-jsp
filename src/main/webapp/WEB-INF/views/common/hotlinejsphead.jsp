<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="serverHttpPath" value="http://192.168.1.17:8080" />
<c:set var="random" value="<%=System.currentTimeMillis() %>" />
<%  
    String reportContext = request.getScheme() + "://"  
            + request.getServerName() + ":" + request.getServerPort()  
            + "/chrhcreport/ReportServer?reportlet=";  
    pageContext.setAttribute("reportContext",reportContext);    
    String reportContextold = request.getScheme() + "://"  
            + request.getServerName() + ":" + request.getServerPort()  
            + "/chrhcoldreport/ReportServer?reportlet=";  
    pageContext.setAttribute("reportContextold",reportContextold);  
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">