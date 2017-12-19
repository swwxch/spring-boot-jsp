package com.chrtc.workcalendar.service;

import com.chrtc.workcalendar.entity.WorkCalendar;

import java.util.Date;
import java.util.List;

public interface WorkCalendarService {

	/**
	 * 保存工作日历
	 * @param workcalendar
	 * @return
	 */
	public abstract WorkCalendar saveWorkCalendar(WorkCalendar workcalendar);
	/**
	 * 根据所属年份和工作类型查询
	 * @param year
	 * @param workType
	 * @return
	 */
	public abstract List<WorkCalendar> findByYearAndWorkType(String year, String workType);
	
	public abstract List<WorkCalendar> findByYearAndWorkTypeAll();
	public abstract WorkCalendar findone(String id);
	/**
	 * 计算两个时间内的工作天数
	 * @param strStartDate
	 * @param strEndDate
	 * @return
	 */
	public abstract int getDutyDays(Date strStartDate, Date strEndDate);
	
	public abstract void deleteByYearAndWorkType(String year, String workType);

	/**
	 * 获取指定月份节假日天数
	 * @param year
	 * @param month
     * @return
     */
	public abstract int getHolidays(int year ,int month);
	/**
	 * 获取指定月份休息日天数
	 * @param year
	 * @param month
	 * @return
	 */
	public abstract int getRestDays(int year ,int month);
}
