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
import type { T999_UserInfo } from './SC999_Types'
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { c020_CheckUnique_M050 } from '../../common/C020_FirebaseUtil';
import { s110_CreateUser } from "../../service/S110_CreateUser"



// 業務エラーチェッククラス
const check = async (userInfo: T999_UserInfo) => {
    let errFlg = true
    console.log("checkuserInfo", userInfo)
    if (!c010_UaasUtil_isNotBlank(userInfo.userId)) {
        Alert.alert('エラー', 'ユーザIDを入力してください。')
        errFlg = false
    }
    else if (!c010_UaasUtil_isNotBlank(userInfo.userName)) {
        Alert.alert('エラー', 'ユーザ名を入力してください。')
        errFlg = false
    } else if (! await c020_CheckUnique_M050([userInfo.userId])) {
        Alert.alert('エラー', 'このIDは使えません。')
        errFlg = false
    }
    return errFlg
}

export const SC999_V05_RegistUser = () => {
    // const db = getFirestore();
    const [userInfo, setUserInfo] = useState<T999_UserInfo>({} as T999_UserInfo);

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...userInfo, userId: value }
        setUserInfo(newState)
        console.log("userId", newState.userId)

    }
    //ユーザ名
    const onChangeUserName = (value: string) => {
        const newState = { ...userInfo, userName: value }
        setUserInfo(newState)
        console.log("userName", newState.userName)
    }
    //コメント
    const onChangeComment = (value: string) => {
        const newState = { ...userInfo, comment: value }
        setUserInfo(newState)
        console.log("comment", newState.comment)
    }
    // --------------------------------------------------------------

    //ユーザ登録イベントハンドラ（ユーザ登録時の処理を定義する）
    // --------------------------------------------------------------
    const registUser = async (userInfo: T999_UserInfo) => {
        console.log("userInfo", userInfo)
        if (await check(userInfo)) {
            // サービスパラメータの取得
            const userId = userInfo.userId
            const userName = userInfo.userName
            const comment = c010_UaasUtil_isNotBlank(userInfo.comment) ? userInfo.comment : ""  // 三項演算子を使って、undef,null制御
            const profileImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
            const genderCd = "0"
            const age = 0
            const areaCd = "0"
            const hashtags = ""

            // サービスを実行する
            const resultObj = await s110_CreateUser(userId, userName, comment, profileImagePath, genderCd, age, areaCd, hashtags, userId)

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
                setUserInfo({} as T999_UserInfo);
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
            <Text>SC999_V05_ユーザ登録</Text>
            <ExpoStatusBar style="light" />

            <Text>{"\n"}</Text>
            <Text>ユーザID</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeUserId(value) }}
                    value={userInfo.userId}
                    placeholder="ユーザIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Text>ユーザ名</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeUserName(value) }}
                    value={userInfo.userName}
                    placeholder="ユーザ名を入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Text>自己紹介</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeComment(value) }}
                    value={userInfo.comment}
                    placeholder="自己紹介文を入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>

            <Text>{"\n"}</Text>
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { registUser(userInfo); }}>ユーザ登録</Button>
        </>
    )
}

//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
