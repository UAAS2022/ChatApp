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
    NativeSyntheticEvent,
    Image,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { dateToString } from "../../common/C050_DateUtil"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { CONST_SC000 } from "../../common/C000_Const"
import { c060_DebugLog } from "../../common/C060_LogUtil"
import { useState_SC000_ScreenController } from "../SC000_BaseComponent/SC000_V00_BaseComponent"
import { SC120_Style } from "./SC120_Style"
import type { SC120_Context, SC120_UserProfileInfo, } from './SC120_Types'
import { CONST_SC999_V20 } from "../SC999_Test/SC999_Const"
import { c010_isCreatedTalkUser_T101 } from '../../common/C010_UaasUtil'
import { UPDATE_USERPROFILE } from "./SC120_Action"
import { Context_SC120 } from "./SC120_Store"
import { s140_SelectUser } from "../../service/S140_SelectUser"
import { s210_CreateTalk } from "../../service/S210_CreateTalk"
import { s260_CreateTalkUser } from "../../service/S260_CreateTalkUser"
import { s301_SelectTalkUserList_ByUserId } from "../../service/S301_SelectTalkUserList_ByUserId"
import { s303_SelectTalkUserList_ByUserId_Detail } from "../../service/S303_SelectTalkUserList_ByUserId_Detail"

const SCREEN_ID = "SC120"

// 業務エラーチェッククラス
const check = (chatMessageInfo: SC120_UserProfileInfo): boolean => {
    let errFlg = true
    // //console.log("checkchatMessageInfo", chatMessageInfo)
    // if (!c010_UaasUtil_isNotBlank(chatMessageInfo.talkId)) {
    //     Alert.alert('エラー', 'トークIDを入力してください。')
    //     errFlg = false
    // }
    // if (!c010_UaasUtil_isNotBlank(chatMessageInfo.sendUserId)) {
    //     Alert.alert('エラー', '送信ユーザIDを入力してください。')
    //     errFlg = false
    // }
    return errFlg
}

const TALKID = CONST_SC999_V20.talkId
const LOGINUSERID = "xxx"

