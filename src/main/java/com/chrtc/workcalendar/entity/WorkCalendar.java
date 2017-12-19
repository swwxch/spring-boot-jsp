package com.chrtc.workcalendar.entity;

import com.alibaba.fastjson.annotation.JSONField;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name="workcalendar")
public class WorkCalendar extends BaseEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6767176908688893527L;

	/**
	 * 
	 */
//	private static final long serialVersionUID = 1L;
	@JSONField(format="yyyy-MM-dd")
	private Date dateTime;//工作日或补班时间
	private String year; //所属年份
	private String month;//所属月份
	private String workType;//工作类型 0：节假日 1：补班

	@Column(name="month",length=10)
	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	@Temporal(TemporalType.DATE)

	@Column(name="datetime")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	public Date getDateTime() {
		return dateTime;
	}
	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
	@Column(name="year",length=10)
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	@Column(name="worktype",length=10)
	public String getWorkType() {
		return workType;
	}
	public void setWorkType(String workType) {
		this.workType = workType;
	}
	
}
