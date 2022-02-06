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
// import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { db_Firebase, FIREBASE_COLLECTIONS, getMessageDocRef } from '../../lib/firebase/Firebase';
import { SC999_Style } from "./SC999_Style"
import type { T999_V04_FB_SampleMessage, T999_M050_USER } from '../../lib/firebase/Types';
import type { T999_UserInfo } from './SC999_Types'
import { check_Required } from './SC999_V00_Test'


// 業務エラーチェッククラス
const check = (userInfo: T999_UserInfo): boolean => {
    let errFlg = true
    console.log("checkuserInfo", userInfo)
    if (!check_Required(userInfo.userId)) {
        Alert.alert('エラー', 'ユーザIDを入力してください。')
        errFlg = false
    }
    else if (!check_Required(userInfo.userName)) {
        Alert.alert('エラー', 'ユーザ名を入力してください。')
        errFlg = false
    }
    return errFlg
}

export const SC999_V06_UpdateUser = () => {
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
    const callUpdateUser = (userInfo: T999_UserInfo) => {
        if (check(userInfo)) {
            Alert.alert("確認",
                "ユーザ情報を更新しますか？",
                [{ text: 'OK', onPress: () => { updateUser(userInfo) } }, { text: 'キャンセル', onPress: () => { } }]
            )
        }
    }

    const updateUser = async (userInfo: T999_UserInfo) => {
        try {
            console.log("userInfo", userInfo)
            if (check(userInfo)) {
                const updateUserId = userInfo.userId
                const newUserInfo = {
                    // UserId: userInfo.userId,
                    UserName: userInfo.userName,
                    Comment: userInfo.comment,
                    LatestLoginDatatime: Timestamp.now(),
                    // ProfileImagePath: "../../../",
                    // GenderCd: "0",
                    // Age: 0,
                    // AreaCd: "0",
                    // Hashtag: "#XXX",
                } as T999_M050_USER;
                const result = await updateDoc(doc(db_Firebase, FIREBASE_COLLECTIONS.T999_M050_USER, updateUserId), newUserInfo);

                // await setDoc(doc(db_Firebase, FIREBASE_COLLECTIONS.T999_M050_USER, newUserInfo.UserId), newUserInfo);        //→Idを指定する場合はこっち
                // await addDoc(collection(db_Firebase, FIREBASE_COLLECTIONS.T999_M050_USER), newUserInfo);    //→Idを指定しない場合はこっち
                // 初期化
                setUserInfo({} as T999_UserInfo);
                // 更新完了
                Alert.alert("",
                    "更新しました。",
                    [{ text: 'OK', onPress: () => { } }]
                )
            }
        } catch {
            Alert.alert("エラー",
                "更新に失敗しました。",
                [{ text: 'OK', onPress: () => { } }]
            )
        }
    };
    // --------------------------------------------------------------

    return (
        <>
            <Text>SC999_V05_ユーザ登録</Text>
            <ExpoStatusBar style="light" />

            <Text>{"\n"}</Text>
            <Text>検索用ユーザID（更新対象外）</Text>
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
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { callUpdateUser(userInfo); }}>ユーザ更新</Button>
        </>
    )
}



//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
