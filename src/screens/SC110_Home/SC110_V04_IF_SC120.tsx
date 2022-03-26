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
import { Context_SC110 } from './SC110_Store'
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
