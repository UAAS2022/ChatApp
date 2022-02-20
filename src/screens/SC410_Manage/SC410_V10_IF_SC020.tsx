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
import { SC410_V05_ManageHeader } from "./SC410_V05_ManageHeader"
import { SC999_V04_Chat_Demo } from "../SC999_Test/SC999_V04_Chat_Demo"
import { SC020_V00_SignUp } from '../SC020_SignUp/SC020_V00_SignUp';

export const SC410_V10_IF_SC020 = (props: object) => {
    return (
        <>
            <SC410_V05_ManageHeader />
            <Divider />
            <SC020_V00_SignUp />
        </>
    )
}
