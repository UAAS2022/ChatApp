// Actionを定義。typeとpayloadを指定する。

import React, { useState, useEffect, useContext } from 'react';
import type { SC999_Context, SC999_ScreenController, T999_UserInfo, SC999_V14, SC999_V19 } from "./SC999_Types"
import { SC999_ACTIONTYPE } from "./SC999_Const"

export const CHANGE_SCREEN = (payload: SC999_ScreenController) => {
    return {
        type: SC999_ACTIONTYPE.CHANGE_SCREEN,
        payload
    }
}

export const UPDATE_V08 = (payload: { userInfoList: T999_UserInfo[], userInfoList_ScreenDisp: T999_UserInfo[][] }) => {
    return {
        type: SC999_ACTIONTYPE.UPDATE_V08,
        payload
    }
}

export const UPDATE_V14 = (payload: { sC999_V14_Info: SC999_V14 }) => {
    return {
        type: SC999_ACTIONTYPE.UPDATE_V14,
        payload
    }
}

export const UPDATE_V19 = (payload: { sC999_V19_Info: SC999_V19 }) => {
    return {
        type: SC999_ACTIONTYPE.UPDATE_V19,
        payload
    }
}