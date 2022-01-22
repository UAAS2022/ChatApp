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
import { SC010_S_Provider } from './SC010_Store'
import { SC010_V01_Counter } from './SC010_V01_Counter'
import { SC010_V02_User } from './SC010_V02_User'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"

// 各画面のメインコンポーネント（V00系）をプロバイダーで囲む

export const SC010_Home = () => {
    console.log("V0010_Home:----------------------")
    return (
        <>
            <SafeAreaView>
                <CC0010_ScreenTitle >Home画面</CC0010_ScreenTitle>
                <SC010_S_Provider>
                    <Text>HomeProvider:</Text>
                    <SC010_V01_Counter />
                    <SC010_V02_User />
                </SC010_S_Provider>
                <Text>End!</Text>
            </SafeAreaView>
        </>
    );
}
