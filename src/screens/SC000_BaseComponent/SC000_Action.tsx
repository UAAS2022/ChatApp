// Actionを定義。typeとpayloadを指定する。

import React, { useState, useEffect, useContext } from 'react';
import type {
    SC000_ScreenController,
    SC000_LoginUserInfo,
    SC110_BaseContext,
    SC210_BaseContext,
} from "./SC000_Types"
// import { SC000_ACTIONTYPE } from "../../common/C000_Const"

// ①ActionTypeを定義
// ================================================================================
export const SC000_ACTIONTYPE = {
    SC000: {
        SC000_CHANGE_SCREEN: "SC000_CHANGE_SCREEN",
        SC000_UPDATE_LOGIN_USER: "SC000_UPDATE_LOGIN_USER",
        SC000_UPDATE_LAYOUTPATTERN: "SC000_UPDATE_LAYOUTPATTERN",
        SC000_ERROR: "SC000_ERROR",
    },
    SC110: {
        SC110_UPDATE_USERLIST: "SC110_UPDATE_USERLIST",
    },
    SC210: {
        SC210_UPDATE_TAlKUSER: "SC210_UPDATE_TAlKUSER",
    }
}
// ================================================================================

// ②Actionを定義
// ================================================================================
// SC000---------------------------------------------------------------------------
export const SC000_CHANGE_SCREEN = (payload: SC000_ScreenController) => {
    return {
        type: SC000_ACTIONTYPE.SC000.SC000_CHANGE_SCREEN,
        payload
    }
}
export const SC000_UPDATE_LOGIN_USER = (payload: SC000_LoginUserInfo) => {
    return {
        type: SC000_ACTIONTYPE.SC000.SC000_UPDATE_LOGIN_USER,
        payload
    }
}
export const SC000_UPDATE_LAYOUTPATTERN = (payload: SC000_ScreenController) => {
    return {
        type: SC000_ACTIONTYPE.SC000.SC000_UPDATE_LAYOUTPATTERN,
        payload
    }
}
export const SC000_ERROR = (payload: SC000_ScreenController) => {
    return {
        type: SC000_ACTIONTYPE.SC000.SC000_ERROR,
        payload
    }
}
// --------------------------------------------------------------------------------

// SC110---------------------------------------------------------------------------
export const SC110_UPDATE_USERLIST = (payload: { baseContext_SC110: SC110_BaseContext }) => {
    return {
        type: SC000_ACTIONTYPE.SC110.SC110_UPDATE_USERLIST,
        payload
    }
}
// --------------------------------------------------------------------------------

// SC210---------------------------------------------------------------------------
export const SC210_UPDATE_TAlKUSER = (payload: { baseContext_SC210: SC210_BaseContext }) => {
    return {
        type: SC000_ACTIONTYPE.SC210.SC210_UPDATE_TAlKUSER,
        payload
    }
}
// --------------------------------------------------------------------------------
// ================================================================================


