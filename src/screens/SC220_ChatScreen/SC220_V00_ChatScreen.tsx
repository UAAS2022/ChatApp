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
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_UPDATE_LAYOUTPATTERN } from "../SC000_BaseComponent/SC000_Action"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
// import { Provider_SC210 } from "./SC210_Store"
import { SC220_V01_ChatScreen_Main } from "./SC220_V01_ChatScreen_Main"

export const SC220_V00_ChatScreen = (props: any) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // propsから値を受け取る
    const { talkId, talkName } = props
    // ベースコンポーネントのレイアウトパターンを更新する
    const newState = { ...baseState }
    // newState.screenControllerInfo.layoutPattern = 2
    // baseDispatch(SC000_UPDATE_LAYOUTPATTERN(newState.screenControllerInfo))
    return (
        <>
            <SC220_V01_ChatScreen_Main
                talkId={talkId}
                talkName={talkName}
            />
        </>
    );
}
