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
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { SC010_Style } from "./SC010_Style";
import { CONST_SC000 } from '../../common/C000_Const';
import { useState_SC000_ScreenController } from '../SC000_BaseComponent/SC000_V00_BaseComponent'

export const SC010_V00_Init = (props: object) => {

    const [updateBaseScreenId] = useState_SC000_ScreenController()
    const onClickSwitch_SC011 = () => {
        // newStateを初期化
        updateBaseScreenId(CONST_SC000.SCREENINFO.SC020.SCREENID)
    }
    const onClickSwitch_SC012 = () => {
        updateBaseScreenId(CONST_SC000.SCREENINFO.SC110.SCREENID)
    }

    return (

        <View style={SC000_Style.v00_HeaderArea}>
            <Text style={SC010_Style.youkoso}> ようこそ</Text>
            <Text style={SC010_Style.youkoso2}> ここはUNKOのような国💩</Text>
            <Text style={SC010_Style.youkoso3}> UAASです</Text>
            <Button style={SC010_Style.button} onPress={onClickSwitch_SC011}>💩うんこになる💩</Button>
            <Button style={SC010_Style.button2} onPress={onClickSwitch_SC012}>💩すでにうんこ💩</Button>

        </View>
    )
}