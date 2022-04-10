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
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC999_Style } from "./SC999_Style"
import type { SC999_ChatMessageInfo } from './SC999_Types'
import { CONST_SC999_V20 } from "./SC999_Const"
import { c010_UaasUtil_isNotBlank, c010_UaasUtil_isNotEmpty } from '../../common/C010_UaasUtil'
import { s310_CreateChatMessage } from "../../service/S310_CreateChatMessage"
import { UPDATE_V19 } from './SC999_Action'
import { SC999_S_Context } from "./SC999_Store"
import { s351_SelectChatMessageList_New } from "../../service/S351_SelectChatMessageList_New"

// 業務エラーチェッククラス
const check = (chatMessageInfo: SC999_ChatMessageInfo): boolean => {
    let errFlg = true
    //console.log("checkchatMessageInfo", chatMessageInfo)
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

export const SC999_V20_ChatMessage_Pre1 = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②スクリーンコンテキストを取得する
    const { state, dispatch } = useContext(SC999_S_Context);

    // ローカルステートを定義する
    const [chatMessageInfo, setChatMessageInfo] = useState<SC999_ChatMessageInfo>({} as SC999_ChatMessageInfo);
    const [chatMessageInfoList, setChatMessageInfoList] = useState<SC999_ChatMessageInfo[]>([{}] as SC999_ChatMessageInfo[]);

    // ベースコンテキストからユーザ情報を取得する
    const loginUserId = baseState.loginUserInfo.userId
    // const loginUserId = "aaa"

    // // onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // // --------------------------------------------------------------
    // // トークID
    // const onChangeTalkId = (value: string) => {
    //     const newState = { ...chatMessageInfo, talkId: value }
    //     setChatMessageInfo(newState)
    //     //console.log("talkId", newState.talkId)
    // }
    // // ユーザID
    // const onChangeUserId = (value: string) => {
    //     const newState = { ...chatMessageInfo, sendUserId: value }
    //     setChatMessageInfo(newState)
    //     //console.log("sendUserId", newState.sendUserId)
    // }

    //チャットメッセージ
    const onChangeChatMessage = (value: string) => {
        const newState = { ...chatMessageInfo, message: value }
        setChatMessageInfo(newState)
        //console.log("message", newState.message)
    }

    // --------------------------------------------------------------

    //ユーザ登録イベントハンドラ（ユーザ登録時の処理を定義する）
    // --------------------------------------------------------------
    const registChatMessage = async (chatMessageInfo: SC999_ChatMessageInfo) => {
        //console.log("chatMessageInfo", chatMessageInfo)
        if (check(chatMessageInfo)) {
            // サービスパラメータの取得
            let talkId = TALKID
            let sendUserId = loginUserId
            let message = chatMessageInfo.message
            if (!c010_UaasUtil_isNotEmpty(message)) {
                message = "  "
            }

            // サービスを実行する
            const resultObj = await s310_CreateChatMessage(talkId, sendUserId, message, sendUserId)

            // 処理エラー
            if (resultObj.errFlg == "1") {
                //ダイアログ
                Alert.alert("エラー",
                    "処理に失敗しました。",
                    [{ text: 'OK', onPress: () => { } }]
                )
            }
            // 処理成功
            else {
                // 初期化
                setChatMessageInfo({} as SC999_ChatMessageInfo);
            }
        }
    };
    // --------------------------------------------------------------

    //チャットメッセージ取得イベントハンドラ（メッセージ表示エリアの情報を取得する）
    // --------------------------------------------------------------
    const getChatMessageList = async () => {
        //console.log("getChatMessageList開始！=========================================================");

        // Firebaseからデータを取得する
        const resultObj = await s351_SelectChatMessageList_New(TALKID)
        const dbObj_newChatMessageInfoList = resultObj.chatMessageList

        // データをuserInfoListステートに合わせる
        const temp_new_ChatMessageInfoList = dbObj_newChatMessageInfoList.map((dbObj_chatMessageInfo) => {
            const chatMessageInfo = {} as SC999_ChatMessageInfo
            chatMessageInfo._0_DocId = dbObj_chatMessageInfo._0_DocId
            chatMessageInfo.talkId = dbObj_chatMessageInfo.TalkId
            chatMessageInfo.seq = dbObj_chatMessageInfo.Seq
            chatMessageInfo.sendUserId = dbObj_chatMessageInfo.SendUserId
            chatMessageInfo.message = dbObj_chatMessageInfo.Message
            chatMessageInfo.sendDateTime = dbObj_chatMessageInfo.SendDateTime
            return chatMessageInfo
        })

        const new_ChatMessageInfoList = [...temp_new_ChatMessageInfoList].reverse()

        // ステートの更新
        setChatMessageInfoList(new_ChatMessageInfoList)
        // const newState = {
        //     sC999_V19_Info: {
        //         chatMessageInfoList: new_ChatMessageInfoList
        //     }
        // }
        // // dispatch(UPDATE_V19(newState))
        //console.log("dbObj_newTalkList----------------------------------------------------------------");
        //console.log(dbObj_newChatMessageInfoList);
        //console.log("dbObj_newTalkList----------------------------------------------------------------");
        //console.log("new_TalkInfoList----------------------------------------------------------------");
        //console.log(new_ChatMessageInfoList);
        //console.log("new_TalkInfoList----------------------------------------------------------------");
        //console.log("state----------------------------------------------------------------");
        //console.log(state.sC999_V19_Info);
        //console.log("state----------------------------------------------------------------");
        //console.log("getChatMessageList終了！=========================================================");
    }
    // --------------------------------------------------------------

    // 初期表示処理-------------------------------------------------------------
    //
    useEffect(() => {
        // signin();
        getChatMessageList()
    }, []);
    // -----------------------------------------------------------------------

    return (
        <>
            <Heading size="md">チャットメッセージ一覧（シンプルコード）</Heading>
            <Divider />
            <ScrollView onMomentumScrollBegin={getChatMessageList}>
                {chatMessageInfoList.map((chatMessageInfo: SC999_ChatMessageInfo) => {
                    return (
                        <Text>通番：{chatMessageInfo.seq},ユーザID：{chatMessageInfo.sendUserId},メッセージ：{chatMessageInfo.message}</Text>
                    )
                })}
            </ScrollView>
            <Divider />
            <ScrollView style={SC999_Style.v20_ScrollView}
                onMomentumScrollBegin={getChatMessageList}
            // contentContainerStyle={{ paddingVertical: 1 }}
            // contentOffset={{ x: 0, y: 0 }}
            >
                {chatMessageInfoList.map((chatMessageInfo: SC999_ChatMessageInfo) => {
                    return (
                        <MessageItem loginUserId={loginUserId} chatMessageInfo={chatMessageInfo} />
                    )
                })}
            </ScrollView>
            <Divider />
            {/* <Text>トークID</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeTalkId(value) }}
                    value={chatMessageInfo.talkId}
                    placeholder="トークIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View> */}

            {/* <Text>送信ユーザID</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeUserId(value) }}
                    value={chatMessageInfo.sendUserId}
                    placeholder="送信ユーザIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View> */}

            <Text>チャットメッセージ</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeChatMessage(value) }}
                    value={chatMessageInfo.message}
                    placeholder="メッセージを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { registChatMessage(chatMessageInfo); }}>送信</Button>
        </>
    )
}

