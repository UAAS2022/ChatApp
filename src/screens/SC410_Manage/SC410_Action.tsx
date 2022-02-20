import React, { useState, useEffect, useContext } from 'react';
import type { SC410_Context, SC410_ScreenController, } from "./SC410_Types"
import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"

// ①ActionTypeを定義
// ================================================================================
export const SC410_ACTIONTYPE = {
    CHANGE_SCREEN: "CHANGE_SCREEN",
}
// ================================================================================

// ②Actionを定義
// ================================================================================
// USERオブジェクトの値を更新するためのAction
export const CHANGE_SCREEN = (payload: SC410_ScreenController): SC000_Action => {
    return {
        type: SC410_ACTIONTYPE.CHANGE_SCREEN,
        payload,
    }
}
// ================================================================================

