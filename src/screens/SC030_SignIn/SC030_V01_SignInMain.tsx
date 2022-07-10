import React, { useState, useMemo, useContext, useEffect } from 'react';
import {
    Select,
    Stack,
    Box,
    Input,
    Button,
    Center,
    CheckIcon,
    Divider,
} from "native-base"
import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
    Alert,
} from 'react-native'
import { SC030_InputUserInfo } from './SC030_Types';
import { s110_CreateUser } from '../../service/S110_CreateUser';
import { SC000_S_Context } from '../SC000_BaseComponent/SC000_Store';
import { s191_SelectUserPrivate_Login } from '../../service/S191_SelectUserPrivate_Login';
import { c010_UaasUtil_isNotEmpty } from '../../common/C010_UaasUtil';
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil';
import { SC000_UPDATE_LOGIN_USER } from '../SC000_BaseComponent/SC000_Action';
import { SC410_S_Context } from '../SC410_Manage/SC410_Store';
import { s140_SelectUser } from '../../service/S140_SelectUser';
import { useState_SC000_ScreenController } from '../SC000_BaseComponent/SC000_V00_BaseComponent';
import { CONST_SC000 } from '../../common/C000_Const';

export const SC030_V01_SignInMain = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②スクリーンコンテキストを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(SC410_S_Context)
    // ③ローカルステートからコンテキストを取得する
    const [localState, setLocalState] = useState<SC030_InputUserInfo>({} as SC030_InputUserInfo);
    // ④カスタムフック取得
    const [updateScreenControllerInfo] = useState_SC000_ScreenController()
    const [{ doLogin, setLoginUserInfo }] = useLogin()
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


    // // ログイン用関数（未検証）
    // // const doLogin = async (userId: string, password: string) => {
    // const onClickLogin = async () => {
    //     // ローカルステートから認証情報を取得する
    //     const userId = localState.userId
    //     const password = localState.password
    //     // 1. ユーザIDとパスワードからログインする
    //     let loginUserId = ""
    //     // ユーザ機密情報を取得する
    //     const result_S191 = await s191_SelectUserPrivate_Login(userId, password)
    //     if (c010_UaasUtil_isNotEmpty(result_S191.userPrivateInfo)) {
    //         loginUserId = result_S191.userPrivateInfo.UserId
    //     }

    //     // 2. 認証可の場合、ユーザ情報を取得してコンテキストに格納する
    //     if (c010_UaasUtil_isNotBlank(loginUserId)) {
    //         // 2.1 ユーザ情報を取得する
    //         const result_SC140 = s140_SelectUser(loginUserId)
    //         const loginUserInfo = (await result_SC140).userInfo
    //         // 2.2.コンテキストに格納する
    //         // 2.2.1.新しいステートを定義する
    //         let newBaseState = { ...baseState }
    //         newBaseState.loginUserInfo.userId = loginUserInfo.UserId
    //         newBaseState.loginUserInfo.userName = loginUserInfo.UserName
    //         newBaseState.loginUserInfo.comment = loginUserInfo.Comment
    //         newBaseState.loginUserInfo.LatestLoginDatetime = loginUserInfo.LatestLoginDatetime.toDate()
    //         newBaseState.loginUserInfo.profileImagePath = loginUserInfo.ProfileImagePath
    //         newBaseState.loginUserInfo.genderCd = loginUserInfo.GenderCd
    //         newBaseState.loginUserInfo.age = loginUserInfo.Age
    //         newBaseState.loginUserInfo.areaCd = loginUserInfo.AreaCd
    //         newBaseState.loginUserInfo.hashtag = loginUserInfo.Hashtags
    //         // 2.2.2.dispatchする
    //         baseDispatch(SC000_UPDATE_LOGIN_USER(newBaseState.loginUserInfo))
    //         // テスト用
    //         //ダイアログ
    //         Alert.alert("成功",
    //             "ログイン処理に成功しました。",
    //             [{
    //                 text: 'OK', onPress: () => {
    //                     updateScreenControllerInfo(CONST_SC000.SCREENINFO.SC110)
    //                 }
    //             }]
    //         )
    //     } else {
    //         //ダイアログ
    //         Alert.alert("エラー",
    //             "ログイン処理に失敗しました。",
    //             [{ text: 'OK', onPress: () => { } }]
    //         )
    //     }
    // }
    // // onChangeイベントハンドラ
    // // --------------------------------------------------------------
    // ログイン用関数（未検証）
    // const doLogin = async (userId: string, password: string) => {
    const onClickLogin = async () => {
        // ローカルステートから認証情報を取得する
        const userId = localState.userId
        const password = localState.password
        // 1. ユーザIDとパスワードからログインする
        const loginUserId = await doLogin(userId, password)

        // 2. 認証可の場合、ユーザ情報を取得してコンテキストに格納する
        if (c010_UaasUtil_isNotBlank(loginUserId)) {
            // 2.1 ユーザ情報を取得する
            await setLoginUserInfo(loginUserId)
            // テスト用
            //ダイアログ
            Alert.alert("成功",
                "ログイン処理に成功しました。",
                [{
                    text: 'OK', onPress: () => {
                        updateScreenControllerInfo(CONST_SC000.SCREENINFO.SC110)
                    }
                }]
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
    const onChangeLoginState_DAHYUN = () => {
        // ユーザID・パスワードを指定し、ステートを更新する
        const newLocalState = { ...localState, userId: "DAHYUN", password: "DAHYUN" }
        setLocalState(newLocalState)
    }
    const onChangeLoginUser_DAHYUN = async () => {
        // ユーザID・パスワードを指定し、ステートを更新する
        onChangeLoginState_DAHYUN()
        // ログイン処理を実行する
        await onClickLogin()
    }

    return (
        <>
            <View>

                {/* ダヒョン */}
                <Stack mb="2.5%" mt="1.5%" direction={{
                    base: "row",
                    md: "row",
                }} space={2} mx={{
                    base: "auto",
                    md: "0"
                }}>
                    <Button size="sm" variant="outline" colorScheme="secondary" onPress={onChangeLoginUser_DAHYUN}>ダヒョン</Button>
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
                        color="black"
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
                        color="black"
                        value={localState.password}
                        onChangeText={(value) => { onChangePassword(value) }} />
                </Stack>
                <Button size="sm" variant="outline" colorScheme="secondary" onPress={onClickLogin}>ログイン</Button>
            </View>
        </>
    )
}


export const useLogin = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ログイン処理
    const doLogin = async (userId: string, password: string) => {
        // 1. ユーザIDとパスワードからログインする
        let loginUserId = ""
        // ユーザ機密情報を取得する
        const result_S191 = await s191_SelectUserPrivate_Login(userId, password)
        if (c010_UaasUtil_isNotEmpty(result_S191.userPrivateInfo)) {
            loginUserId = result_S191.userPrivateInfo.UserId
        }
        return loginUserId
    }

    const setLoginUserInfo = async (loginUserId: string) => {
        // const setLoginUserInfo:(loginUserId: string) => Promise<string> = async (loginUserId) => {
        // 2.1 ユーザ情報を取得する
        const result_SC140 = await s140_SelectUser(loginUserId)
        const loginUserInfo = result_SC140.userInfo
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
    }

    return [{ doLogin, setLoginUserInfo }]
}