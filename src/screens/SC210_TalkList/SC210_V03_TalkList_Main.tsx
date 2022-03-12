
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
import { dateToString } from "../../common/C050_DateUtil"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CONST_SC000, CONST_SC210 } from "../../common/C000_Const"
import { useState_SC000_LayoutPattern } from "../SC000_BaseComponent/SC000_V01_MainScreen"
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC210_UPDATE_TAlKUSER, SC000_UPDATE_LAYOUTPATTERN } from "../SC000_BaseComponent/SC000_Action"
import { SC210_BaseContext, SC210_TalkUserInfo_Detail } from "../SC000_BaseComponent/SC000_Types"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { UPDATE_CHATSCREEN_PREINFO, CHANGE_SCREEN } from "./SC210_Action"
import { Context_SC210 } from "./SC210_Store"
import { SC210_TalkInfo } from "./SC210_Types"
import { s301_SelectTalkUserList_ByUserId } from "../../service/S301_SelectTalkUserList_ByUserId"
// import { SC000_Img, murata_unko } from "../../common/C000_Const"


const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
}, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
}];

export const SC210_V03_TalkList_Main = (props: object) => {
    console.log("SC210_V01_TalkList:開始")
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②画面コンテキストを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(Context_SC210)

    const getTalkUserInfoList_Detail = async () => {
        // ①Firebaseからデータを取得する
        // const userId = baseState.loginUserInfo.userId
        const userId = "xxx"
        const result_S302 = await s301_SelectTalkUserList_ByUserId(userId)
        const dbObj_talkUserInfoList_Detail = result_S302.talkUserInfoList_Detail
        console.log("dbObj_talkUserInfoList_Detail.length", dbObj_talkUserInfoList_Detail.length)
        // ②データをuserInfoListステートに合わせる
        let new_talkUserInfoList_Detail = dbObj_talkUserInfoList_Detail.map((dbObj_talkUserInfo_Detail) => {
            console.log("talkUserInfo_Detail.userInfo.userName:1")
            // 日付変換
            const date = dbObj_talkUserInfo_Detail.chatUserInfo.LatestLoginDatatime.toDate()
            // トーク名判断
            let talkName = ""
            const talkKbn = String(dbObj_talkUserInfo_Detail.talkInfo.TalkKbn)
            if (talkKbn === "1") {
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
                },
                userInfo: {
                    _0_DocId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                    userId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                    userName: dbObj_talkUserInfo_Detail.chatUserInfo.UserName,
                    latestLoginDatatime: dateToString(date, "MM/DD"),
                    profileImagePath: dbObj_talkUserInfo_Detail.chatUserInfo.ProfileImagePath,
                }
            } as SC210_TalkUserInfo_Detail
            console.log("talkUserInfo_Detail.userInfo.userName:", talkUserInfo_Detail.userInfo.userName)
            return talkUserInfo_Detail
        })
        // ③更新用ステートを定義する
        const newState = {
            baseContext_SC210: {
                talkUserInfoList_Detail: new_talkUserInfoList_Detail
            } as SC210_BaseContext
        }
        // ④ステートを更新する
        baseDispatch(SC210_UPDATE_TAlKUSER(newState))
        console.log("baseContext------------------------------")
        console.log(newState)
        console.log("baseContext------------------------------")
    }

    const updateChatScreenInfoPre = (talkInfo: SC210_TalkInfo) => {
        console.log("updateChatScreenInfoPre:開始")
        // ステートの定義
        const newState = { ...screenState }
        // チャットスクリーンプレ情報を更新
        newState.chatScreenPreInfo.talkId = talkInfo.talkId
        newState.chatScreenPreInfo.talkName = talkInfo.talkName
        newState.chatScreenPreInfo.talkKbn = talkInfo.talkKbn
        // ステートを更新する
        screenDispatch(UPDATE_CHATSCREEN_PREINFO(newState.chatScreenPreInfo))
        console.log("newState.talkId:", newState.chatScreenPreInfo.talkId)
        console.log("updateChatScreenInfoPre:終了")
    }

    const disableMenuBar = () => {
        const newState = { ...baseState }
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC220)
        // メニューバー非表示
        baseDispatch(SC000_UPDATE_LAYOUTPATTERN(newState.screenControllerInfo))
    }

    const goToChat = (talkInfo: SC210_TalkInfo) => {
        console.log("goToChat:開始")
        // ステートの定義
        const newState = { ...screenState }
        // チャットスクリーンプレ情報を更新する
        updateChatScreenInfoPre(talkInfo)
        // 画面遷移情報を更新
        const newScreenControllerInfo = {
            componentId: CONST_SC210.COMPONENT_ID.V04,
            layoutPattern: getLayoutPattern(CONST_SC000.SCREENID.SC220),
        }
        newState.screenControllerInfo.componentId = CONST_SC210.COMPONENT_ID.V04
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC220)
        // // メニューバー非表示
        // useState_SC000_LayoutPattern(CONST_SC000.SCREENID.SC220)
        // チャット画面に遷移する
        screenDispatch(CHANGE_SCREEN(newState.screenControllerInfo))
        console.log("newState.componentId:", newScreenControllerInfo.componentId)
        console.log("goToChat:終了")
    }

    const [updateLayoutPattern] = useState_SC000_LayoutPattern(CONST_SC000.SCREENID.SC220)

    useEffect(() => {
        getTalkUserInfoList_Detail()
    }, [])

    return (
        <>
            <View style={SC000_Style.v00_HeaderArea}>
                <CC0010_ScreenTitle >トーク一覧画面</CC0010_ScreenTitle>
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
                            goToChat(item.talkInfo)
                            updateLayoutPattern()
                            // useState_SC000_LayoutPattern(CONST_SC000.SCREENID.SC220)
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
                                        {String(item.userInfo.latestLoginDatatime)}
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
