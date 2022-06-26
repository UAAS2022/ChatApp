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
import { SC410_S_Provider } from './SC410_Store'
import { SC410_Style } from "./SC410_Style"
// import { SC000_Img, murata_unko } from "../../common/C000_Const"
import { SC410_V01_ScreenController } from "./SC410_V01_ScreenController"
// import {

//   } from 'react-native-admob'

const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V00_Manage = (props: object) => {
    return (
        <>
            <SC410_S_Provider>
                <SC410_V01_ScreenController />
            </SC410_S_Provider>
        </>
    );
}
