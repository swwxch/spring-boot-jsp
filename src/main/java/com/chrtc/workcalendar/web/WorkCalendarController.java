package com.chrtc.workcalendar.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.chrtc.common.Result;
import com.chrtc.common.ResultFactory;
import com.chrtc.workcalendar.entity.WorkCalendar;
import com.chrtc.workcalendar.service.WorkCalendarService;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * Created by Administrator on 2017/12/15.
 */
@Controller
@RequestMapping(value = WorkCalendarController.base_path )
public class WorkCalendarController {
    public static final Log log = LogFactory.getLog(WorkCalendarController.class);
    public static  final String base_path = "/workcalendar";
    @Autowired
    private WorkCalendarService workCalendarService;
    @RequestMapping(value = "add")
    public ModelAndView addWorkCalendar(HttpServletRequest req){
        ModelAndView mv = new ModelAndView();
        String workyear = req.getParameter("workyear");
        if(StringUtils.isBlank(workyear)){
            Calendar cal = Calendar.getInstance();
            workyear = String.valueOf(cal.get(cal.YEAR));
        }

        //取得节假日
        List<WorkCalendar> wca = workCalendarService.findByYearAndWorkType(String.valueOf(workyear), "0");

        //取得补班信息
        List<WorkCalendar> wcb = workCalendarService.findByYearAndWorkType(String.valueOf(workyear), "1");
      //  String json = JsonMapper.nonDefaultMapper().toJson(wca);

        String json = JSON.toJSONString(wca);
        String jsonb = JSON.toJSONString(wcb);
        mv.addObject("wca", json);
        mv.addObject("wcb", jsonb);
        mv.addObject("workyear", workyear);
        mv.setViewName(base_path + "/workcalendar_add");
        return mv;
    }
    /**
     * 保存工作日历
     * @param ar1arry
     * @param model
     * @param req
     * @return
     */
    @RequestMapping(value="saveworkcalendar",method = RequestMethod.POST)
    @ResponseBody
    public Result saveWorkCalendar(@RequestParam(value="ar1arry",required=true,defaultValue="null") String ar1arry,
                                   Model model, HttpServletRequest req) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        //String arr1arry = req.getParameter("ar1arry");
        String workType = req.getParameter("workType");
        String workyear = req.getParameter("workyear");

        JSONObject jsonObject = new JSONObject();
        try {
            workCalendarService.deleteByYearAndWorkType(workyear, workType);
            String[] idArray = ar1arry.split(",") ;
            for (String singleId : idArray) {
                WorkCalendar workCalendar = new WorkCalendar();
                Date date =	sf.parse(singleId);
                workCalendar.setDateTime(date);
                Calendar c = Calendar.getInstance();
                c.setTime(date);
                int month = c.get(Calendar.MONTH) + 1;
                workCalendar.setWorkType(workType);
                workCalendar.setYear(workyear);
                workCalendar.setMonth(String.valueOf(month));
                workCalendarService.saveWorkCalendar(workCalendar);

            }
           // model.addAttribute("workyear", workyear);


            jsonObject.put("workyear",workyear);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return ResultFactory.create("200","保存成功",jsonObject);
    }
    public static void printfWeeks(String date) throws Exception {
        // String date = "2013-09";
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM");
        Date date1 = dateFormat.parse(date);
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date1);
        int days = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        System.out.println("days:" + days);
        int count = 0;
        for (int i = 1; i <= days; i++) {
            DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
            Date date2 = dateFormat1.parse(date + "-" + i);
            calendar.clear();
            calendar.setTime(date2);
            int k = new Integer(calendar.get(Calendar.DAY_OF_WEEK));
            if (k == 1) {// 若当天是周日
                count++;
                System.out.println("-----------------------------------");
                System.out.println("第" + count + "周");
                if (i - 6 <= 1) {
                    System.out.println("本周开始日期:" + date + "-" + 1);
                } else {
                    System.out.println("本周开始日期:" + date + "-" + (i - 6));
                }
                System.out.println("本周结束日期:" + date + "-" + i);
                System.out.println("-----------------------------------");
            }
            if (k != 1 && i == days) {// 若是本月最好一天，且不是周日
                count++;
                System.out.println("-----------------------------------");
                System.out.println("第" + count + "周");
                System.out.println("本周开始日期:" + date + "-" + (i - k + 2));
                System.out.println("本周结束日期:" + date + "-" + i);
                System.out.println("-----------------------------------");
            }
        }
    }
    public static void main(String[] args) {
        try {
            String s = "2017-";
            for (int i = 1; i <= 12; i++) {
                System.out.println("*******************************************");
                System.out.println("月份:" + i);
                printfWeeks(s + i);
                System.out.println("*******************************************");

            }

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}
