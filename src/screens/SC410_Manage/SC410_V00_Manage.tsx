// View

import React, { useState, useEffect } from 'react';
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
import { SC410_Style } from "./SC410_Style"
// import { SC000_Img, murata_unko } from "../../common/C000_Const"
import { SC410_V01_TopArea } from "./SC410_V01_TopArea"
import { SC410_V02_SectionList } from "./SC410_V02_SectionList"


const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V00_Manage = (props: object) => {
    return (
        <>
            <View style={SC000_Style.v00_HeaderArea}>
                <CC0010_ScreenTitle >管理メニュー画面</CC0010_ScreenTitle>
            </View>
            <Divider />
            <View style={SC410_Style.v00_TopArea}>
                <SC410_V01_TopArea />
            </View>
            {/* <Image source={require(SC000_Img.god)} resizeMode='contain' style={SC410_Style.v00_murata} /> */}
            <View style={SC410_Style.v00_BottomArea}>
                <SC410_V02_SectionList />
            </View>
        </>
    );
}
