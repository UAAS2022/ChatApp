// View

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
    Box,
    HStack,
    Avatar,
    VStack,
    Text,
    Spacer,
    SectionList,
} from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    // Text,
    // Button,
    FlatList,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import { CONST_SC000 } from "../../common/C000_Const"
import { SC000_CHANGE_SCREEN } from "../SC000_BaseComponent/SC000_Action"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { CHANGE_SCREEN } from "./SC410_Action"
import { SC410_S_Context } from "./SC410_Store"
import { SC410_Style } from "./SC410_Style"


const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V04_SectionList = (props: object) => {
    // A:ベースコンテキストで表示切り替え情報を管理した場合------------------------------------------------------------
    // ベースコンテキストを呼び出す
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // [reset]ボタンタップ時のイベントハンドラ関数
    const onClickSwitch_SC998_BA = () => {
        // newStateを初期化
        let newState = { ...baseState }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC998
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC998)
        baseDispatch(SC000_CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitch_SC999_BA = () => {
        // newStateを初期化
        let newState = { ...baseState }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC999
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC999)
        baseDispatch(SC000_CHANGE_SCREEN(newState.screenControllerInfo))
    }
    // ---------------------------------------------------------------------------------------------------------

    // B:スクリーンコンテキストで表示切り替え情報を管理した場合----------------------------------------------------------
    // スクリーンコンテキストを呼び出す
    const { state, dispatch } = useContext(SC410_S_Context)
    // [reset]ボタンタップ時のイベントハンドラ関数
    const onClickSwitch_SC998_SC = () => {
        // newStateを初期化
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC998
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC998)
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitch_SC999_SC = () => {
        // newStateを初期化
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC999
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC999)
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitch_SC999_V21 = () => {
        // newStateを初期化
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC999_V21
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC999)
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    // ---------------------------------------------------------------------------------------------------------

    return (
        <>
            <ScrollView>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} >プロフィール</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} onPress={onClickSwitch_SC998_BA} >①なべ画面へ(baseContext使用)</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} onPress={onClickSwitch_SC999_BA} >①テスト画面へ(baseContext使用)</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} onPress={onClickSwitch_SC998_SC} >②なべ画面へ(画面Context使用)</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} onPress={onClickSwitch_SC999_SC} >②テスト画面へ(画面Context使用)</Button>
                <Button h="16" w="98%" margin="0.5%" bg={"violet.100"} ><>↑①と②で状態が保存されるか否かの違いがある。</><>②のが操作性良さそう。</></Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} onPress={onClickSwitch_SC999_V21} >煩悩まみれのスーパー強欲獅子児チャット</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="12" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
            </ScrollView>
        </>


    )
}
