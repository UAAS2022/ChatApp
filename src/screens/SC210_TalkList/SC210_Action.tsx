import React, { useState, useEffect, useContext } from 'react';
import type { SC210_Context, SC210_TalkUserInfo_Detail, } from "./SC210_Types"
import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"

// ①ActionTypeを定義
// ================================================================================
export const SC210_ACTIONTYPE = {
    UPDATE_TALKLIST: "UPDATE_TALKLIST",
}
// ================================================================================

// ②Actionを定義
// ================================================================================
// USERオブジェクトの値を更新するためのAction
export const UPDATE_TALKLIST = (payload: SC210_TalkUserInfo_Detail[]): SC000_Action => {
    return {
        type: SC210_ACTIONTYPE.UPDATE_TALKLIST,
        payload,
    }
}
// ================================================================================

