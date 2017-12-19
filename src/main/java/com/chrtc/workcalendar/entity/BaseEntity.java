package com.chrtc.workcalendar.entity;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * 统一定义id的entity基类.
 * 
 * 基类统一定义id的属性名称、数据类型、列名映射及生成策略.
 * Oracle需要每个Entity独立定义id的SEQUCENCE时，不继承于本类而改为实现一个Idable的接口。
 * 
 */
// JPA 基类的标识
@MappedSuperclass
public abstract class BaseEntity implements java.io.Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7695126774424638524L;

	protected String id;
    
	private String createUserId;
  
	private Date createDatetime;

	private String lastUpdateUserId;

	private Date lastUpdateDatetime;

	private String obligateA;

	private String obligateB;

	private String obligateC;

	private String obligateD;

	private String obligateE;
	
	private String status;//  业务状态 
	
	private String deleted="0"; //逻辑删除字段 数据状态 0 代表可用  1代表已删除 
	private Integer versionNum=0;//版本号

	
//	private String approvalStatus;//审批状态

	@Id
	@GeneratedValue(generator = "generatedkey")
	@GenericGenerator(name = "generatedkey", strategy = "uuid")
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(name="createuserid", length=32,updatable=false)
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	 @Temporal(TemporalType.TIMESTAMP)
	@Column(name="createdatetime",updatable=false)
	 @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getCreateDatetime() {
		return createDatetime;
	}
	public void setCreateDatetime(Date createDatetime) {
		this.createDatetime = createDatetime;
	}
    @Column(name="lastupdateuserid", length=32)
	public String getLastUpdateUserId() {
		return lastUpdateUserId;
	}
	public void setLastUpdateUserId(String lastUpdateUserId) {
		this.lastUpdateUserId = lastUpdateUserId;
	}
	 @Temporal(TemporalType.TIMESTAMP)
    @Column(name="lastupdatedatetime")
	 @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public Date getLastUpdateDatetime() {
		return lastUpdateDatetime;
	}
	public void setLastUpdateDatetime(Date lastUpdateDatetime) {
		this.lastUpdateDatetime = lastUpdateDatetime;
	}
    @Column(name="obligatea", length=60)
	public String getObligateA() {
		return obligateA;
	}
	public void setObligateA(String obligateA) {
		this.obligateA = obligateA;
	}
    @Column(name="obligateb", length=60)
	public String getObligateB() {
		return obligateB;
	}
	public void setObligateB(String obligateB) {
		this.obligateB = obligateB;
	}
    @Column(name="obligatec", length=60)
	public String getObligateC() {
		return obligateC;
	}
	public void setObligateC(String obligateC) {
		this.obligateC = obligateC;
	}
    @Column(name="obligated", length=60)
	public String getObligateD() {
		return obligateD;
	}
	public void setObligateD(String obligateD) {
		this.obligateD = obligateD;
	}
    @Column(name="obligatee", length=60)
	public String getObligateE() {
		return obligateE;
	}
	public void setObligateE(String obligateE) {
		this.obligateE = obligateE;
	}
	
	@Column(name="status", length=20)
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Column(name="deleted", length=1)
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	
	@Column(name="versionNum")
	public Integer getVersionNum() {
		return versionNum;
	}
	public void setVersionNum(Integer versionNum) {
		this.versionNum = versionNum;
	}
	

	//@Column(name="approvalstatus", length=2)
//	public String getApprovalStatus() {
//		return approvalStatus;
//	}
//	public void setApprovalStatus(String approvalStatus) {
//		this.approvalStatus = approvalStatus;
//	}
	

}
