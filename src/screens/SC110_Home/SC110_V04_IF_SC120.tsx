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
    Image,
    ScrollView,
} from 'react-native';
import { CONST_SC000 } from "../../common/C000_Const"
import { SC000_CHANGE_SCREEN } from "../SC000_BaseComponent/SC000_Action"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { Provider_SC110, Context_SC110 } from './SC110_Store'
import { SC120_V00_UserProfile } from "../SC120_UserProfile/SC120_V00_UserProfile"
import { SC110_V02_Header } from "./SC110_V02_Header"

export const SC110_V04_IF_SC120 = (props: object) => {
    // ②画面コンテキストを取得する
    const { state: screenState } = useContext(Context_SC110)
    return (
        <>
            <SC110_V02_Header
                userId={screenState.preInfo_SC120.userId}
            />
            <Divider />
            {/* <SC220_V00_ChatScreen talkId={screenState.chatScreenPreInfo.talkId} /> */}
            <SC120_V00_UserProfile
                userId={screenState.preInfo_SC120.userId}
            />
        </>
    )
}
