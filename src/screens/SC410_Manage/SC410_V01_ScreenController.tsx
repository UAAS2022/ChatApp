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
    Box,
    HStack,
    Avatar,
    VStack,
    Text,
    Spacer,
    SectionList,
} from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    // Text,
    // Button,
    FlatList,
    Alert,
    Image
} from 'react-native';
import { CONST_SC000 } from "../../common/C000_Const"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { SC410_S_Provider, SC410_S_Context } from './SC410_Store'
import { SC410_Style } from "./SC410_Style"
// import { SC000_Img, murata_unko } from "../../common/C000_Const"
import { SC410_V02_Manage_Main } from "./SC410_V02_Manage_Main"
import { SC410_V06_IF_SC998 } from "./SC410_V06_IF_SC998"
import { SC410_V07_IF_SC999 } from "./SC410_V07_IF_SC999"
import { SC410_V08_Login_Demo } from "./SC410_V08_Login_Demo"
import { SC410_V09_IF_SC999_V04 } from "./SC410_V09_IF_SC999_V04"
import { SC410_V10_IF_SC020 } from './SC410_V10_IF_SC020';


const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V01_ScreenController = (props: object) => {
    // コンテキストを取得する
    const { state } = useContext(SC410_S_Context)
    // コンテキストからscreenIdを取得する
    const { screenId } = state.screenControllerInfo
    // screenIdの値に応じて画面を切り替える
    switch (screenId) {
        case CONST_SC000.SCREENID.SC410:
            return <SC410_V02_Manage_Main />
        case CONST_SC000.SCREENID.SC998:
            return <SC410_V06_IF_SC998 />
        case CONST_SC000.SCREENID.SC999:
            return <SC410_V07_IF_SC999 />
        case CONST_SC000.SCREENID.SC999_V21:
            return <SC410_V08_Login_Demo />
        case CONST_SC000.SCREENID.SC020:
            return <SC410_V10_IF_SC020 />
        default:
            return <SC410_V02_Manage_Main />
    }
}