type Props = {
    loginUserId: string | undefined;
    chatMessageInfo: SC999_ChatMessageInfo;
};

export const MessageItem: React.FC<Props> = ({ chatMessageInfo, loginUserId }: Props) => {
    return (
        <>
            {/* ■ ユーザ名 */}
            <View
                style={
                    // 送信ユーザIDがログインユーザと同じかどうかで自分が送ったかどうかを判断し、ユーザ名のスタイルを変える
                    loginUserId == chatMessageInfo.sendUserId
                        ? SC999_Style.v20_MessageSender_Me
                        : SC999_Style.v20_MessageSender_You
                }
            >
                <Text >{chatMessageInfo.sendUserId}</Text>
            </View>

            {/* ■ メッセージ内容 */}
            <View
                style={
                    // 送信ユーザIDがログインユーザと同じかどうかで自分が送ったかどうかを判断し、吹き出しのスタイルを変える
                    loginUserId == chatMessageInfo.sendUserId
                        ? SC999_Style.v20_MessageItem_Me
                        : SC999_Style.v20_MessageItem_You
                }
            >
                <Text style={loginUserId == chatMessageInfo.sendUserId ? { color: '#fff' } : {}}>
                    {chatMessageInfo.message}
                </Text>
            </View>
        </>
    );
};

//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
