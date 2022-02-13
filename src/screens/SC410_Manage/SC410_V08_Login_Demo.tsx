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
    Button as Button_Def,
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    FlatList,
    Alert,
    Dimensions,
    ScrollView,
    NativeScrollEvent,
    NativeSyntheticEvent
} from 'react-native';
import { CONST_SC000 } from "../../common/C000_Const"
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SC000_UPDATE_LOGIN_USER } from "../SC000_BaseComponent/SC000_Action"
import type { SC000_LoginUserInfo } from "../SC000_BaseComponent/SC000_Types"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CONST_SC999_V21 } from "../SC999_Test/SC999_Const"
import { SC999_Style } from "../SC999_Test/SC999_Style"
import { CHANGE_SCREEN } from "./SC410_Action"
import { SC410_S_Context } from "./SC410_Store"
import { SC410_Style } from "./SC410_Style"
import { SC410_V05_ManageHeader } from "./SC410_V05_ManageHeader"

const USERINFO_TSUNE = CONST_SC999_V21.loginUserInfo.tsune
const USERINFO_NABE = CONST_SC999_V21.loginUserInfo.nabe
const USERINFO_GORI = CONST_SC999_V21.loginUserInfo.hide

export const SC410_V08_Login_Demo = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②スクリーンコンテキストを取得する
    const { state, dispatch } = useContext(SC410_S_Context)

    // チャット画面を開くイベントハンドラ関数
    const onClickSwitch_SC999_V22 = () => {
        // newStateを初期化
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC999_V04
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC999)
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    // onChangeイベントハンドラ
    // --------------------------------------------------------------
    // ログインユーザを変更
    const onChangeLoginUser_TSUNE = () => {
        // ユーザを変更
        baseState.loginUserInfo = { ...USERINFO_TSUNE }
        baseDispatch(SC000_UPDATE_LOGIN_USER(baseState.loginUserInfo))
        // チャット画面を表示
        onClickSwitch_SC999_V22()
    }
    const onChangeLoginUser_NABE = () => {
        // ユーザを変更
        baseState.loginUserInfo = { ...USERINFO_NABE }
        baseDispatch(SC000_UPDATE_LOGIN_USER(baseState.loginUserInfo))
        // チャット画面を表示
        onClickSwitch_SC999_V22()
    }
    const onChangeLoginUser_GORI = () => {
        // ユーザを変更
        baseState.loginUserInfo = { ...USERINFO_GORI }
        baseDispatch(SC000_UPDATE_LOGIN_USER(baseState.loginUserInfo))
        // チャット画面を表示
        onClickSwitch_SC999_V22()
    }

    return (
        <>
            <SC410_V05_ManageHeader />
            <View style={SC999_Style.v21_MainArea}>
                <Heading style={{ color: "#fff" }} size="md">ログインユーザ選択</Heading>
                <Divider />
                <Text style={SC999_Style.v21_Font}>Who are you？</Text>
                <Stack mb="2.5%" mt="1.5%" direction={{
                    base: "row",
                    md: "row",
                }} space={2} mx={{
                    base: "auto",
                    md: "0"
                }}>
                    <Button style={SC999_Style.v21_LoginUserChangeBtn} size="sm" variant="outline" colorScheme="secondary" onPress={onChangeLoginUser_TSUNE}>つねかわ</Button>
                    <Button style={SC999_Style.v21_LoginUserChangeBtn} size="sm" variant="outline" colorScheme="secondary" onPress={onChangeLoginUser_NABE}>わたなべ</Button>
                    <Button style={SC999_Style.v21_LoginUserChangeBtn} size="sm" variant="outline" colorScheme="secondary" onPress={onChangeLoginUser_GORI}>煩悩ゴリラ</Button>
                </Stack>
            </View>
        </>
    )
}
