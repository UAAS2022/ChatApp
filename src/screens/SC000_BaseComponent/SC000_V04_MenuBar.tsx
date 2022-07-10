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
import { CC0020_MenuBtn } from '../SC000_BaseComponent/SC000_V03_MenuBtn'
import type { SC000_ScreenChangeBtnInfo } from "../SC000_BaseComponent/SC000_Types"
// import { GO_TO_SC110, GO_TO_SC210, GO_TO_SC021 } from "../SC000_BaseComponent/SC000_Action"
import { SC000_Style } from "./SC000_Style"
import { SC000_S_Context } from "./SC000_Store"
import { CONST_SC000 } from "../../common/C000_Const"

export const SC000_V04_MenuBar = (props: object) => {
    // レイアウトパターンを定義
    const { state } = useContext(SC000_S_Context)
    // const { screenId, layoutPattern } = state.screenControllerInfo
    // メニューボタンを定義
    const menuBtn1: SC000_ScreenChangeBtnInfo = { buttonId: "HOME", buttonName: "HOME", nextScreenInfo: CONST_SC000.SCREENINFO.SC110 }
    const menuBtn2: SC000_ScreenChangeBtnInfo = { buttonId: "TalkList", buttonName: "Talk", nextScreenInfo: CONST_SC000.SCREENINFO.SC210 }
    const menuBtn3: SC000_ScreenChangeBtnInfo = { buttonId: "Boad", buttonName: "Boad", nextScreenInfo: CONST_SC000.SCREENINFO.SC310 }
    const menuBtn4: SC000_ScreenChangeBtnInfo = { buttonId: "Manage", buttonName: "Manage", nextScreenInfo: CONST_SC000.SCREENINFO.SC410, }
    const menuBtn998: SC000_ScreenChangeBtnInfo = { buttonId: "Nabe", buttonName: "Nabe", nextScreenInfo: CONST_SC000.SCREENINFO.SC998, }
    const menuBtn999: SC000_ScreenChangeBtnInfo = { buttonId: "Test", buttonName: "Test", nextScreenInfo: CONST_SC000.SCREENINFO.SC999, }
    return (
        <>
            <View style={SC000_Style.v04_MenuBar}>
                <CC0020_MenuBtn btnInfo={menuBtn1} />
                <CC0020_MenuBtn btnInfo={menuBtn2} />
                <View style={SC000_Style.v03_MenuBtnView}>
                    <Button style={SC000_Style.v03_MenuBtn} colorScheme="" bg={"coolGray.200"} >工事中</Button>
                </View>
                <CC0020_MenuBtn btnInfo={menuBtn4} />
            </View>
        </>
    );
}
