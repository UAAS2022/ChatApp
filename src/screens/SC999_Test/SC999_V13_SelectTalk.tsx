import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Center, NativeBaseProvider, Divider } from "native-base"
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
import type { SC999_TalkUserInfo } from './SC999_Types'
import { c010_UaasUtil_isNotBlank, c010_UaasUtil_isNotEmpty } from '../../common/C010_UaasUtil'
import { s290_SelectTalkUser } from "../../service/S290_SelectTalkUser"


// 業務エラーチェッククラス
const check = (talkInfo: SC999_TalkUserInfo): boolean => {
    let errFlg = true
    console.log("checktalkInfo", talkInfo)
    if (!c010_UaasUtil_isNotBlank(talkInfo.talkId)) {
        Alert.alert('エラー', 'トークIDを入力してください。')
        errFlg = false
    }
    else if (!c010_UaasUtil_isNotBlank(talkInfo.userId)) {
        Alert.alert('エラー', 'ユーザIDを入力してください。')
        errFlg = false
    }
    return errFlg
}

export const SC999_V13_SelectTalk = () => {
    // const db = getFirestore();
    const [talkInfo_Input, setTalkInfo_Input] = useState<SC999_TalkUserInfo>({} as SC999_TalkUserInfo);
    const [talkInfo, setTalkInfo] = useState<SC999_TalkUserInfo>({} as SC999_TalkUserInfo);

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //トークID
    const onChangeTalkId = (value: string) => {
        const newState = { ...talkInfo_Input, talkId: value }
        setTalkInfo_Input(newState)
        console.log("talkId", newState.talkId)
    }
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...talkInfo_Input, userId: value }
        setTalkInfo_Input(newState)
        console.log("userId", newState.userId)
    }
    // --------------------------------------------------------------

    //ユーザ登録イベントハンドラ（ユーザ登録時の処理を定義する）
    // --------------------------------------------------------------
    const updateTalk = async () => {
        console.log("talkInfo", talkInfo_Input)
        if (check(talkInfo_Input)) {
            // サービスパラメータの取得
            const talkId = talkInfo_Input.talkId
            const userId = talkInfo_Input.userId

            // サービスを実行する
            const resultObj = await s290_SelectTalkUser(talkId, userId)

            if (!c010_UaasUtil_isNotEmpty(resultObj.talkInfo)) {
                //ダイアログ
                Alert.alert("",
                    "検索結果0件",
                    [{ text: 'OK', onPress: () => { } }])
            }
            else {
                const newState: SC999_TalkUserInfo = {
                    talkId: resultObj.talkInfo.TalkId,
                    userId: resultObj.talkInfo.UserId
                }
                // 初期化
                setTalkInfo(newState);
            }
        }
    };
    // --------------------------------------------------------------

    return (
        <>
            <Text>SC999_V11_トーク情報更新</Text>
            <ExpoStatusBar style="light" />

            <Text>{"\n"}</Text>
            <Text>検索用トークID</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeTalkId(value) }}
                    value={talkInfo_Input.talkId}
                    placeholder="トークIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Text>検索用ユーザID</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeUserId(value) }}
                    value={talkInfo_Input.userId}
                    placeholder="ユーザIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { updateTalk(); }}>トーク情報検索</Button>

            <Divider />
            <Text>↓検索結果↓</Text>
            <Text>トークID：{talkInfo.talkId}</Text>
            <Text>ユーザID：{talkInfo.userId}</Text>
        </>
    )
}



//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
