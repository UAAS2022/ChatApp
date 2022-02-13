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
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SC000_UPDATE_LOGIN_USER } from "../SC000_BaseComponent/SC000_Action"
import type { SC000_LoginUserInfo } from "../SC000_BaseComponent/SC000_Types"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { CONST_SC999_V21 } from "../SC999_Test/SC999_Const"
import { SC999_Style } from "./SC999_Style"
import type { SC999_ChatMessageInfo } from './SC999_Types'
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s310_CreateChatMessage } from "../../service/S310_CreateChatMessage"
import { UPDATE_V19 } from './SC999_Action'
import { SC999_S_Context } from "./SC999_Store"
import { s351_SelectChatMessage_New } from "../../service/S351_SelectChatMessage_New"
import { SC410_Style } from '../SC410_Manage/SC410_Style';

const USERINFO_TSUNE = CONST_SC999_V21.loginUserInfo.tsune
const USERINFO_NABE = CONST_SC999_V21.loginUserInfo.nabe

export const SC999_V21_Login_Demo = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)

    // onChangeイベントハンドラ
    // --------------------------------------------------------------
    // ログインユーザを変更
    const onChangeLoginUser_TSUNE = () => {
        baseState.loginUserInfo = { ...USERINFO_TSUNE }
        baseDispatch(SC000_UPDATE_LOGIN_USER(baseState.loginUserInfo))
    }
    const onChangeLoginUser_NABE = () => {
        baseState.loginUserInfo = { ...USERINFO_NABE }
        baseDispatch(SC000_UPDATE_LOGIN_USER(baseState.loginUserInfo))
    }

    return (
        <>
            <View style={SC999_Style.v21_MainArea}>
                <Heading style={{ color: "#fff" }} size="md">ログインユーザ選択</Heading>
                <Divider />
                <Text style={SC999_Style.v21_Font}>あなたはどっち？</Text>
                <Stack mb="2.5%" mt="1.5%" direction={{
                    base: "row",
                    md: "row",
                }} space={2} mx={{
                    base: "auto",
                    md: "0"
                }}>
                    <Button style={SC999_Style.v21_LoginUserChangeBtn} size="sm" variant="outline" colorScheme="secondary" onPress={onChangeLoginUser_TSUNE}>つねかわ</Button>
                    <Button style={SC999_Style.v21_LoginUserChangeBtn} size="sm" variant="outline" colorScheme="secondary" onPress={onChangeLoginUser_NABE}>わたなべ</Button>
                </Stack>
            </View>
        </>
    )
}