export const SC120_V01_UserProfile_Main = (props: any) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②ScreenContextを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(Context_SC120)
    // ③ローカルステートを定義する
    const [localState_UserProfileInfo, setlocalState_UserProfileInfo] = useState<SC120_UserProfileInfo>({} as SC120_UserProfileInfo);
    // ④propsからデータを取得する
    const { userId } = props
    // ⑤ベースコンテキストからログインユーザIDを取得する
    const loginUserInfo = {
        _0_DocId: LOGINUSERID,
        userId: LOGINUSERID,
        userName: "ごりごり",
    }
    const loginUserId = loginUserInfo.userId
    // const loginUserId = baseState.loginUserInfo.userId
    // ⑥ベースコンテキストのHookから情報を取得する
    const [updateBaseScreenId] = useState_SC000_ScreenController()


    // ユーザプロフィール情報取得イベントハンドラ
    const getUserProfileInfo_bk = async () => {
        // ①Firebaseからデータを取得する
        const result_S140 = await s140_SelectUser(userId)
        // ②データをuserInfoListステートに合わせる
        const newState = { ...screenState }
        newState.userProfileInfo.userId = result_S140.userInfo.UserId
        newState.userProfileInfo.userName = result_S140.userInfo.UserName
        newState.userProfileInfo.comment = result_S140.userInfo.Comment
        newState.userProfileInfo.latestLoginDatatime = dateToString(result_S140.userInfo.LatestLoginDatatime.toDate(), "MM/DD")
        newState.userProfileInfo.profileImagePath = result_S140.userInfo.ProfileImagePath
        newState.userProfileInfo.genderCd = result_S140.userInfo.GenderCd
        newState.userProfileInfo.age = result_S140.userInfo.Age
        newState.userProfileInfo.areaCd = result_S140.userInfo.AreaCd
        newState.userProfileInfo.hashtag = result_S140.userInfo.Hashtags
        // ③ステートを更新する
        screenDispatch(UPDATE_USERPROFILE(newState.userProfileInfo))
    }

    // ユーザプロフィール情報取得イベントハンドラ2
    const getUserProfileInfo = async () => {
        // ①Firebaseからデータを取得する
        const result_S140 = await s140_SelectUser(userId)
        // ②データをuserInfoListステートに合わせる
        const newState = { ...localState_UserProfileInfo }
        newState.userId = result_S140.userInfo.UserId
        newState.userName = result_S140.userInfo.UserName
        newState.comment = result_S140.userInfo.Comment
        newState.latestLoginDatatime = dateToString(result_S140.userInfo.LatestLoginDatatime.toDate(), "MM/DD hh:mm")
        newState.profileImagePath = result_S140.userInfo.ProfileImagePath
        newState.genderCd = result_S140.userInfo.GenderCd
        newState.age = result_S140.userInfo.Age
        newState.areaCd = result_S140.userInfo.AreaCd
        newState.hashtag = result_S140.userInfo.Hashtags
        // ③ステートを更新する
        setlocalState_UserProfileInfo(newState)
    }

    const onClickStartChat = async () => {
        c060_DebugLog(SCREEN_ID, "START", [], "onClickStartChat")
        // 1. Firebaseにデータを登録する
        // すでに登録済みかどうかをチェックし、未登録の場合のみ登録する。
        // const result_S301 = await s301_SelectTalkUserList_ByUserId(loginUserId)
        const result_S303 = await s303_SelectTalkUserList_ByUserId_Detail(loginUserId)
        const talkUserInfoList_Detail = result_S303.talkUserInfoList_Detail
        if (!c010_isCreatedTalkUser_T101(talkUserInfoList_Detail, userId)) {
            await createTalkInfo()
        }
        // 2. 画面遷移する
        gotoSC210()
    }

    // 1. Firebaseにデータを登録する
    const createTalkInfo = async () => {
        c060_DebugLog(SCREEN_ID, "START", [], "createTalkInfo")
        // 1. トーク情報を登録する
        const result_S210 = await s210_CreateTalk("", "1", loginUserId)
        // 2. トークユーザ情報を登録する
        const talkId = result_S210.returnInfo.talkId
        // 2.1. 自分の情報を登録する
        // await s260_CreateTalkUser(talkId, loginUserId, loginUserId)
        await s260_CreateTalkUser(talkId, loginUserId, loginUserId)
        // 2.2. 相手の情報を登録する
        // await s260_CreateTalkUser(talkId, userId, loginUserId)
        await s260_CreateTalkUser(talkId, userId, loginUserId)
    }

    // 2. 画面遷移する
    const gotoSC210 = () => {
        c060_DebugLog(SCREEN_ID, "START", [], "gotoSC210")
        // 2.1.画面IDを更新する
        // BaseComponentの画面IDを更新する
        updateBaseScreenId(CONST_SC000.SCREENID.SC210)
    }


    // 初期表示処理-------------------------------------------------------------
    //
    useEffect(() => {
        getUserProfileInfo()
        // getUserProfileInfo_bk()
    }, []);
    // -----------------------------------------------------------------------

    return (
        <>
            {/* <Center w="100%" h="50%"  >
                <Image style={SC120_Style.v06_Profile} source={{
                    uri: screenState.userProfileInfo.profileImagePath
                }} />
            </Center>
            <View>
                <Text>名前：{screenState.userProfileInfo.userName}</Text>
                <Text>性別：{screenState.userProfileInfo.genderCd}</Text>
                <Text>地域：{screenState.userProfileInfo.areaCd}</Text>
                <Text>最終ログイン日時：{screenState.userProfileInfo.latestLoginDatatime}</Text>
                <Text>コメント：{screenState.userProfileInfo.comment}</Text>
            </View>
            <Divider /> */}
            <Center w="100%" h="50%"  >
                <Image style={SC120_Style.v06_Profile} source={{
                    uri: localState_UserProfileInfo.profileImagePath
                }} />
            </Center>
            <View>
                <Text>名前：{localState_UserProfileInfo.userName}</Text>
                <Text>性別：{localState_UserProfileInfo.genderCd}</Text>
                <Text>地域：{localState_UserProfileInfo.areaCd}</Text>
                <Text>最終ログイン日時：{localState_UserProfileInfo.latestLoginDatatime}</Text>
                <Text>コメント：{localState_UserProfileInfo.comment}</Text>
            </View>
            <Button size="sm" style={SC120_Style.regularBtn} onPress={() => { onClickStartChat() }}>チャットを始める</Button>
        </>
    )
}
