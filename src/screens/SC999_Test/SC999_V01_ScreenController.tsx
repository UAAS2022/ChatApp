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
import { SC999_V04_Chat_Demo } from "./SC999_V04_Chat_Demo"
import { SC999_V05_RegistUser } from "./SC999_V05_RegistUser"
import { SC999_V09_SelectUser_List } from "./SC999_V09_SelectUser_List"
import { SC999_V07_DeleteUser } from "./SC999_V07_DeleteUser"
import { SC999_V06_UpdateUser } from "./SC999_V06_UpdateUser"
import { SC999_V08_SelectUser } from "./SC999_V08_SelectUser"
import { SC999_V10_RegistTalk } from "./SC999_V10_RegistTalk"
import { SC999_V11_UpdateTalk } from "./SC999_V11_UpdateTalk"
import { SC999_V12_DeleteTalk } from "./SC999_V12_DeleteTalk"
import { SC999_V13_SelectTalk } from "./SC999_V13_SelectTalk"
import { SC999_V14_SelectTalk_List } from "./SC999_V14_SelectTalk_List"
import { SC999_V15_RegistChatMessage } from "./SC999_V15_RegistChatMessage"
import { SC999_V19_SelectChatMessageList_List } from "./SC999_V19_SelectChatMessageList_List"
import { SC999_V20_ChatMessage_Pre1 } from "./SC999_V20_ChatMessage_Pre1"
import { SC999_V21_Login_Demo } from "./SC999_V21_Login_Demo"
import { SC999_V22_ChatMessage_Pre2 } from "./SC999_V22_ChatMessage_Pre2"
import { SC999_V23_ChatMessage_Pre3 } from "./SC999_V23_ChatMessage_Pre3"

// スクリーンコンポーネント
export const SC999_V01_ScreenController = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    const { componentId } = state.screenControllerInfo
    console.log("C0000_Main:screenController----------------------")
    console.log("C0000_Main:screenId:", componentId)
    switch (componentId) {
        case SC999_COMPONENT_ID.SC999_V02:
            return <SC999_V02_Default />
        case SC999_COMPONENT_ID.SC999_V03:
            return <SC999_V03_Example />
        case SC999_COMPONENT_ID.SC999_V04:
            return <SC999_V04_Chat_Demo />
        case SC999_COMPONENT_ID.SC999_V05:
            return <SC999_V05_RegistUser />
        case SC999_COMPONENT_ID.SC999_V06:
            return <SC999_V06_UpdateUser />
        case SC999_COMPONENT_ID.SC999_V07:
            return <SC999_V07_DeleteUser />
        case SC999_COMPONENT_ID.SC999_V08:
            return <SC999_V08_SelectUser />
        case SC999_COMPONENT_ID.SC999_V09:
            return <SC999_V09_SelectUser_List />
        case SC999_COMPONENT_ID.SC999_V10:
            return <SC999_V10_RegistTalk />
        case SC999_COMPONENT_ID.SC999_V11:
            return <SC999_V11_UpdateTalk />
        case SC999_COMPONENT_ID.SC999_V12:
            return <SC999_V12_DeleteTalk />
        case SC999_COMPONENT_ID.SC999_V13:
            return <SC999_V13_SelectTalk />
        case SC999_COMPONENT_ID.SC999_V14:
            return <SC999_V14_SelectTalk_List />
        case SC999_COMPONENT_ID.SC999_V15:
            return <SC999_V15_RegistChatMessage />
        case SC999_COMPONENT_ID.SC999_V19:
            return <SC999_V19_SelectChatMessageList_List />
        case SC999_COMPONENT_ID.SC999_V20:
            return <SC999_V20_ChatMessage_Pre1 />
        case SC999_COMPONENT_ID.SC999_V21:
            return <SC999_V21_Login_Demo />
        case SC999_COMPONENT_ID.SC999_V22:
            return <SC999_V22_ChatMessage_Pre2 />
        case SC999_COMPONENT_ID.SC999_V23:
            return <SC999_V23_ChatMessage_Pre3 />
        default:
            return <SC999_V02_Default />
    }
}

// メニューコンポーネント（本当は別ファイル）
export const SC999_V01_Test_MenuBar1 = () => {
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
    const onClickSwitchV04 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V04
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
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV04}>
                    V04
                </Button>
            </View>
        </>
    )
}

// メニューコンポーネント（本当は別ファイル）
export const SC999_V01_Test_MenuBar2 = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    const { componentId } = state.screenControllerInfo
    const onClickSwitchV05 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V05
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV06 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V06
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV07 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V07
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV08 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V08
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV09 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V09
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return (
        <>
            <View style={SC999_Style.menuBtnBar}>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV05}>
                    V05_登録
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV06}>
                    V06_更新
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV07}>
                    V07_削除
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV08}>
                    V08_検索
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV09}>
                    V09_一覧
                </Button>
            </View>
        </>
    )
}

// メニューコンポーネント（本当は別ファイル）
export const SC999_V01_Test_MenuBar3 = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    const { componentId } = state.screenControllerInfo
    const onClickSwitchV10 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V10
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV11 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V11
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV12 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V12
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV13 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V13
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV14 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V14
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return (
        <>
            <View style={SC999_Style.menuBtnBar}>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV10}>
                    V10_登録
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV11}>
                    V11_更新
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV12}>
                    V12_削除
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV13}>
                    V13_検索
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV14}>
                    V14_一覧
                </Button>
            </View>
        </>
    )
}

// メニューコンポーネント（本当は別ファイル）
export const SC999_V01_Test_MenuBar4 = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    const { componentId } = state.screenControllerInfo
    const onClickSwitchV15 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V15
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV16 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V16
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV17 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V17
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV18 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V18
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV19 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V19
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return (
        <>
            <View style={SC999_Style.menuBtnBar}>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV15}>
                    V15_登録
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV16}>
                    V16_更新
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV17}>
                    V17_削除
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV18}>
                    V18_検索
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV19}>
                    V19_一覧
                </Button>
            </View>
        </>
    )
}

// メニューコンポーネント（本当は別ファイル）
export const SC999_V01_Test_MenuBar5 = () => {
    const { state, dispatch } = useContext(SC999_S_Context)
    const { componentId } = state.screenControllerInfo
    const onClickSwitchV20 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V20
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV21 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V21
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV22 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V22
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV23 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V23
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitchV24 = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = SC999_COMPONENT_ID.SC999_V24
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return (
        <>
            <View style={SC999_Style.menuBtnBar}>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV20}>
                    V20_チャット
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV21}>
                    V21_
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV22}>
                    V22_チャット(サブスクべた書き)
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV23}>
                    V23_チャット(サブスク分離)
                </Button>
                <Button size="sm" variant="outline" style={SC999_Style.menuBtn} onPress={onClickSwitchV24}>
                    V24_
                </Button>
            </View>
        </>
    )
}

