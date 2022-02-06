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
import { getFirestore, collection, doc, addDoc, setDoc, Timestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { db_Firebase, getMessageDocRef } from '../../lib/firebase/Firebase';
import { SC999_Style } from "./SC999_Style"
import type { T999_V04_FB_SampleMessage } from '../../lib/firebase/Types';

export const SC999_V04_FireBaseTest = () => {
    const db = getFirestore();
    const [text, setText] = useState<string>('');

    const sendMessage = async (value: string) => {
        if (value != '') {
            // const docRef = await getMessageDocRef();
            const newMessage = {
                text: value,
                createdAt: Timestamp.now(),
                userId: 'AAAA'
            } as T999_V04_FB_SampleMessage;
            // await setDoc(doc(db_Firebase, "T999_V04_FB_SampleMessage","userID"), newMessage); →Idを指定する場合はこっち
            await addDoc(collection(db_Firebase, "T999_V04_FB_SampleMessage"), newMessage);
            setText('');
        } else {
            Alert.alert('エラー', 'メッセージを入力してください！')
        }
    };
    return (
        <>
            <Text>Firebase</Text>
            <ExpoStatusBar style="light" />
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => {
                        setText(value);
                    }}
                    value={text}
                    placeholder="メッセージを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <Button_Def
                    title="send"
                    onPress={() => {
                        sendMessage(text);
                    }}
                />
            </View>
        </>
    )
}



//[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.]
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but T999_V04_FB_SampleMessage has 1.
