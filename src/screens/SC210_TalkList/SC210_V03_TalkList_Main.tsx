
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
    TouchableOpacity,
} from 'react-native';
import { dateToString_Zero } from "../../common/C050_DateUtil"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CONST_SC000, CONST_SC210 } from "../../common/C000_Const"
import { useState_SC000_LayoutPattern, useState_SC000_ScreenController } from "../SC000_BaseComponent/SC000_V00_BaseComponent"
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC210_UPDATE_TAlKUSER, SC000_UPDATE_LAYOUTPATTERN, SC000_CHANGE_SCREEN } from "../SC000_BaseComponent/SC000_Action"
import { SC210_BaseContext, SC210_TalkUserInfo_Detail } from "../SC000_BaseComponent/SC000_Types"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { UPDATE_CHATSCREEN_PREINFO, CHANGE_SCREEN } from "./SC210_Action"
import { Context_SC210 } from "./SC210_Store"
import { SC210_TalkInfo } from "./SC210_Types"
import { s303_SelectTalkUserList_ByUserId_Detail } from "../../service/S303_SelectTalkUserList_ByUserId_Detail"
import { s304_SelectTalkUserList_ByUserId_Detail_RealTime } from '../../service/S304_SelectTalkUserList_ByUserId_Detail_RealTime';

