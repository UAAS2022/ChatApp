import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Center, NativeBaseProvider } from "native-base"
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
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s270_UpdateTalkUser } from "../../service/S270_UpdateTalkUser"


// 業務エラーチェッククラス
const check = (talkInfo: SC999_TalkUserInfo): boolean => {
    let errFlg = true
    //console.log("checktalkInfo", talkInfo)
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

export const SC999_V11_UpdateTalk = () => {
    // const db = getFirestore();
    const [talkInfo, setTalkInfo] = useState<SC999_TalkUserInfo>({} as SC999_TalkUserInfo);

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //トークID
    const onChangeTalkId = (value: string) => {
        const newState = { ...talkInfo, talkId: value }
        setTalkInfo(newState)
        //console.log("talkId", newState.talkId)
    }
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...talkInfo, userId: value }
        setTalkInfo(newState)
        //console.log("userId", newState.userId)
    }
    // --------------------------------------------------------------

    //ユーザ登録イベントハンドラ（ユーザ登録時の処理を定義する）
    // --------------------------------------------------------------
    const updateTalk = async (talkInfo: SC999_TalkUserInfo) => {
        //console.log("talkInfo", talkInfo)
        if (check(talkInfo)) {
            // サービスパラメータの取得
            const talkId = talkInfo.talkId
            const userId = talkInfo.userId

            // サービスを実行する
            await s270_UpdateTalkUser(talkId, userId, userId)

            // 初期化
            setTalkInfo({} as SC999_TalkUserInfo);

            // 更新完了
            Alert.alert("",
                "更新しました。",
                [{ text: 'OK', onPress: () => { } }]
            )
        }
    };
    // --------------------------------------------------------------

    return (
        <>
            <Text>SC999_V11_トーク情報更新</Text>
            <ExpoStatusBar style="light" />

            <Text>{"\n"}</Text>
            <Text>検索用トークID（更新対象外）</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeTalkId(value) }}
                    value={talkInfo.talkId}
                    placeholder="トークIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Text>検索用ユーザID（更新対象外）</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeUserId(value) }}
                    value={talkInfo.userId}
                    placeholder="ユーザIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { updateTalk(talkInfo); }}>トーク情報更新</Button>
        </>
    )
}



//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
