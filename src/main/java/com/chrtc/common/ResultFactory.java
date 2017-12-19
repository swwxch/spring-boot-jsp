//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.chrtc.common;

public class ResultFactory {
    public ResultFactory() {
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
}
