
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
import { SC000_S_BaseComponentContext } from "./SC000_Store"
import { SC000_Style } from "./SC000_Style"

export const CC0020_MenuBtn = (props: any) => {
    // propsを受け取る
    const { btnInfo } = props
    // 必要な情報を取得する
    const { buttonName, nextScreenId, action } = btnInfo;
    // ログ出力
    console.log("btnInfo----------------------")
    console.log(btnInfo)
    console.log("btnInfo----------------------")
    // stateを取得
    const { screenControllerObj, dispatch_screenControllerObj } = useContext(SC000_S_BaseComponentContext)
    screenControllerObj.screenId = nextScreenId
    // クリックイベント
    const onClickSwitch = () => { dispatch_screenControllerObj(action) }
    return (
        <>
            <View style={SC000_Style.v03_MenuBtn}>
                <Button title={buttonName} onPress={onClickSwitch} />
            </View>
        </>
    )
}