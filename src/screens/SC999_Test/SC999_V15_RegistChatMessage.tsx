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
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SC999_Style } from "./SC999_Style"
import type { SC999_ChatMessageInfo } from './SC999_Types'
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s310_CreateChatMessage } from "../../service/S310_CreateChatMessage"


// 業務エラーチェッククラス
const check = (chatMessageInfo: SC999_ChatMessageInfo): boolean => {
    let errFlg = true
    //console.log("checkchatMessageInfo", chatMessageInfo)
    if (!c010_UaasUtil_isNotBlank(chatMessageInfo.talkId)) {
        Alert.alert('エラー', 'トークIDを入力してください。')
        errFlg = false
    }
    else if (!c010_UaasUtil_isNotBlank(chatMessageInfo.sendUserId)) {
        Alert.alert('エラー', '送信ユーザIDを入力してください。')
        errFlg = false
    }
    return errFlg
}

export const SC999_V15_RegistChatMessage = () => {
    // const db = getFirestore();
    const [chatMessageInfo, setChatMessageInfo] = useState<SC999_ChatMessageInfo>({} as SC999_ChatMessageInfo);

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //トークID
    const onChangeTalkId = (value: string) => {
        const newState = { ...chatMessageInfo, talkId: value }
        setChatMessageInfo(newState)
        //console.log("talkId", newState.talkId)
    }
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...chatMessageInfo, sendUserId: value }
        setChatMessageInfo(newState)
        //console.log("sendUserId", newState.sendUserId)
    }

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
            const talkId = chatMessageInfo.talkId
            const sendUserId = chatMessageInfo.sendUserId
            const message = chatMessageInfo.message

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
                //ダイアログ
                Alert.alert("",
                    "登録しました。",
                    [{ text: 'OK', onPress: () => { } }]
                )
            }
        }
    };
    // --------------------------------------------------------------

    return (
        <>
            <Text>SC999_V15_チャットメッセージ登録</Text>
            <ExpoStatusBar style="light" />

            <Text>{"\n"}</Text>
            <Text>トークID</Text>
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
            </View>

            <Text>{"\n"}</Text>
            <Text>送信ユーザID</Text>
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
            </View>

            <Text>{"\n"}</Text>
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
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { registChatMessage(chatMessageInfo); }}>チャットメッセージ情報登録</Button>
        </>
    )
}



//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
