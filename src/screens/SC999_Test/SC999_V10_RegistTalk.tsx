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
import type { SC999_TalkUserInfo } from './SC999_Types'
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s210_CreateTalk } from "../../service/S210_CreateTalk"
import { s260_CreateTalkUser } from "../../service/S260_CreateTalkUser"


// 業務エラーチェッククラス
const check_registTalk_withTalkId = (talkInfo: SC999_TalkUserInfo): boolean => {
    let errFlg = true
    console.log("checktalkInfo", talkInfo)
    if (!c010_UaasUtil_isNotBlank(talkInfo.userId)) {
        Alert.alert('エラー', 'ユーザIDを入力してください。')
        errFlg = false
    }
    return errFlg
}
// 業務エラーチェッククラス
const check_registTalk = (talkInfo: SC999_TalkUserInfo): boolean => {
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
export const SC999_V10_RegistTalk = () => {
    // const db = getFirestore();
    const [talkInfo, setTalkInfo] = useState<SC999_TalkUserInfo>({} as SC999_TalkUserInfo);

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //トークID
    const onChangeTalkId = (value: string) => {
        const newState = { ...talkInfo, talkId: value }
        setTalkInfo(newState)
        console.log("talkId", newState.talkId)
    }
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...talkInfo, userId: value }
        setTalkInfo(newState)
        console.log("userId", newState.userId)
    }
    // --------------------------------------------------------------

    //ユーザ登録イベントハンドラ（ユーザ登録時の処理を定義する）
    // --------------------------------------------------------------
    const registTalk_withTalkId = async (talkInfo: SC999_TalkUserInfo) => {
        console.log("talkInfo", talkInfo)
        // エラーフラグの初期化
        let errFlg = "0"
        if (check_registTalk_withTalkId(talkInfo)) {
            // サービスパラメータの取得
            // const talkId = talkInfo.talkId
            const userId = talkInfo.userId

            // トークを登録する
            const result_S210 = await s210_CreateTalk("", 0, userId)
            const talkId = result_S210.returnInfo.talkId
            if (result_S210.errFlg == "1") {
                errFlg = "1"
            }

            // サービスを実行する
            const result_S260 = await s260_CreateTalkUser(talkId, userId, userId)
            if (result_S260.errFlg == "1") {
                errFlg = "1"
            }
            // 処理エラー
            if (errFlg == "1") {
                //ダイアログ
                Alert.alert("エラー",
                    "処理に失敗しました。",
                    [{ text: 'OK', onPress: () => { } }]
                )
            }
            // 処理成功
            else {
                // 初期化
                setTalkInfo(
                    {
                        talkId: talkInfo.talkId,
                        userId: ""
                    } as SC999_TalkUserInfo
                );
                //ダイアログ
                Alert.alert("",
                    "登録しました。",
                    [{ text: 'OK', onPress: () => { } }]
                )
            }
        }
    };

    const registTalk = async (talkInfo: SC999_TalkUserInfo) => {
        console.log("talkInfo", talkInfo)
        if (check_registTalk(talkInfo)) {
            // サービスパラメータの取得
            const talkId = talkInfo.talkId
            const userId = talkInfo.userId

            // サービスを実行する
            const resultObj = await s260_CreateTalkUser(talkId, userId, userId)

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
                setTalkInfo(
                    {
                        talkId: talkInfo.talkId,
                        userId: ""
                    } as SC999_TalkUserInfo
                );
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
            <Text>SC999_V10_トーク情報登録</Text>
            <ExpoStatusBar style="light" />

            <Divider />
            {/* <Heading size="md">トークにユーザ追加</Heading> */}
            <Text>{"\n"}</Text>
            <Text>トークID</Text>
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
            <Text>ユーザID</Text>
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
            <View style={{ flexDirection: 'row', height: '100%', }}>
                <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { registTalk_withTalkId(talkInfo); }}>トーク作成</Button>
                <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { registTalk(talkInfo); }}>トークに追加</Button>
            </View>
        </>
    )
}



//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
