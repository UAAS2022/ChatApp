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
import { SC120_Style } from "./SC120_Style"
import type { SC120_Context, SC120_UserProfileInfo, } from './SC120_Types'
import { CONST_SC999_V20 } from "../SC999_Test/SC999_Const"
import { c010_UaasUtil_isNotBlank, c010_UaasUtil_isNotEmpty } from '../../common/C010_UaasUtil'
import { UPDATE_USERPROFILE } from "./SC120_Action"
import { Context_SC120 } from "./SC120_Store"
import { s140_SelectUser } from "../../service/S140_SelectUser"

// 業務エラーチェッククラス
const check = (chatMessageInfo: SC120_UserProfileInfo): boolean => {
    let errFlg = true
    // console.log("checkchatMessageInfo", chatMessageInfo)
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
const USERID = "xxx"

export const SC120_V01_UserProfile_Main = (props: any) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②ScreenContextを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(Context_SC120)
    // ③ローカルステートを定義する

    // ④propsからデータを取得する
    const { userId } = props

    // ユーザプロフィール情報取得イベントハンドラ
    const getUserProfileInfo = async () => {
        // ①Firebaseからデータを取得する
        const result_S140 = await s140_SelectUser(userId)
        // ②データをuserInfoListステートに合わせる
        const userProfileInfo = {
            userId: result_S140.userInfo.UserId,
            userName: result_S140.userInfo.UserName,
            comment: result_S140.userInfo.Comment,
            latestLoginDatatime: dateToString(result_S140.userInfo.LatestLoginDatatime.toDate(), "MM/DD"),
            profileImagePath: result_S140.userInfo.ProfileImagePath,
            genderCd: result_S140.userInfo.GenderCd,
            age: result_S140.userInfo.Age,
            areaCd: result_S140.userInfo.AreaCd,
            hashtag: result_S140.userInfo.Hashtags,
        } as SC120_UserProfileInfo
        // ③ステートを更新する
        screenDispatch(UPDATE_USERPROFILE(userProfileInfo))

    }

    // 初期表示処理-------------------------------------------------------------
    //
    useEffect(() => {
        // getChatMessageList()
        getUserProfileInfo()
    }, []);
    // -----------------------------------------------------------------------

    return (
        <>
            <Center w="100%" h="50%"  >
                <Image source={require("../../static/img" + "/murata_unko.jpeg")} style={SC120_Style.v06_Profile} />
            </Center>
            <View>
                <Text>{screenState.userProfileInfo.userName}</Text>
                <Text>{screenState.userProfileInfo.genderCd}</Text>
                <Text>{screenState.userProfileInfo.areaCd}</Text>
                <Text>{screenState.userProfileInfo.latestLoginDatatime}</Text>
                <Text>{screenState.userProfileInfo.comment}</Text>
            </View>
        </>
    )
}
