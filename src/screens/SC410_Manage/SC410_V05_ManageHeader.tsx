// View

import React, { useState, useEffect, useContext } from 'react';
import {
    // View,
    Button,
} from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    // Text,
    // Button,
    FlatList,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import { CONST_SC000 } from "../../common/C000_Const"
import { SC000_CHANGE_SCREEN } from "../SC000_BaseComponent/SC000_Action"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { SC000_Context } from '../SC000_BaseComponent/SC000_Types'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { CHANGE_SCREEN } from "./SC410_Action"
import { SC410_S_Context } from "./SC410_Store"
import { SC410_Style } from "./SC410_Style"


export const SC410_V05_ManageHeader = (props: object) => {
    // B:スクリーンコンテキストで表示切り替え情報を管理した場合----------------------------------------------------------
    // スクリーンコンテキストを呼び出す
    const { state, dispatch } = useContext(SC410_S_Context)

    // CS410への遷移関数
    const onClickSwitch_SC410_SC = () => {
        // 取得したstateの値を更新する
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENINFO.SC410.SCREENID
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENINFO.SC410.SCREENID)
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitch_SC410_SC2 = () => {
        // 取得したstateの値を更新する
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENINFO.SC430.SCREENID
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENINFO.SC430.SCREENID)
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    // ---------------------------------------------------------------------------------------------------------

    return (
        <>
            <View style={SC410_Style.v08_ProfileHeader} >


                <Button style={SC410_Style.v05_BackBtn} size="sm" variant="outline" colorScheme="primary" onPress={onClickSwitch_SC410_SC}>
                    戻る
                </Button>
                <Button style={SC410_Style.v09_HensyuBtn} size="sm" variant="outline" colorScheme="primary" onPress={onClickSwitch_SC410_SC2}>
                    編集
                </Button>

            </View>
        </>
    )
}
