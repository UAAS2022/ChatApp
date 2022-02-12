// Actionを定義。typeとpayloadを指定する。

import React, { useState, useEffect, useContext } from 'react';
import type {
    SC000_ScreenController,
    SC110_BaseContext,
} from "./SC000_Types"
// import { SC000_ACTIONTYPE } from "../../common/C000_Const"

// ①ActionTypeを定義
// ================================================================================
export const SC000_ACTIONTYPE = {
    SC000: {
        SC000_CHANGE_SCREEN: "SC000_CHANGE_SCREEN",
        SC000_ERROR: "SC000_ERROR",
    },
    SC110: {
        SC110_UPDATE_USERLIST: "SC110_UPDATE_USERLIST",
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
// ================================================================================


