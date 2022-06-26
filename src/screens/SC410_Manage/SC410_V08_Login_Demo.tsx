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
    Input,
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
import { dateToString } from "../../common/C050_DateUtil"
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
import { s140_SelectUser } from "../../service/S140_SelectUser"
import { s191_SelectUserPrivate_Login } from "../../service/S191_SelectUserPrivate_Login"
import {
    c010_UaasUtil_isNotEmpty,
    c010_UaasUtil_isNotBlank,
} from "../../common/C010_UaasUtil"
import { SC030_InputUserInfo } from "../SC030_SignIn/SC030_Types"
import { SC030_Style } from "../SC030_SignIn/SC030_Style"

const USERINFO_TSUNE = CONST_SC999_V21.loginUserInfo.tsune
const USERINFO_NABE = CONST_SC999_V21.loginUserInfo.nabe
const USERINFO_GORI = CONST_SC999_V21.loginUserInfo.hide

export const SC410_V08_Login_Demo = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②スクリーンコンテキストを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(SC410_S_Context)
    // ③ローカルステートからコンテキストを取得する
    const [localState, setLocalState] = useState<SC030_InputUserInfo>({} as SC030_InputUserInfo);

    // チャット画面を開くイベントハンドラ関数
    const onClickSwitch_SC999_V22 = () => {
        // newStateを初期化
        let newState = { ...screenState }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENINFO.SC999_V04.SCREENID
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENINFO.SC999.SCREENID)
        screenDispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }

    // ログイン情報の入力イベントハンドラ-------------------------------------------------------
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newLocalState = { ...localState, userId: value }
        setLocalState(newLocalState)

    }
    //パスワード
    const onChangePassword = (value: string) => {
        const newLocalState = { ...localState, password: value }
        setLocalState(newLocalState)
    }
    // -------------------------------------------------------------------------------------


    // ログイン用関数（未検証）
    // const doLogin = async (userId: string, password: string) => {
    const doLogin = async () => {
        // ローカルステートから認証情報を取得する
        const userId = localState.userId
        const password = localState.password
        // 1. ユーザIDとパスワードからログインする
        let loginUserId = ""
        // ユーザ機密情報を取得する
        const result_S191 = await s191_SelectUserPrivate_Login(userId, password)
        if (c010_UaasUtil_isNotEmpty(result_S191.userPrivateInfo)) {
            loginUserId = result_S191.userPrivateInfo.UserId
        }

        // 2. 認証可の場合、ユーザ情報を取得してコンテキストに格納する
        if (c010_UaasUtil_isNotBlank(loginUserId)) {
            // 2.1 ユーザ情報を取得する
            const result_SC140 = s140_SelectUser(loginUserId)
            const loginUserInfo = (await result_SC140).userInfo
            // 2.2.コンテキストに格納する
            // 2.2.1.新しいステートを定義する
            let newBaseState = { ...baseState }
            newBaseState.loginUserInfo.userId = loginUserInfo.UserId
            newBaseState.loginUserInfo.userName = loginUserInfo.UserName
            newBaseState.loginUserInfo.comment = loginUserInfo.Comment
            newBaseState.loginUserInfo.LatestLoginDatetime = loginUserInfo.LatestLoginDatetime.toDate()
            newBaseState.loginUserInfo.profileImagePath = loginUserInfo.ProfileImagePath
            newBaseState.loginUserInfo.genderCd = loginUserInfo.GenderCd
            newBaseState.loginUserInfo.age = loginUserInfo.Age
            newBaseState.loginUserInfo.areaCd = loginUserInfo.AreaCd
            newBaseState.loginUserInfo.hashtag = loginUserInfo.Hashtags
            // 2.2.2.dispatchする
            baseDispatch(SC000_UPDATE_LOGIN_USER(newBaseState.loginUserInfo))
            // テスト用
            //ダイアログ
            Alert.alert("成功",
                "ログイン処理に成功しました。",
                [{ text: 'OK', onPress: () => { } }]
            )
        } else {
            //ダイアログ
            Alert.alert("エラー",
                "ログイン処理に失敗しました。",
                [{ text: 'OK', onPress: () => { } }]
            )
        }

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

    const onChangeLoginState_DAHYUN = () => {
        // ユーザID・パスワードを指定し、ステートを更新する
        const newLocalState = { ...localState, userId: "DAHYUN", password: "DAHYUN" }
        setLocalState(newLocalState)
    }
    const onChangeLoginUser_DAHYUN = () => {
        // ユーザID・パスワードを指定し、ステートを更新する
        onChangeLoginState_DAHYUN()
        // ログイン処理を実行する
        doLogin()
    }

    return (
        <>
            <SC410_V05_ManageHeader />
            <View style={SC999_Style.v21_MainArea}>
                <Heading style={{ color: "#fff" }} size="md">ログインユーザ選択</Heading>
                <Divider />
                <Text style={SC999_Style.v21_Font}>Who are you？</Text>
                {/* つね　なべ　ごり */}
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

                {/* ダヒョン */}
                <Stack mb="2.5%" mt="1.5%" direction={{
                    base: "row",
                    md: "row",
                }} space={2} mx={{
                    base: "auto",
                    md: "0"
                }}>
                    <Button style={SC999_Style.v21_LoginUserChangeBtn} size="sm" variant="outline" colorScheme="secondary" onPress={onChangeLoginUser_DAHYUN}>ダヒョン</Button>
                </Stack>

                {/* ログインフォーム */}
                <Box alignSelf="flex-start" bg="primary.500" _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg"
                }}>
                    ユーザID
                </Box>
                <Stack space={0} w="100%" alignItems="flex-start">
                    <Input w={{
                        base: "75%",
                        md: "25%",
                    }}
                        color="white"
                        placeholder="ユーザーID" value={localState.userId}
                        onChangeText={(value) => { onChangeUserId(value) }} />
                    <Box alignSelf="flex-start" bg="primary.500" _text={{
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "warmGray.50",
                        letterSpacing: "lg"
                    }}>
                        パスワード
                    </Box>
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="パスワード"
                        color="white"
                        value={localState.password}
                        onChangeText={(value) => { onChangePassword(value) }} />
                </Stack>
                <Button style={SC999_Style.v21_LoginUserChangeBtn} size="sm" variant="outline" colorScheme="secondary" onPress={doLogin}>ログイン</Button>


                {/* <Stack space={4} w="100%" alignItems="center">
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="Name" />
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="Password" />
                </Stack>; */}
                {/* <Stack space={4} w="100%" alignItems="center">
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Name" />
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} InputRightElement={<Icon as={<MaterialIcons name="visibility-off" />} size={5} mr="2" color="muted.400" />} placeholder="Password" />
                </Stack>; */}
            </View>
        </>
    )
}
