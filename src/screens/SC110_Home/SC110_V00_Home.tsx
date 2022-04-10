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
import { Provider_SC110 } from './SC110_Store'
import { SC110_V03_UserList } from './SC110_V03_UserList'
import { SC110_Style } from "./SC110_Style"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"
import { SC110_V01_ScreenController } from "./SC110_V01_ScreenController"

// 各画面のメインコンポーネント（V00系）をプロバイダーで囲む

export const SC110_V00_Home = () => {
    try {
        return (
            <>
                <Provider_SC110>
                    <SC110_V01_ScreenController />
                </Provider_SC110>
            </>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }
}