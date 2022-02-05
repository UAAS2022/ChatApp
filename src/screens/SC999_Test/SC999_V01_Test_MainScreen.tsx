import React, { useState, useEffect, useContext } from 'react';
import { Button, Stack, Icon, Modal, Center, NativeBaseProvider } from "native-base"
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
import { SC999_S_Context } from "./SC999_Store"
import { SC999_Style } from "./SC999_Style"
import { SC999_COMPONENT_ID } from "./SC999_Const"
import { SC999_V03_Example } from "./SC999_V03_Example"
import { SC999_V02_Default } from "./SC999_V02_Default"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

export const SC999_V01_Test_MainScreen = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    const { componentId } = state.screenControllerInfo
    console.log("C0000_Main:screenController----------------------")
    console.log("C0000_Main:screenId:", componentId)
    switch (componentId) {
        case SC999_COMPONENT_ID.SC999_V02:
            return <SC999_V02_Default />
        case SC999_COMPONENT_ID.SC999_V03:
            return <SC999_V03_Example />
        default:
            return <SC999_V02_Default />
    }
}

export const SC999_V01_Test_MenuBar = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    const { componentId } = state.screenControllerInfo
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
        console.log("aaaaaaaa", newState)
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
            <View style={SC999_Style.menuBtnBar}>
                <Button size="sm" variant="outline" isDisabled style={SC999_Style.menuBtn} onPress={onClickSwitchV00}>
                    V00
                </Button>
                <Button size="sm" variant="outline" isDisabled style={SC999_Style.menuBtn} onPress={onClickSwitchV01}>
                    V01
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV02}>
                    V02
                </Button>
                <Button size="sm" variant="outline" colorScheme="secondary" style={SC999_Style.menuBtn} onPress={onClickSwitchV03}>
                    V03
                </Button>
            </View>
        </>
    )
}
