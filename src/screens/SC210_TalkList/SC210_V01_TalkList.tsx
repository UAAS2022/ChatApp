
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
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { UPDATE_TALKLIST } from "./SC210_Action"
import { Context_SC210 } from "./SC210_Store"
import { SC210_TalkUserInfo_Detail } from "./SC210_Types"
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

export const SC210_V01_TalkList = (props: object) => {
    console.log("SC210_V01_TalkList:開始")
    // ①ベースコンテキストを取得する
    const { state: baseState } = useContext(SC000_S_Context)
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
            const talkUserInfo_Detail = {
                talkId: dbObj_talkUserInfo_Detail.talkUserInfo.TalkId,
                userInfo: {
                    _0_DocId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                    userId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                    userName: dbObj_talkUserInfo_Detail.chatUserInfo.UserName,
                    latestLoginDatatime: dbObj_talkUserInfo_Detail.chatUserInfo.LatestLoginDatatime.toDate(),
                    profileImagePath: dbObj_talkUserInfo_Detail.chatUserInfo.ProfileImagePath,
                }
            } as SC210_TalkUserInfo_Detail
            console.log("talkUserInfo_Detail.userInfo.userName:", talkUserInfo_Detail.userInfo.userName)
            return talkUserInfo_Detail
        })
        // ③ステートを更新する
        screenDispatch(UPDATE_TALKLIST(new_talkUserInfoList_Detail))
    }

    // useEffect(() => {
    //     getTalkUserInfoList_Detail()
    // }, [])

    return (
        <>
            <Button onPress={getTalkUserInfoList_Detail}>更新</Button>
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
            />
            {/* ------------------------------------------------------------------------------------------ */}
            <Heading fontSize="xl" p="4" pb="3">
                Inbox
            </Heading>
            {/* <ScrollView > */}
            <FlatList data={screenState.talkUserInfoList_Detail} renderItem={({
                item
            }) => <Box borderBottomWidth="1" _dark={{
                borderColor: "gray.600"
            }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                    <HStack space={3} justifyContent="space-between">
                        <Avatar size="48px" source={{
                            uri: item.userInfo.profileImagePath
                        }} />
                        <VStack>
                            <Text _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" bold>
                                {item.userInfo.userName}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                {item.userInfo.userName}
                            </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" alignSelf="flex-start">
                            {item.userInfo.latestLoginDatatime}
                        </Text>
                    </HStack>
                </Box>} keyExtractor={item => item.talkId} />
            {/* </ScrollView> */}
            {/* ------------------------------------------------------------------------------------------ */}
            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Inbox
                </Heading>
                <FlatList data={DATA} renderItem={({
                    item
                }) => <Box borderBottomWidth="1" _dark={{
                    borderColor: "gray.600"
                }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <HStack space={3} justifyContent="space-between">
                            <Avatar size="48px" source={{
                                uri: item.avatarUrl
                            }} />
                            <VStack>
                                <Text _dark={{
                                    color: "warmGray.50"
                                }} color="coolGray.800" bold>
                                    {item.fullName}
                                </Text>
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    {item.recentText}
                                </Text>
                            </VStack>
                            <Spacer />
                            <Text fontSize="xs" _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" alignSelf="flex-start">
                                {item.timeStamp}
                            </Text>
                        </HStack>
                    </Box>} keyExtractor={item => item.id} />
            </Box>
        </>
    )
}
