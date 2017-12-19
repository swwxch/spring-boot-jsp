//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.chrtc.common;

import java.io.Serializable;

public interface CodeMsgAble extends Serializable {
    String SUCCESS_C = "0";
    String SUCCESS_M = "操作成功";

    default String getCode() {
        return "0";
    }

    default String getMsg() {
        return "操作成功";
    }
}
