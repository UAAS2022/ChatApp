import React, { useState, useEffect, useContext } from 'react';
import type {
    SC210_Context,
    SC210_TalkUserInfo_Detail,
    SC210_ScreenController,
    SC210_ChatScreenPreInfo,
} from "./SC210_Types"
import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"

// ①ActionTypeを定義
// ================================================================================
export const SC210_ACTIONTYPE = {
    UPDATE_TALKLIST: "UPDATE_TALKLIST",
    CHANGE_SCREEN: "CHANGE_SCREEN",
    UPDATE_CHATSCREEN_PREINFO: "UPDATE_CHATSCREEN_PREINFO",
}
// ================================================================================

// ②Actionを定義
// ================================================================================
// USERオブジェクトの値を更新するためのAction
// export const UPDATE_TALKLIST = (payload: { talkUserInfoList_Detail: SC210_TalkUserInfo_Detail[] }): SC000_Action => {
//     return {
//         type: SC210_ACTIONTYPE.UPDATE_TALKLIST,
//         payload,
//     }
// }

// USERオブジェクトの値を更新するためのAction
export const CHANGE_SCREEN = (payload: SC210_ScreenController): SC000_Action => {
    return {
        type: SC210_ACTIONTYPE.CHANGE_SCREEN,
        payload,
    }
}

// USERオブジェクトの値を更新するためのAction
export const UPDATE_CHATSCREEN_PREINFO = (payload: SC210_ChatScreenPreInfo): SC000_Action => {
    return {
        type: SC210_ACTIONTYPE.UPDATE_CHATSCREEN_PREINFO,
        payload,
    }
}
// ================================================================================

