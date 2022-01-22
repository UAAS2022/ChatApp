// View

import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    Button,
    FlatList,
    Alert
} from 'react-native';

//エラー発生時の共通処理
export const sc950_V00_commonErr = (error: Error) => {
    //コンソールにエラーログを出力する
    console.log(error.message)
}

export const SC950_V00_Error = () => {
    try {
        return (
            <>
                <View >
                    <Text>エラーが発生しました。しばらく経ってから再度お試しください。</Text>
                </View>
            </>
        );
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
        throw (error)
    }
}