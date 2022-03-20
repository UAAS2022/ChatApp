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
import { Provider_SC120 } from "./SC120_Store"
import { SC120_V01_UserProfile_Main } from "./SC120_V01_UserProfile_Main"

export const SC120_V00_UserProfile = (props: any) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ④propsからデータを取得する
    const { userId } = props
    // ベースコンポーネントのレイアウトパターンを更新する
    const newState = { ...baseState }
    // newState.screenControllerInfo.layoutPattern = 2
    // baseDispatch(SC000_UPDATE_LAYOUTPATTERN(newState.screenControllerInfo))
    return (
        <>
            <Provider_SC120>
                <SC120_V01_UserProfile_Main
                    userId={userId}
                />
            </Provider_SC120>
        </>
    );
}
