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
import { Provider_SC210, Context_SC210 } from './SC210_Store'
import { SC220_V00_ChatScreen } from "../SC220_ChatScreen/SC220_V00_ChatScreen"
import { SC210_V02_Header } from "./SC210_V02_Header"

export const SC210_V04_IF_SC220 = (props: object) => {
    // ②画面コンテキストを取得する
    const { state: screenState } = useContext(Context_SC210)
    return (
        <>
            <SC210_V02_Header
                talkName={screenState.chatScreenPreInfo.talkName}
            />
            <Divider />
            {/* <SC220_V00_ChatScreen talkId={screenState.chatScreenPreInfo.talkId} /> */}
            <SC220_V00_ChatScreen
                talkId={screenState.chatScreenPreInfo.talkId}
            />
        </>
    )
}
