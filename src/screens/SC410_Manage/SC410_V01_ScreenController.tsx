// View

import React, { useState, useEffect, useContext } from 'react';

import { CONST_SC000 } from "../../common/C000_Const"
import { SC410_S_Provider, SC410_S_Context } from './SC410_Store'
import { SC410_V02_Manage_Main } from "./SC410_V02_Manage_Main"
import { SC410_V06_IF_SC998 } from "./SC410_V06_IF_SC998"
import { SC410_V07_IF_SC999 } from "./SC410_V07_IF_SC999"
import { SC410_V08_Login_Demo } from "./SC410_V08_Login_Demo"
import { SC410_V09_IF_SC999_V04 } from "./SC410_V09_IF_SC999_V04"
import { SC410_V10_IF_SC020 } from './SC410_V10_IF_SC020';
import { SC410_V10_IF_Profile } from './SC410_V10_IF_Profile';
import { SC020_V01_SignUpMain } from '../SC020_SignUp/SC020_V01_SignUpMain';
import { SC410_V05_ManageHeader } from './SC410_V05_ManageHeader';
import { SC430_V01_EditMain } from './SC430_V01_EditMain';
import { SC430_EditProfile } from './SC430_V00_Edit_Profile';
import { SC010_V00_Init } from '../SC010_Init/SC010_V00_Init';
import { SC010_V10_InitHeader } from '../SC010_Init/SC010_V10_InitHeader';

const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V01_ScreenController = (props: object) => {
    // コンテキストを取得する
    const { state } = useContext(SC410_S_Context)
    // コンテキストからscreenIdを取得する
    const { screenId } = state.screenControllerInfo
    // screenIdの値に応じて画面を切り替える
    switch (screenId) {
        case CONST_SC000.SCREENID.SC410:
            return <SC410_V02_Manage_Main />
        case CONST_SC000.SCREENID.SC430:
            return <><SC410_V05_ManageHeader /><SC430_EditProfile /></>
        case CONST_SC000.SCREENID.SC998:
            return <SC410_V06_IF_SC998 />
        case CONST_SC000.SCREENID.SC999:
            return <SC410_V07_IF_SC999 />
        case CONST_SC000.SCREENID.SC999_V21:
            return <SC410_V08_Login_Demo />
        case CONST_SC000.SCREENID.SC999_V04:
            return <SC410_V09_IF_SC999_V04 />
        case CONST_SC000.SCREENID.SC020:
            return <SC410_V10_IF_SC020 />
        case CONST_SC000.SCREENID.SC999_V30:
            return <SC410_V10_IF_Profile />
        case CONST_SC000.SCREENID.SC010:
            return <><SC010_V10_InitHeader /><SC010_V00_Init /></>
        default:
            return <SC410_V02_Manage_Main />
    }
}
