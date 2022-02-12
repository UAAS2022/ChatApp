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
import { SC410_Style } from "./SC410_Style"
// import { SC000_Img, murata_unko } from "../../common/C000_Const"


const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V02_SectionList = (props: object) => {
    // ベースコンテキストを呼び出す
    const { state, dispatch } = useContext(SC000_S_Context)
    // [reset]ボタンタップ時のイベントハンドラ関数
    const onClickSwitch_SC998 = () => {
        // newStateを初期化
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC998
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC998)
        dispatch(SC000_CHANGE_SCREEN(newState.screenControllerInfo))
    }
    const onClickSwitch_SC999 = () => {
        // newStateを初期化
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENID.SC999
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC999)
        dispatch(SC000_CHANGE_SCREEN(newState.screenControllerInfo))
    }
    return (
        <>
            <ScrollView>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} >プロフィール</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} onPress={onClickSwitch_SC998} >なべ画面へ</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} onPress={onClickSwitch_SC999} >テスト画面へ</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>
                <Button h="20" w="98%" margin="0.5%" bg={"violet.100"} >ダミー</Button>


            </ScrollView>
        </>


    )
}
