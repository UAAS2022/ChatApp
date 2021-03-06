import React, { useState, useEffect, useContext } from 'react';
import { Button, Stack, Modal, Divider, Center, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn,
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    FlatList,
    Alert,
    Dimensions
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_V01_Cmp1 } from './SC998_V01_Cmp1 '
import { SC998_V02_Cmp2 } from './SC998_V02_Cmp2'
import { SC998_V03_Cmp3 } from './SC998_V03_Cmp3'
import { SC998_S_Provider } from './SC998_Store'
import { SC998_V04_Miracle } from './SC998_V04_Miracle';
import { SC998_V04_Cmp4 } from './SC998_V04_Cmp4';
import { SC998_V05_Cmp5 } from './SC998_V05_Cmp5';
import { SC998_V06_Cmp6 } from './SC998_V06_Cmp6';
import { SC998_V07_Cmp7 } from './SC998_V07_Cmp7';
import { EditAvatar } from '../SC020_SignUp/SC020_V01_SignUpImage'
export const SC998_V00_Nabe = () => {

    return (
        <SafeAreaView>
            <CC0010_ScreenTitle >なべ画面</CC0010_ScreenTitle>
            {/* <Text>むらたはじめ</Text>
            <SC998_V04_Cmp4 /> */}
            {/* <SC998_V05_Cmp5 />
            <SC998_V06_Cmp6 /> */}
            {/* <EditAvatar userId="aaaa" valueAvatar="bbb" /> */}
            <SC998_V07_Cmp7 />
            <SC998_S_Provider>
                {/* <SC998_V01_Cmp1 />
                <SC998_V02_Cmp2 />
                <SC998_V03_Cmp3 />
                <SC998_V04_Miracle/> */}


            </SC998_S_Provider>
        </SafeAreaView>
    )
}