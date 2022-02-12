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
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC110_S_Provider } from './SC110_Store'
import { SC110_V01_Counter } from './SC110_V01_Counter'
import { SC110_V02_User } from './SC110_V02_User'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

// 各画面のメインコンポーネント（V00系）をプロバイダーで囲む

export const SC110_V00_Home = () => {
    try {
        console.log("V0010_Home:----------------------")
        return (
            <>
                <SafeAreaView>
                    <CC0010_ScreenTitle >Home画面</CC0010_ScreenTitle>
                    <SC110_S_Provider>
                        <Text>HomeProvider:</Text>
                        <SC110_V01_Counter />
                        <SC110_V02_User />
                    </SC110_S_Provider>
                    <Text>End!</Text>
                </SafeAreaView>
            </>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }
}