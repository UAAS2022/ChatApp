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
import { UPDATE_COUNTER } from './SC110_Action'
import { SC110_S_Context } from './SC110_Store'
import { S010_Context } from "./SC110_Types"

export const SC110_V01_Counter = (props: object) => {
    console.log("V0010_Home:----------------------")
    // useContextを用いてstate, dispatchを取得する
    const { state, dispatch } = useContext(SC110_S_Context)

    // イベントハンドラ関数を定義する
    // [add]ボタンタップ時のイベントハンドラ関数
    const onPressEventAdd = () => {
        // 取得したstateの値を更新する（+1）
        state.counterInfo.count = state.counterInfo.count + 1
        // 更新後のcounterInfoオブジェクトをUPDATE_COUNTER関数の引数に指定し、結果(Action)を取得する
        // Actionを引数に指定し、dispatchする
        dispatch(UPDATE_COUNTER(state.counterInfo))
    }
    // [remove]ボタンタップ時のイベントハンドラ関数
    const onPressEventRemove = () => {
        // 取得したstateの値を更新する（-1）
        state.counterInfo.count = state.counterInfo.count - 1
        dispatch(UPDATE_COUNTER(state.counterInfo))
    }
    // [reset]ボタンタップ時のイベントハンドラ関数
    const onPressEventReset = () => {
        // 取得したstateの値を更新する（0固定）
        state.counterInfo.count = 0
        dispatch(UPDATE_COUNTER(state.counterInfo))
    }
    // JSXを返す。ボタンごとにイベントハンドラを指定することで、そのボタンアクション（下の例では「onPressアクション」）によって処理を実行可能
    return (
        <>
            <Text>カウンタ：{state.counterInfo.count}</Text>
            <Button title="add" onPress={onPressEventAdd}></Button>
            <Button title="remove" onPress={onPressEventRemove}></Button>
            <Button title="reset" onPress={onPressEventReset}></Button>
        </>
    );
}
