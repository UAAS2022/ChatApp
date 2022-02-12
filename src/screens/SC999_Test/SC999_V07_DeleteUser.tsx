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
import { s130_DeleteUser } from "../../service/S130_DeleteUser"



// 業務エラーチェッククラス
const check = (userInfo: T999_UserInfo): boolean => {
    let errFlg = true
    console.log("checkuserInfo", userInfo)
    if (!c010_UaasUtil_isNotBlank(userInfo.userId)) {
        Alert.alert('エラー', 'ユーザIDを入力してください。')
        errFlg = false
    }
    return errFlg
}

export const SC999_V07_DeleteUser = () => {
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
    // --------------------------------------------------------------

    //ユーザ登録イベントハンドラ（ユーザ登録時の処理を定義する）
    // --------------------------------------------------------------
    const deleteUser = async (userInfo: T999_UserInfo) => {
        console.log("userInfo", userInfo)
        if (check(userInfo)) {
            // サービスパラメータの取得
            const userId = userInfo.userId

            // サービスを実行する
            await s130_DeleteUser(userId);

            // 初期化
            setUserInfo({} as T999_UserInfo);
            // 削除完了
            Alert.alert("",
                "削除しました。",
                [{ text: 'OK', onPress: () => { } }]
            )
        }
    };
    // --------------------------------------------------------------

    return (
        <>
            <Text>SC999_V07_ユーザ削除</Text>
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
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { deleteUser(userInfo); }}>ユーザ削除</Button>
        </>
    )
}



//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
