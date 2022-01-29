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
import { ERROR } from "../SC000_BaseComponent/SC000_Action"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC000_SCREENID } from "../SC000_BaseComponent/SC000_Const"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CHANGE_SCREEN } from "../SC000_BaseComponent/SC000_Action"

//エラー発生時の共通処理
export const sc950_V00_commonErr = (error: Error) => {
    //コンソールにエラーログを出力する
    console.log(error.message)
    //エラー区分を更新する
    // const { state, dispatch } = useContext(SC000_S_Context)
    // state.errorInfo.errorKbn = 1
    // dispatch(ERROR(state.errorInfo))
    // エラー画面に遷移させる
    // const nextScreenId = SC000_SCREENID.SC950
    // state.screenControllerInfo.screenId = SC000_SCREENID.SC950
    // state.screenControllerInfo.layoutPattern = getLayoutPattern(nextScreenId)
    // dispatch(CHANGE_SCREEN(state.screenControllerInfo))
}

export const SC950_V00_Error = () => {
    try {
        return (
            <>
                <View >
                    <Text>エラーが発生しました。しばらく経ってから再度お試しください。</Text>
                </View>
            </>
        );
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
        throw (error)
    }
}