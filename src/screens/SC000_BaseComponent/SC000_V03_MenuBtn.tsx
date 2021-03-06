import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    Stack,
    Icon,
    Modal,
    Center,
    NativeBaseProvider,
    Heading,
    Flex,
    Divider,
} from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    // Button,
    FlatList,
    Alert
} from 'react-native';
// import { screenIdSet } from '../views/v0000_BaseComponent/V0000_BaseComponent'
import { SC000_CHANGE_SCREEN } from './SC000_Action'
import { SC000_S_Context } from "./SC000_Store"
import { SC000_Style } from "./SC000_Style"
import { CONST_SC000 } from "../../common/C000_Const"
import { SC000_ScreenChangeBtnInfo } from './SC000_Types';
// import { getLayoutPattern } from "./SC000_V01_MainScreen"

export const CC0020_MenuBtn = (props: { btnInfo: SC000_ScreenChangeBtnInfo }) => {
    // propsを受け取る
    const { btnInfo } = props
    // 必要な情報を取得する
    const { buttonName, nextScreenInfo, } = btnInfo;
    // ログ出力
    console.log("btnInfo----------------------")
    console.log(nextScreenInfo)
    console.log("btnInfo----------------------")
    // useContextを用いてstate, dispatchを取得する
    const { state, dispatch } = useContext(SC000_S_Context)
    // [reset]ボタンタップ時のイベントハンドラ関数
    const onClickSwitch = () => {
        const newState = { ...state }
        // 取得したstateの値を更新する
        console.log("btnInfo----------------------")
        console.log(btnInfo)
        console.log("btnInfo----------------------")
        newState.screenControllerInfo.screenId = nextScreenInfo.SCREENID
        newState.screenControllerInfo.headerKbn = nextScreenInfo.HEADERKBN
        newState.screenControllerInfo.footerKbn = nextScreenInfo.FOOTERKBN
        // 画面遷移を実行する。
        dispatch(SC000_CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return (
        <>
            <View style={SC000_Style.v03_MenuBtnView}>
                <Button style={SC000_Style.v03_MenuBtn} size="sm" variant="outline" colorScheme="secondary" onPress={onClickSwitch} bg={"pink.100"} >{buttonName}</Button>
            </View>
        </>
    )
}

// レイアウトパターン
// 1:メニューバーあり
// 2：メニューバーなし
export const getLayoutPattern = (screenId: string): number => {
    let layoutPattern = 1
    switch (screenId) {
        case CONST_SC000.SCREENINFO.SC020.SCREENID:
            layoutPattern = 0
            break;
        case CONST_SC000.SCREENINFO.SC110.SCREENID:
            layoutPattern = 1
            break;
        case CONST_SC000.SCREENINFO.SC210.SCREENID:
            layoutPattern = 1
            break;
        case CONST_SC000.SCREENINFO.SC220.SCREENID:
            layoutPattern = 2
            break;
        case CONST_SC000.SCREENINFO.SC310.SCREENID:
            layoutPattern = 1
            break;
        case CONST_SC000.SCREENINFO.SC410.SCREENID:
            layoutPattern = 1
            break;
    }
    return layoutPattern

}