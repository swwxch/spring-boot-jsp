//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.chrtc.common;

import java.io.Serializable;

public class Result<T> implements Serializable {
    private String code;
    private String msg;
    private T data;

    public Result() {
        this.code = "0";
    }

    public Result(T data) {
        this.code = "0";
        this.data = data;
    }

    public Result(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Result(String code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static Result create(Object data) {
        return new Result(data);
    }

    public static Result create(Object data, String[] includeFields) {
        return new Result(data);
    }

    public static Result create(String code, String msg) {
        return new Result(code, msg);
    }

    public static Result create(String code, String msg, Object data) {
        return new Result(code, msg, data);
    }

    public static Result create(CodeMsgAble codeMsg) {
        return new Result(codeMsg.getCode(), codeMsg.getMsg());
    }

    public static Result create(CodeMsgAble codeMsg, Object data) {
        return new Result(codeMsg.getCode(), codeMsg.getMsg(), data);
    }

    public T getData() {
        return this.data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
