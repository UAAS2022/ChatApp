// View

import React, { useState, useEffect, useContext } from 'react';
import {
    // View,
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
import { CONST_SC000, CONST_SC210 } from "../../common/C000_Const"
import { SC000_CHANGE_SCREEN } from "../SC000_BaseComponent/SC000_Action"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { useState_SC000_LayoutPattern } from "../SC000_BaseComponent/SC000_V01_MainScreen"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { CHANGE_SCREEN } from "./SC210_Action"
import { Context_SC210 } from "./SC210_Store"
import { SC210_Style } from "./SC210_Style"


export const SC210_V02_Header = (props: any) => {
    // B:スクリーンコンテキストで表示切り替え情報を管理した場合----------------------------------------------------------
    // スクリーンコンテキストを呼び出す
    const { state, dispatch } = useContext(Context_SC210)

    // 
    const [updateLayoutPattern] = useState_SC000_LayoutPattern(CONST_SC000.SCREENID.SC220)

    // CS210への遷移関数
    const onClickSwitch_SC210_SC = () => {
        // 取得したstateの値を更新する
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = CONST_SC210.COMPONENT_ID.V03
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC210)
        // // レイアウトパターン変更
        updateLayoutPattern()
        // ステートを更新
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    // ---------------------------------------------------------------------------------------------------------

    return (
        <>
            {/* <Stack mb="2.5%" mt="1.5%" direction={{
                base: "column",
                md: "row",
            }} space={2} mx={{
                base: "auto",
                md: "0"
            }}> */}
            <View style={SC210_Style.v03_Header}>
                <Button style={SC210_Style.v02_BackBtn} size="sm" variant="outline" colorScheme="primary" onPress={onClickSwitch_SC210_SC}>戻る</Button>
                <Heading size="md">{state.chatScreenPreInfo.talkName}</Heading>
            </View>
            {/* </Stack> */}
        </>
    )
}
