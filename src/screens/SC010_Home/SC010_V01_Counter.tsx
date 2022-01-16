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
import { COUNTER_ADD, COUNTER_REMOVE } from './SC010_Action'
import { SC010_S_HomeProvider, SC010_S_HomeContext } from './SC010_Store'

export const SC010_V01_Counter = (props: object) => {
    console.log("V0010_Home:----------------------")
    const ScreenChangeBtnInfo1 = { name: "Top", screenTitle: "Top画面へ", nextScreenId: "V0010" }
    const ScreenChangeBtnInfo2 = { name: "TalkList", screenTitle: "トーク一覧画面へ", nextScreenId: "V0020" }
    const { counterObj: { count }, dispatch_counterObj } = useContext(SC010_S_HomeContext)

    const onPressEventAdd = () => { dispatch_counterObj(COUNTER_ADD) }
    const onPressEventRemove = () => { dispatch_counterObj(COUNTER_REMOVE) }
    return (
        <>
            <SC010_S_HomeProvider>
                <Text>カウンタ：{count}</Text>
                <Button title="add" onPress={onPressEventAdd}>加算</Button>
                <Button title="remove" onPress={onPressEventRemove}>減算</Button>
            </SC010_S_HomeProvider>
        </>
    );
}
