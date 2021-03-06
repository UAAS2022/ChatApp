import React, { useState, useEffect } from 'react';
import {
    T100_Talk,
    T101_TalkUser,
    M050_User,
} from "./C020_FirebaseUtil_Types"

export const c010_UaasUtil_isNotEmpty = (obj: any): boolean => {
    let errFlg = true
    if (obj == null) {
        errFlg = false
    } else if (obj == undefined) {
        errFlg = false
    } else if (obj == NaN) {
        errFlg = false
    }
    return errFlg
}

export const c010_UaasUtil_isNotBlank = (obj: any): boolean => {
    let errFlg = true
    if (obj == null) {
        errFlg = false
    } else if (obj == undefined) {
        errFlg = false
    } else if (obj == NaN) {
        errFlg = false
    } else if (obj == "") {
        errFlg = false
    }
    return errFlg
}

export const c010_isCreatedTalkUser_T101 = (talkUserInfoList_Detail: {
    talkInfo: T100_Talk,
    talkUserInfo: T101_TalkUser,
    chatUserInfo: M050_User,
}[], serchUserId: string): boolean => {
    // 戻り値の初期化
    let isCreatedFlg = false
    // 検証
    for (let talkUserInfo_Detail of talkUserInfoList_Detail) {
        if (serchUserId == talkUserInfo_Detail.chatUserInfo.UserId) {
            isCreatedFlg = true
            break
        }
    }
    return isCreatedFlg
}