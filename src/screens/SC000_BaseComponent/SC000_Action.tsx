// Actionを定義。typeとpayloadを指定する。

import React, { useState, useEffect, useContext } from 'react';
import type { SC000_ScreenController } from "./SC000_Types"
import { SC000_ACTIONTYPE } from "./SC000_Const"

export const CHANGE_SCREEN = (payload: SC000_ScreenController) => {
    return {
        type: SC000_ACTIONTYPE.CHANGE_SCREEN,
        payload
    }
}

export const ERROR = (payload: SC000_ScreenController) => {
    return {
        type: SC000_ACTIONTYPE.ERROR,
        payload
    }
}