export const SC210_V03_TalkList_Main = (props: object) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②画面コンテキストを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(Context_SC210)
    // ④カスタムフック呼び出し
    // const [updateLayoutPattern] = useState_SC000_LayoutPattern(CONST_SC000.SCREENINFO.SC210)
    const [updateScreenControllerInfo] = useState_SC000_ScreenController()

    // サブスクリプションを設定し、ユーザ情報詳細リストをリアルタイム更新する関数
    const getTalkUserInfoList_Detail_Subsc = async () => {
        const userId = baseState.loginUserInfo.userId
        s304_SelectTalkUserList_ByUserId_Detail_RealTime(
            userId,
            baseDispatch,
        )
    }

    // Firebaseからデータを取得する関数
    const getTalkUserInfoList_Detail = async () => {
        // ①Firebaseからデータを取得する
        const userId = baseState.loginUserInfo.userId
        const result_S303 = await s303_SelectTalkUserList_ByUserId_Detail(userId)
        const dbObj_talkUserInfoList_Detail = result_S303.talkUserInfoList_Detail
        // ②データをuserInfoListステートに合わせる
        let new_talkUserInfoList_Detail = dbObj_talkUserInfoList_Detail.map((dbObj_talkUserInfo_Detail) => {
            // 日付変換
            const latestMessageDateTime = dbObj_talkUserInfo_Detail.talkInfo.LatestMessageDateTime.toDate()
            const latestLoginDatetime = dbObj_talkUserInfo_Detail.chatUserInfo.LatestLoginDatetime.toDate()
            // トーク名判断
            let talkName = ""
            const talkKbn = String(dbObj_talkUserInfo_Detail.talkInfo.TalkKbn)
            if (talkKbn === "1") {
                // ユーザとの1対1チャットの場合、ユーザ名を入れる
                talkName = dbObj_talkUserInfo_Detail.chatUserInfo.UserName
            }
            if (talkKbn === "2") {
                // グループチャットの場合、T110_トークのトーク名を入れる
                talkName = dbObj_talkUserInfo_Detail.talkInfo.TalkName
            } else {
                // ユーザとの1対1チャットの場合、ユーザ名を入れる
                talkName = dbObj_talkUserInfo_Detail.chatUserInfo.UserName
            }
            const talkUserInfo_Detail = {
                talkInfo: {
                    talkId: dbObj_talkUserInfo_Detail.talkUserInfo.TalkId,
                    talkName: talkName,
                    talkKbn: talkKbn,
                    latestMessageDateTime: dateToString_Zero(latestMessageDateTime, "MM/DD hh:mm"),
                },
                userInfo: {
                    _0_DocId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                    userId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                    userName: dbObj_talkUserInfo_Detail.chatUserInfo.UserName,
                    latestLoginDatetime: dateToString_Zero(latestLoginDatetime, "MM/DD"),
                    profileImagePath: dbObj_talkUserInfo_Detail.chatUserInfo.ProfileImagePath,
                }
            } as SC210_TalkUserInfo_Detail
            return talkUserInfo_Detail
        })
        // 最新メッセージ送信日時でソートする
        new_talkUserInfoList_Detail = new_talkUserInfoList_Detail.sort(
            (n1, n2) => {
                let val = 0
                if (n1.talkInfo.latestMessageDateTime > n2.talkInfo.latestMessageDateTime) {
                    val = -1;
                }
                if (n1.talkInfo.latestMessageDateTime < n2.talkInfo.latestMessageDateTime) {
                    return val = 1;
                }
                return val;
            }
        )

        // ③更新用ステートを定義する
        const newState = {
            baseContext_SC210: {
                talkUserInfoList_Detail: new_talkUserInfoList_Detail
            } as SC210_BaseContext
        }
        // ④ステートを更新する
        baseDispatch(SC210_UPDATE_TAlKUSER(newState))
    }

    const updateChatScreenInfoPre = (talkInfo: SC210_TalkInfo) => {
        // ステートの定義
        const newState = { ...screenState }
        // チャットスクリーンプレ情報を更新
        newState.chatScreenPreInfo.talkId = talkInfo.talkId
        newState.chatScreenPreInfo.talkName = talkInfo.talkName
        newState.chatScreenPreInfo.talkKbn = talkInfo.talkKbn
        // ステートを更新する
        screenDispatch(UPDATE_CHATSCREEN_PREINFO(newState.chatScreenPreInfo))
    }

    const disableMenuBar = () => {
        const newState = { ...baseState }
        // newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENINFO.SC220)
        // メニューバー非表示
        baseDispatch(SC000_UPDATE_LAYOUTPATTERN(newState.screenControllerInfo))
    }

    const goToSC220 = (talkInfo: SC210_TalkInfo) => {
        //console.log("goToChat:開始")
        // ステートの定義
        const newState = { ...screenState }
        // チャットスクリーンプレ情報を更新する
        updateChatScreenInfoPre(talkInfo)
        // 画面遷移情報を更新
        const newScreenControllerInfo = {
            componentId: CONST_SC210.COMPONENT_ID.V04,
            layoutPattern: getLayoutPattern(CONST_SC000.SCREENINFO.SC220.SCREENID),
        }
        newState.screenControllerInfo.componentId = CONST_SC210.COMPONENT_ID.V04
        // newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENINFO.SC220)
        // // メニューバー非表示
        // useState_SC000_LayoutPattern(CONST_SC000.SCREENINFO.SC220)
        // トーク画面の内容をチャット画面に切り替える
        screenDispatch(CHANGE_SCREEN(newState.screenControllerInfo))

        // BaseComponentの画面IDを更新する
        updateScreenControllerInfo(CONST_SC000.SCREENINFO.SC220)
        //console.log("newState.componentId:", newScreenControllerInfo.componentId)
        //console.log("goToChat:終了")
    }
    //console.log("SC210_V03_TalkList_Main:baseState.screenControllerInfo", baseState.screenControllerInfo)

    useEffect(() => {
        // getTalkUserInfoList_Detail()    //テスト用の一時処理
        getTalkUserInfoList_Detail_Subsc()
    }, [])

    return (
        <>
            <View style={SC000_Style.v00_HeaderArea}>
                <CC0010_ScreenTitle >トーク一覧画面⇦ここも広告に</CC0010_ScreenTitle>
            </View>
            {/* <Button onPress={getTalkUserInfoList_Detail}>更新</Button>
            <Divider />
            <FlatList
                data={screenState.talkUserInfoList_Detail}
                inverted={false}
                renderItem={({ item }: { item: SC210_TalkUserInfo_Detail }) => (
                    <>
                        <View>
                            <Text>{item.userInfo.userName}</Text>
                            <Divider />
                        </View>
                    </>
                )}
                keyExtractor={(_, index) => index.toString()}
            /> */}
            {/* ------------------------------------------------------------------------------------------ */}
            <Heading fontSize="xl" p="4" pb="3">
                誰とチャットする？
            </Heading>
            {/* <ScrollView > */}
            <FlatList data={baseState.baseContext_SC210.talkUserInfoList_Detail}
                renderItem={({ item }) =>
                (
                    <>
                        <TouchableOpacity onPress={() => {
                            goToSC220(item.talkInfo)
                            // updateLayoutPattern()
                            // useState_SC000_LayoutPattern(CONST_SC000.SCREENINFO.SC220)
                        }}>
                            <Box borderBottomWidth="1"
                                _dark={{ borderColor: "gray.600" }}
                                borderColor="coolGray.200"
                                pl="4" pr="5" py="2">
                                <HStack space={3} justifyContent="space-between">
                                    {/* <Avatar size="48px" source={{
                                    uri: item.userInfo.profileImagePath
                                }} /> */}
                                    <VStack>
                                        <Text _dark={{
                                            color: "warmGray.50"
                                        }} color="coolGray.800" bold>
                                            {item.talkInfo.talkName}
                                        </Text>
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                            {item.talkInfo.talkId}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                    <Text fontSize="xs"
                                        _dark={{
                                            color: "warmGray.50"
                                        }}
                                        color="coolGray.800"
                                        alignSelf="flex-start">
                                        {String(item.talkInfo.latestMessageDateTime).slice(0, -3)}
                                    </Text>
                                </HStack>
                            </Box>
                        </TouchableOpacity>
                    </>
                )
                } keyExtractor={item => item.talkInfo.talkId} />
            {/* </ScrollView> */}
        </>
    )
}
