// View

import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    Button,
    FlatList,
    Alert
} from 'react-native';
import { CONST_SC000 } from "../../common/C000_Const"
import { SC000_S_Provider, SC000_S_Context } from './SC000_Store'
import { SC000_CHANGE_SCREEN } from './SC000_Action';
import { SC000_V01_MainScreen } from './SC000_V01_MainScreen'
import { SC000_Style } from "./SC000_Style"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"
import { SC000_UPDATE_LAYOUTPATTERN } from "./SC000_Action"
import { SC000_ScreenController } from "./SC000_Types"

export const SC000_V00_BaseComponent = () => {
    try {
        return (
            <>
                <SC000_S_Provider>
                    <View style={SC000_Style.v00_BaseComponent}>
                        <SC000_V01_MainScreen />
                    </View>
                </SC000_S_Provider>
            </>
        );
    } catch (error) {
        //console.log("Error:V0000_BaseComponent:")
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        // throw(error)
        return (<SC950_V00_Error />)
    }
}

// カスタムフック
export const useState_SC000_LayoutPattern = (screenId: string) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    const newState = { ...baseState }
    // newState.screenControllerInfo.layoutPattern = getLayoutPattern(screenId)

    const updateLayoutPattern = () => {
        // メニューバー非表示
        baseDispatch(SC000_UPDATE_LAYOUTPATTERN(newState.screenControllerInfo))
    }
    return [updateLayoutPattern]
}

// カスタムフック
export const useState_SC000_ScreenController = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // newState.screenControllerInfo.layoutPattern = getLayoutPattern(screenId)

    // 画面遷移を実現する関数
    const updateScreenControllerInfo = (screenControllerInfo: {
        SCREENID: string,
        HEADERKBN: string,
        FOOTERKBN: string,
    }) => {
        const newState = { ...baseState }
        newState.screenControllerInfo.screenId = screenControllerInfo.SCREENID
        newState.screenControllerInfo.headerKbn = screenControllerInfo.HEADERKBN
        newState.screenControllerInfo.footerKbn = screenControllerInfo.FOOTERKBN
        baseDispatch(SC000_CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return [updateScreenControllerInfo]
}