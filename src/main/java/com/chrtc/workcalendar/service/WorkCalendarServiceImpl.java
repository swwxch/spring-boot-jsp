package com.chrtc.workcalendar.service;

import com.chrtc.workcalendar.dao.WorkCalendarDao;
import com.chrtc.workcalendar.entity.WorkCalendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;


@Service
@Transactional(readOnly = true)
public class WorkCalendarServiceImpl implements WorkCalendarService {

	@Autowired
	private WorkCalendarDao workCalendarDao;
	@PersistenceContext
	private EntityManager em;

	@Override
	@Transactional
	public WorkCalendar saveWorkCalendar(WorkCalendar workcalendar) {
		
		workCalendarDao.save(workcalendar);
		return null;
	}
	@Override
	public List<WorkCalendar> findByYearAndWorkType(String year, String workType) {
		//用此方法出现java.io.NotSerializableException
		List<WorkCalendar> list= workCalendarDao.findByYearAndWorkType(year, workType);
		
		//List<WorkCalendar> list= workCalendarDao.findByYearAndWorkTypeA();
		
		 /*Query query = em.createQuery("from  WorkCalendar t where t.year =:year and t.workType =:workType");
		  query.setHint("org.hibernate.cacheable", true);
		  query.setParameter("year", year);
		  query.setParameter("workType", workType);
		  List<WorkCalendar> list = (List<WorkCalendar>)query.getResultList();*/
		return list;
	}
	@Override
	public List<WorkCalendar> findByYearAndWorkTypeAll() {
		List<WorkCalendar> list= workCalendarDao.findByYearAndWorkTypeAll();
		return list;
	}
	@Override
	public WorkCalendar findone(String id) {
		WorkCalendar workCalendar = workCalendarDao.findOne(id);
		return workCalendar;
	}
	@Override
	public int getDutyDays(Date strStartDate, Date strEndDate) {
		int days = this.getDutyDaysa(strStartDate, strEndDate);
		return days;
	}
	
	private int getDutyDaysa(Date strStartDate,Date strEndDate) {  
	    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");  
	    	Date startDate=null;  
	    	Date endDate = null;  
	    	//int yea = strStartDate.getYear();
	    	//String year = String.valueOf(strStartDate.getYear());
	    	try {  
	    	startDate=df.parse(df.format(strStartDate));  
	    	endDate = df.parse(df.format(strEndDate));  
	    	} catch (ParseException e) {  
	    	System.out.println("非法的日期格式,无法进行转换");  
	    	e.printStackTrace();  
	    	}  
	    	int result = 0;  
	    	while (startDate.compareTo(endDate) <= 0) {  
	    	if (startDate.getDay() != 6 && startDate.getDay() != 0)  
	    	result++;  
	    	startDate.setDate(startDate.getDate() + 1);  
	    	}  
	    	//某年节假日
	    	List<WorkCalendar> list = this.findByYearAndWorkTypeAll();
	    	for(WorkCalendar a : list){
	    		Date date = a.getDateTime();
	    		if("0".equals(a.getWorkType())){
	    			if(date.compareTo(strStartDate) >= 0 && date.compareTo(strEndDate)<=0 ){
		    			result--;
		    		}	
	    		}else{
	    			if(date.compareTo(strStartDate) >= 0 && date.compareTo(strEndDate)<=0 ){
		    			result++;
		    		}	
	    		}
	    		
	    	}
	    	/*//某年补班
	    	List<WorkCalendar> lista = this.findByYearAndWorkTypeAll();
	    	for(WorkCalendar b : lista){
	    		Date dateb = b.getDateTime();
	    		if(dateb.compareTo(startDate) >= 0 && dateb.compareTo(strEndDate)<=0 ){
	    			result++;
	    		}
	    	}*/
	    	return result;  
	    	}
	@Override
	@Transactional
	public void deleteByYearAndWorkType(String year, String workType) {
		workCalendarDao.deleteByYearAndWorkType(year, workType);
		
	}

	@Override
	public int getHolidays(int year,int month) {
		int holiDays = 0;
		List<WorkCalendar> list = workCalendarDao.findByYearAndMonthAndWorkType(String.valueOf(year),String.valueOf(month),"0");
		holiDays = list.size();
		return holiDays;
	}

	@Override
	public int getRestDays(int year, int month) {
		try {
			List<WorkCalendar> list= workCalendarDao.findByYearAndMonth(String.valueOf(year), String.valueOf(month));
			Calendar c = Calendar.getInstance();
			int countdays = 0;
			int sdays = 0;
			if(list != null && list.size()>0){
				for(WorkCalendar a :list){
					Date date = a.getDateTime();
					c.clear();
					c.setTime(date);
					int i = c.get(Calendar.DAY_OF_WEEK);
					//判断是否是周末
					if(i==Calendar.SATURDAY||i==Calendar.SUNDAY)
					{
						sdays+=1;
					}
				}
			}
			c.clear();
			c.set(year,month,0);
			int days = c.getActualMaximum(Calendar.DAY_OF_MONTH);
			Calendar calendar = new GregorianCalendar();
			for(int i=1;i<=days;i++){
				DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
				Date date2 = dateFormat1.parse(year+"-"+month + "-" + i);
				calendar.clear();
				calendar.setTime(date2);
				int k = calendar.get(Calendar.DAY_OF_WEEK);
				if(k==Calendar.SATURDAY||k==Calendar.SUNDAY)
				{
					countdays+=1;
				}
			}
			int restdays = countdays - sdays;
			return restdays;
		}catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


	return  0;
	}

	/**
	 * 获取某年某月的天数
	 * @param year
	 * @param month
     * @return
     */
	private  int getDayOfMonth(int year,int month){
		Calendar c = Calendar.getInstance();
		c.set(year, month, 0); //输入类型为int类型
		int dayOfMonth = c.get(Calendar.DAY_OF_MONTH);
		return dayOfMonth;
	}

}
