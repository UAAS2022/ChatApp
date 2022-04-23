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
    Image,
    ScrollView,
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC410_Style } from "./SC410_Style"
// import { SC000_Img, murata_unko } from "../../common/C000_Const"


const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V03_TopArea = (props: object) => {
    const data = [{
        data: ["violet.100", "violet.200", "violet.300", "violet.400", "violet.500"]
    }];
    return (
        <>
            <Image source={require(Path)} resizeMode='contain' style={SC410_Style.v00_murata} />
        </>
    )
}
