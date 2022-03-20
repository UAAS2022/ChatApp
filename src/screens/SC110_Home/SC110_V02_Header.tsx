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
import { CONST_SC000, CONST_SC110 } from "../../common/C000_Const"
import { SC000_CHANGE_SCREEN } from "../SC000_BaseComponent/SC000_Action"
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { useState_SC000_LayoutPattern, useState_SC000_ScreenController } from "../SC000_BaseComponent/SC000_V00_BaseComponent"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { CHANGE_SCREEN } from "./SC110_Action"
import { Context_SC110 } from "./SC110_Store"
import { SC110_Style } from "./SC110_Style"


export const SC110_V02_Header = (props: any) => {
    // B:スクリーンコンテキストで表示切り替え情報を管理した場合----------------------------------------------------------
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②画面コンテキストを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(Context_SC110)

    // ④カスタムフック呼び出し
    // const [updateLayoutPattern] = useState_SC000_LayoutPattern(CONST_SC000.SCREENID.SC110)
    const [updateBaseScreenId] = useState_SC000_ScreenController()

    // CS210への遷移関数
    const onClickSwitch_SC110_SC = () => {
        // 取得したstateの値を更新する
        let newState = { ...screenState }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.componentId = CONST_SC110.COMPONENT_ID.V03
        // newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENID.SC110)
        // // // レイアウトパターン変更
        // updateLayoutPattern()
        // ステートを更新
        screenDispatch(CHANGE_SCREEN(newState.screenControllerInfo))
        // BaseContextの画面情報更新
        updateBaseScreenId(CONST_SC000.SCREENID.SC110)
        console.log("SC110_V02_Header_newState.screenControllerInfo", newState.screenControllerInfo)
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
            <View style={SC000_Style.v99_Header}>
                <Button style={SC000_Style.v99_BackBtn} size="sm" variant="outline" colorScheme="primary" onPress={onClickSwitch_SC110_SC}>戻る</Button>
            </View>
            {/* </Stack> */}
        </>
    )
}
