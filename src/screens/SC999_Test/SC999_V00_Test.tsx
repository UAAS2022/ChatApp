import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Center, NativeBaseProvider } from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    FlatList,
    Alert,
    Dimensions
} from 'react-native';
import { CHANGE_SCREEN } from './SC999_Action'
import { SC999_V01_Test_MainScreen, SC999_V01_Test_MenuBar } from "./SC999_V01_Test_MainScreen"
import { SC999_S_Provider, SC999_S_Context } from './SC999_Store'
import { SC999_Style } from "./SC999_Style"
import { SC999_COMPONENT_ID } from "./SC999_Const"

export const SC999_V00_Test = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    // [reset]ボタンタップ時のイベントハンドラ関数
    const onClickSwitchV00 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V00
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV01 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V01
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV02 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V02
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV03 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V03
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return (
        <>
            <SC999_S_Provider>
                <SC999_V01_Test_MainScreen />
                <SC999_V01_Test_MenuBar />
            </SC999_S_Provider>
        </>
    )
}