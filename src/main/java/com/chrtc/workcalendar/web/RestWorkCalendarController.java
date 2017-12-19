package com.chrtc.workcalendar.web;

import com.alibaba.fastjson.JSONObject;
import com.chrtc.common.Result;
import com.chrtc.common.ResultFactory;
import com.chrtc.workcalendar.service.WorkCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/18.
 */
@RestController
@RequestMapping(value = "/rest/workcalendar" )
public class RestWorkCalendarController {
    @Autowired
    private WorkCalendarService workCalendarService;
    @RequestMapping(value = "holiday")
    public Result getHoliday(@RequestParam(value="year",required=true) String year,
                             @RequestParam(value="month",required=true) String month,
                             HttpServletRequest req){

        int days = workCalendarService.getHolidays(Integer.parseInt(year),Integer.parseInt(month));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("holidays",days);
        return ResultFactory.create("200","调用成功",jsonObject);
    }
    @RequestMapping(value = "restday")
    public Result getRestday(@RequestParam(value="year",required=true) String year,
                             @RequestParam(value="month",required=true) String month,
                             HttpServletRequest req){

        int days = workCalendarService.getRestDays(Integer.parseInt(year),Integer.parseInt(month));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("restdays",days);
        return ResultFactory.create("200","调用成功",jsonObject);
    }
}
