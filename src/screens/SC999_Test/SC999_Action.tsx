// Actionを定義。typeとpayloadを指定する。

import React, { useState, useEffect, useContext } from 'react';
import type { SC999_ScreenController } from "./SC999_Types"
import { SC999_ACTIONTYPE } from "./SC999_Const"

export const CHANGE_SCREEN = (payload: SC999_ScreenController) => {
    return {
        type: SC999_ACTIONTYPE.CHANGE_SCREEN,
        payload
    }
}