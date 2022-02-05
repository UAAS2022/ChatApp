import React, { useState, useEffect, useContext } from 'react';
import { Button, Stack, Icon, Modal, Center, NativeBaseProvider } from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    FlatList,
    Alert,
    Dimensions
} from 'react-native';
import { SC999_S_Context } from "./SC999_Store"
import { SC999_Style } from "./SC999_Style"
import { SC999_COMPONENT_ID } from "./SC999_Const"
import { SC999_V03_Example } from "./SC999_V03_Example"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

export const SC999_V02_Default = () => {
    return (
        <>
            <Text>テスト初期画面</Text>
        </>
    )
}