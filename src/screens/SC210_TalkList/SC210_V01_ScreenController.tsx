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
import { CONST_SC000, CONST_SC210 } from "../../common/C000_Const"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { Provider_SC210, Context_SC210 } from './SC210_Store'
// import { SC000_Img, murata_unko } from "../../common/C000_Const"
import { SC210_V03_TalkList_Main } from "./SC210_V03_TalkList_Main"
import { SC210_V04_IF_SC220 } from "./SC210_V04_IF_SC220"



const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC210_V01_ScreenController = (props: object) => {
    // コンテキストを取得する
    const { state } = useContext(Context_SC210)
    // コンテキストからscreenIdを取得する
    const { componentId } = state.screenControllerInfo
    // screenIdの値に応じて画面を切り替える
    switch (componentId) {
        case CONST_SC210.COMPONENT_ID.V03:
            return (
                <>
                    <SC210_V03_TalkList_Main />
                    {/* <SC000_V04_MenuBar /> */}
                </>
            )
        case CONST_SC210.COMPONENT_ID.V04:
            return <SC210_V04_IF_SC220 />
        default:
            return (
                <>
                    <SC210_V03_TalkList_Main />
                    {/* <SC000_V04_MenuBar /> */}
                </>
            )
    }
}

const useBaseScreenId = () => {

}


