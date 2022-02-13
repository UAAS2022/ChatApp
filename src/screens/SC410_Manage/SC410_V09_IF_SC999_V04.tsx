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
import { CHANGE_SCREEN } from "./SC410_Action"
import { SC410_S_Context } from "./SC410_Store"
import { SC410_Style } from "./SC410_Style"
import { SC410_V05_ManageHeader } from "./SC410_V05_ManageHeader"
import { SC999_V04_Chat_Demo } from "../SC999_Test/SC999_V04_Chat_Demo"

export const SC410_V09_IF_SC999_V04 = (props: object) => {
    return (
        <>
            <SC410_V05_ManageHeader />
            <Divider />
            <SC999_V04_Chat_Demo />
        </>
    )
}
