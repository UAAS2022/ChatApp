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
import { SC999_Style } from "./SC999_Style"
import type { SC999_Context, T999_UserInfo, SC999_ChatMessageInfo } from './SC999_Types'
import { UPDATE_V19 } from './SC999_Action'
import { SC999_S_Context } from "./SC999_Store"
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s351_SelectChatMessage_New } from "../../service/S351_SelectChatMessage_New"


const MAXROW = 4

// 業務エラーチェッククラス
const check = (chatMessageInfo: SC999_ChatMessageInfo): boolean => {
    let errFlg = true
    console.log("checkchatMessageInfo", chatMessageInfo)
    if (!c010_UaasUtil_isNotBlank(chatMessageInfo.talkId)) {
        Alert.alert('エラー', 'トークIDを入力してください。')
        errFlg = false
    }
    return errFlg
}

export const SC999_V19_SelectChatMessageList_List = () => {

    // コンテキストからステートとdispatchを取得
    const { state, dispatch } = useContext(SC999_S_Context);
    // ローカルStateを定義
    const [chatMessageInfo_Input, setTalkInfo_Input] = useState<SC999_ChatMessageInfo>({} as SC999_ChatMessageInfo);

    // トークリストを取得
    const chatMessageInfoList = state.sC999_V19_Info.chatMessageInfoList

    //ユーザID
    const onChangeTalkId = (value: string) => {
        const newState = { ...chatMessageInfo_Input, talkId: value }
        setTalkInfo_Input(newState)
        console.log("talkId", newState.talkId)
    }

    const getChatMessageList = async () => {
        console.log("getUserList開始！=========================================================");
        // Firebaseからデータを取得する
        const resultObj = await s351_SelectChatMessage_New(chatMessageInfo_Input.talkId)
        const dbObj_newChatMessageInfoList = resultObj.chatMessageList

        // データをuserInfoListステートに合わせる
        const new_ChatMessageInfoList = dbObj_newChatMessageInfoList.map((dbObj_chatMessageInfo) => {
            const chatMessageInfo = {} as SC999_ChatMessageInfo
            chatMessageInfo._0_DocId = dbObj_chatMessageInfo._0_DocId
            chatMessageInfo.talkId = dbObj_chatMessageInfo.TalkId
            chatMessageInfo.seq = dbObj_chatMessageInfo.Seq
            chatMessageInfo.sendUserId = dbObj_chatMessageInfo.SendUserId
            chatMessageInfo.message = dbObj_chatMessageInfo.Message
            chatMessageInfo.sendDateTime = dbObj_chatMessageInfo.SendDateTime
            return chatMessageInfo
        })

        // ステートの更新
        const newState = {
            sC999_V19_Info: {
                chatMessageInfoList: new_ChatMessageInfoList
            }
        }
        dispatch(UPDATE_V19(newState))
        console.log("dbObj_newTalkList----------------------------------------------------------------");
        console.log(dbObj_newChatMessageInfoList);
        console.log("dbObj_newTalkList----------------------------------------------------------------");
        console.log("new_TalkInfoList----------------------------------------------------------------");
        console.log(new_ChatMessageInfoList);
        console.log("new_TalkInfoList----------------------------------------------------------------");
        console.log("state----------------------------------------------------------------");
        console.log(state.sC999_V19_Info);
        console.log("state----------------------------------------------------------------");
        console.log("getUserList終了！=========================================================");
    }

    const onGetChatMessageEvent = () => {
        if (check(chatMessageInfo_Input)) {
            getChatMessageList()
        }
    }

    //最上部でさらに下すワイプすることで発火するイベントを定義 （下にぐってスクロールさせて更新する仕組み）
    const onUpScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        //スクロール最上部のさらに上までスクロールされた場合だけ実行する
        if (e.nativeEvent.contentOffset.y < 0) {
            onGetChatMessageEvent()
        }
    }

    // 初期表示処理-------------------------------------------------------------
    //　裏持ちのユーザ情報リストのステートを更新
    // useEffect(() => {
    //     // signin();
    //     getTalkList()
    // }, []);
    // -----------------------------------------------------------------------
    return (
        <>
            <Text>SC999_V14_トーク一覧</Text>
            <Text>※ コンテキストに値を入れいているため、遷移してまた戻っても状態が保持される</Text>

            <Text>{"\n"}</Text>
            <Text>検索用トークID</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeTalkId(value) }}
                    value={chatMessageInfo_Input.talkId}
                    placeholder="トークIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>
            <Text>chatMessageInfo_Input:{chatMessageInfo_Input.talkId}</Text>
            <Divider />
            <Text>{"\n"}</Text>
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { onGetChatMessageEvent(); }}>検索</Button>
            <Divider />
            {/* <Heading size="md">テストrow</Heading>
            <Flex direction="row" mb="2.5" mt="1.5" _text={{
                color: "coolGray.800"
            }}>
                {userInfoList.map((userInfo: T999_UserInfo) => {
                    return (
                        <Center size="16" bg="primary.100">{userInfo.userName}</Center>
                    )
                })}
            </Flex>
            <Divider /> */}

            <Heading size="md">チャットメッセージ一覧</Heading>
            <ScrollView onMomentumScrollBegin={onUpScrollEvent}>
                <Flex direction="column" mb="2.5" mt="1.5" _text={{
                    color: "coolGray.800"
                }}>
                    {/* map処理1：行のループ */}
                    {chatMessageInfoList.map((chatMessageInfo: SC999_ChatMessageInfo) => {
                        return (
                            <Center style={SC999_Style.chatMessageInfoBox} size="20" bg="primary.100">
                                <Text>メッセージID：{chatMessageInfo._0_DocId}</Text>
                                <Text>ユーザID：{chatMessageInfo.sendUserId}</Text>
                                <Text>メッセージ：{chatMessageInfo.message}</Text>
                            </Center>
                        )
                    })}
                </Flex>
                <Divider />
                <Heading size="md">チャットメッセージ一覧（シンプルコード）</Heading>
                {chatMessageInfoList.map((chatMessageInfo: SC999_ChatMessageInfo) => {
                    return (
                        <Text>通番：{chatMessageInfo.seq},ユーザID：{chatMessageInfo.sendUserId},メッセージ：{chatMessageInfo.message}</Text>
                    )
                })}
            </ScrollView>
        </>
    )
}