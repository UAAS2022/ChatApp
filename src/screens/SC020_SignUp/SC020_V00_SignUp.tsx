// View

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
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    // Button,
    FlatList,
    Alert
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { Provider_SC020 } from './SC020_Store'
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"
import { SC020_V01_SignUpMain } from './SC020_V01_SignUpMain';
// 各画面のメインコンポーネント（V00系）をプロバイダーで囲む

export const SC020_V00_SignUp = () => {
    try {
        return (
            <>
                <View style={SC000_Style.v00_HeaderArea}>
                    <CC0010_ScreenTitle >ユーザー登録</CC0010_ScreenTitle>
                </View>
                <SC020_V01_SignUpMain />
            </>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }
}