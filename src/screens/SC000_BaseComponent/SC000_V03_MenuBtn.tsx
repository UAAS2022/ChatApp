
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
// import { screenIdSet } from '../views/v0000_BaseComponent/V0000_BaseComponent'
import { CHANGE_SCREEN } from './SC000_Action'
import { SC000_S_Context } from "./SC000_Store"
import { SC000_Style } from "./SC000_Style"
// import { getLayoutPattern } from "./SC000_V01_MainScreen"

export const CC0020_MenuBtn = (props: any) => {
    // propsを受け取る
    const { btnInfo } = props
    // 必要な情報を取得する
    const { buttonName, nextScreenId, layoutPattern, action } = btnInfo;
    // ログ出力
    console.log("btnInfo----------------------")
    console.log(btnInfo)
    console.log("btnInfo----------------------")
    // useContextを用いてstate, dispatchを取得する
    const { state, dispatch } = useContext(SC000_S_Context)
    // [reset]ボタンタップ時のイベントハンドラ関数
    const onClickSwitch = () => {
        // 取得したstateの値を更新する
        state.screenControllerInfo.screenId = nextScreenId
        state.screenControllerInfo.layoutPattern = getLayoutPattern(nextScreenId)
        dispatch(CHANGE_SCREEN(state.screenControllerInfo))
    }
    return (
        <>
            <View style={SC000_Style.v03_MenuBtn}>
                <Button title={buttonName} onPress={onClickSwitch} />
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
        case "SC110":
            layoutPattern = 1
            break;
        case "SC210":
            layoutPattern = 1
            break;
        case "SC310":
            layoutPattern = 1
            break;
        case "SC410":
            layoutPattern = 1
            break;
    }
    return layoutPattern

}