package com.chrtc.workcalendar.dao;

import com.chrtc.workcalendar.entity.WorkCalendar;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.persistence.QueryHint;
import java.util.Date;
import java.util.List;
@CacheConfig(cacheNames = "workcalendar")
public interface WorkCalendarDao extends PagingAndSortingRepository<WorkCalendar, String>,JpaSpecificationExecutor<WorkCalendar>,JpaRepository<WorkCalendar, String> {

	/**
	 * 根据所属年份和工作类型查询
	 * @param year
	 * @param workType
	 * @return
	 */
	//@Query("from WorkCalendar t where t.year =?1 and t.workType =?2")   
   // @QueryHints({ @QueryHint(name = "org.hibernate.cacheable", value ="true") })


	public List<WorkCalendar> findByYearAndWorkType(String year, String workType);

	/**
	 * 获取某年某月的节假日及休息日天数
	 * @param year
	 * @param month
	 * @param workType
     * @return
     */
	@Cacheable
	public List<WorkCalendar> findByYearAndMonthAndWorkType(String year, String month,String workType);

	/**
	 * 获取某月节假日及休息日
	 * @param year
	 * @param month
     * @return
     */
	public List<WorkCalendar> findByYearAndMonth(String year, String month);

	/**
	 * 启动查询缓存，缓存整个表数据
	 * @return
	 */
    @Query("from WorkCalendar")
	@Cacheable
	public List<WorkCalendar> findByYearAndWorkTypeAll();
    
    /**
     * 计算两个日期之间的工作日
     * @param startDate
     * @param endDate
     * @param workType
     * @return
     */
    @Query("select a from WorkCalendar a where a.dateTime >= ?1 and a.dateTime <= ?2 and a.workType =?3")
    @QueryHints({ @QueryHint(name = "org.hibernate.cacheable", value ="true") })   
   	public List<WorkCalendar> findWorkDays(Date startDate, Date endDate, String workType);
    
    /**
     * 根据年份和工作类型删除数据
     * @param year
     * @param workType
     */
    @Modifying
    @Query("delete from WorkCalendar a where a.year =?1 and a.workType =?2")
	@CacheEvict(allEntries = true)
    public void deleteByYearAndWorkType(String year, String workType);
}
