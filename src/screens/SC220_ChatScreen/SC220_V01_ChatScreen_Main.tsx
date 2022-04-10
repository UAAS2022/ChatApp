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
import { SC220_Style } from "./SC220_Style"
import type { SC220_ChatMessageInfo, SC220_V20_MessageItem } from './SC220_Types'
import { CONST_SC999_V20 } from "../SC999_Test/SC999_Const"
import { c010_UaasUtil_isNotBlank, c010_UaasUtil_isNotEmpty } from '../../common/C010_UaasUtil'
import { s310_CreateChatMessage } from "../../service/S310_CreateChatMessage"
import { s351_SelectChatMessageList_New } from "../../service/S351_SelectChatMessageList_New"
import { s352_SelectChatMessageList_RealTime } from "../../service/S352_SelectChatMessageList_RealTime"

// 業務エラーチェッククラス
const check = (chatMessageInfo: SC220_ChatMessageInfo): boolean => {
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
const USERID = "xxx"

export const SC220_V01_ChatScreen_Main = (props: any) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)

    // ③ローカルステートを定義する
    const [chatMessageInfo, setChatMessageInfo] = useState<SC220_ChatMessageInfo>({} as SC220_ChatMessageInfo);
    const [chatMessageInfoList, setChatMessageInfoList] = useState<SC220_ChatMessageInfo[]>([{}] as SC220_ChatMessageInfo[]);

    // ベースコンテキストからユーザ情報を取得する
    // const loginUserId = baseState.loginUserInfo.userId
    // const loginUserId = USERID
    const loginUserId = baseState.loginUserInfo.userId

    // propsからトークIDを受け取る
    // const talkId = TALKID
    const { talkId, talkName } = props
    //console.log("SC220_V01_ChatScreen_Main_talkId:", talkId)

    //チャットメッセージ
    const onChangeChatMessage = (value: string) => {
        const newState = { ...chatMessageInfo, message: value }
        setChatMessageInfo(newState)
        // //console.log("message", newState.message)
    }

    // トークネーム取得
    const getTalkName = () => {

    }

    // --------------------------------------------------------------

    //ユーザ登録イベントハンドラ（ユーザ登録時の処理を定義する）
    // --------------------------------------------------------------
    const registChatMessage = async (chatMessageInfo: SC220_ChatMessageInfo) => {
        // //console.log("chatMessageInfo", chatMessageInfo)
        if (check(chatMessageInfo)) {
            // サービスパラメータの取得
            // let talkId = TALKID
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
                setChatMessageInfo({} as SC220_ChatMessageInfo);
            }
        }
    };
    // --------------------------------------------------------------

    //チャットメッセージ取得イベントハンドラ（メッセージ表示エリアの情報を取得する）>>不要コード
    // --------------------------------------------------------------
    const getChatMessageList = async () => {
        // Firebaseからデータを取得する
        const resultObj = await s351_SelectChatMessageList_New(talkId)
        const dbObj_newChatMessageInfoList = resultObj.chatMessageList
        // データをuserInfoListステートに合わせる
        let new_ChatMessageInfoList = dbObj_newChatMessageInfoList.map((dbObj_chatMessageInfo) => {
            const chatMessageInfo = {} as SC220_ChatMessageInfo
            chatMessageInfo._0_DocId = dbObj_chatMessageInfo._0_DocId
            chatMessageInfo.talkId = dbObj_chatMessageInfo.TalkId
            chatMessageInfo.seq = dbObj_chatMessageInfo.Seq
            chatMessageInfo.sendUserId = dbObj_chatMessageInfo.SendUserId
            chatMessageInfo.message = dbObj_chatMessageInfo.Message
            chatMessageInfo.sendDateTime = dbObj_chatMessageInfo.SendDateTime
            return chatMessageInfo
        })
        // 並び順を逆にする
        // new_ChatMessageInfoList = [...new_ChatMessageInfoList].reverse()
        // ステートの更新
        setChatMessageInfoList(new_ChatMessageInfoList)
    }

    // サブスクリプションを使ったメッセージ取得関数
    // （トークIDとステートの更新関数を渡すことで、サブスクリプションの結果をリアルタイムで画面に反映する関数。ちょっと強引だから要改善。）
    // --------------------------------------------------------------
    const getChatMessageList_Subsc = async () => {
        await s352_SelectChatMessageList_RealTime(talkId, setChatMessageInfoList)
    }
    // --------------------------------------------------------------

    // 初期表示処理-------------------------------------------------------------
    //
    useEffect(() => {
        // getChatMessageList()
        getChatMessageList_Subsc()
    }, []);
    // -----------------------------------------------------------------------

    return (
        <>
            {/* KeyboardAvoidingViewキーボードで隠れないようにするやつ */}
            {/* <KeyboardAvoidingView> */}
            {/* <Heading size="md">{talkName}</Heading> */}
            <Divider />

            {/* FlatListのinvertedというプロパティをtrueにすることにより、
            FlatListを反転させ、よくあるチャットアプリのように、リストの下側にメッセージを随時追加できるようにしている。 */}
            <FlatList
                style={SC220_Style.v20_ScrollView}
                data={chatMessageInfoList}
                inverted={true}
                renderItem={({ item }: { item: SC220_ChatMessageInfo }) => (
                    <MessageItem loginUserId={loginUserId} chatMessageInfo={item} />
                )}
                keyExtractor={(_, index) => index.toString()}
            />
            <Divider />

            <View style={SC220_Style.v20_InputTextContainer}>
                <TextInput
                    style={SC220_Style.v20_InputText}
                    onChangeText={(value) => { onChangeChatMessage(value) }}
                    value={chatMessageInfo.message}
                    placeholder="メッセージを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <Button size="sm" style={SC220_Style.v20_SendBtn} onPress={() => { registChatMessage(chatMessageInfo); }}>送信</Button>
            </View>
            {/* </KeyboardAvoidingView> */}
        </>
    )
}

export const MessageItem: React.FC<SC220_V20_MessageItem> = ({ chatMessageInfo, loginUserId }: SC220_V20_MessageItem) => {
    return (
        <View>
            {/* ■ ユーザ名 */}
            <View
                style={
                    // 送信ユーザIDがログインユーザと同じかどうかで自分が送ったかどうかを判断し、ユーザ名のスタイルを変える
                    loginUserId == chatMessageInfo.sendUserId
                        ? SC220_Style.v20_MessageSender_Me
                        : SC220_Style.v20_MessageSender_You
                }
            >
                <Text >{chatMessageInfo.sendUserId}</Text>
            </View>
            {/* ■ メッセージ内容 */}
            <View
                style={
                    // 送信ユーザIDがログインユーザと同じかどうかで自分が送ったかどうかを判断し、吹き出しのスタイルを変える
                    loginUserId == chatMessageInfo.sendUserId
                        ? SC220_Style.v20_MessageItem_Me
                        : SC220_Style.v20_MessageItem_You
                }
            >
                <Text style={loginUserId == chatMessageInfo.sendUserId ? { color: '#fff' } : {}}>
                    {chatMessageInfo.message}
                </Text>
            </View>
        </View>
    );
};
