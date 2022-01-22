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
import { UPDATE_USER } from './SC110_Action'
import { SC110_S_Context } from './SC110_Store'
import { SC110_Style } from "./SC110_Style"

export const SC110_V02_User = (props: object) => {
    console.log("V0010_Home:----------------------")
    // useContextを用いてstate, dispatchを取得する
    const { state, dispatch } = useContext(SC110_S_Context)

    // イベントハンドラ関数を定義する
    // [add]ボタンタップ時のイベントハンドラ関数
    const onPressEvent_N = () => {
        // 取得したstateの値を更新する
        state.userInfo.userId = "0103"
        state.userInfo.userName = "なべ"
        // Actionを引数に指定し、dispatchする
        dispatch(UPDATE_USER(state.userInfo))
    }
    const onPressEvent_T = () => {
        // 取得したstateの値を更新する
        state.userInfo.userId = "0609"
        state.userInfo.userName = "つね"
        // Actionを引数に指定し、dispatchする
        dispatch(UPDATE_USER(state.userInfo))
    }
    const onPressEvent_H = () => {
        // 取得したstateの値を更新する
        state.userInfo.userId = "0223"
        state.userInfo.userName = "ごり"
        // Actionを引数に指定し、dispatchする
        dispatch(UPDATE_USER(state.userInfo))
    }
    const onPressEvent_Clear = () => {
        // 取得したstateの値を更新する
        state.userInfo.userId = ""
        state.userInfo.userName = ""
        // Actionを引数に指定し、dispatchする
        dispatch(UPDATE_USER(state.userInfo))
    }
    // JSXを返す。ボタンごとにイベントハンドラを指定することで、そのボタンアクション（下の例では「onPressアクション」）によって処理を実行可能
    return (
        <>
            <Text>ユーザ名：{state.userInfo.userName}</Text>
            <View style={SC110_Style.v02_UserBar}>
                <View style={SC110_Style.v02_UserBtn}>
                    <Button title="N" onPress={onPressEvent_N}></Button>
                </View>
                <View style={SC110_Style.v02_UserBtn}>
                    <Button title="T" onPress={onPressEvent_T}></Button>
                </View>
                <View style={SC110_Style.v02_UserBtn}>
                    <Button title="H" onPress={onPressEvent_H}></Button>
                </View>
            </View >
            <View style={SC110_Style.v02_UserBar}>
                <View style={SC110_Style.v02_UserBtn}>
                    <Button title="Clear" onPress={onPressEvent_Clear}></Button>
                </View>
            </View>

        </>
    );
}
