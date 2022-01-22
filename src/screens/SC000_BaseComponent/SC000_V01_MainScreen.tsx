// View

import React, { useContext } from 'react';
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    Button,
    FlatList,
    Alert
} from 'react-native';
import { SC000_S_Context } from "./SC000_Store"
import { SC110_Home } from '../SC110_Home/SC110_V00_Home'
import { SC210_TalkList } from '../SC210_TalkList/SC210_V00_TalkList'
import { SC000_Style } from "./SC000_Style"
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"

export const SC000_V01_MainScreenCmp = () => {
    const { state, dispatch } = useContext(SC000_S_Context)
    const { screenId } = state.screenControllerInfo
    console.log("C0000_Main:screenController----------------------")
    console.log("C0000_Main:screenId:", screenId)
    switch (screenId) {
        case "SC110":
            return <SC110_Home />
        case "SC210":
            return <SC210_TalkList />
        default:
            return <SC110_Home />
    }

}

export const SC000_V01_MainScreen = () => {
    const { state, dispatch } = useContext(SC000_S_Context)
    const { screenId, layoutPattern } = state.screenControllerInfo
    console.log("C0000_Main:screenController----------------------")
    console.log("SC000_V01_MainScreen:", screenId, layoutPattern)
    switch (layoutPattern) {
        case 1:
            return (
                <>
                    <View style={SC000_Style.v01_MainScreen}>
                        <Text>case 1</Text>
                        <SC000_V01_MainScreenCmp />
                        <SC000_V04_MenuBar />
                    </View>
                </>
            )
        case 2:
            return (
                <>
                    <View style={SC000_Style.v01_MainScreen}>
                        <Text>case 2</Text>
                        <SC000_V01_MainScreenCmp />
                    </View>
                </>
            )
        default:
            return (
                <>
                    <View style={SC000_Style.v01_MainScreen}>
                        <Text>case def</Text>
                        <SC000_V01_MainScreenCmp />
                        <SC000_V04_MenuBar />
                    </View>
                </>
            )
    }
}