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
import { SC110_S_Provider } from './SC110_Store'
import { SC110_V01_UserList } from './SC110_V01_UserList'
import { SC110_Style } from "./SC110_Style"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

// 各画面のメインコンポーネント（V00系）をプロバイダーで囲む

export const SC110_V00_Home = () => {
    try {
        console.log("V0010_Home:----------------------")
        return (
            <>
                <View style={SC000_Style.v00_HeaderArea}>
                    <CC0010_ScreenTitle >Home画面</CC0010_ScreenTitle>
                </View>
                <Divider />
                <SC110_S_Provider>
                    <SC110_V01_UserList />
                </SC110_S_Provider>
            </>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }
}