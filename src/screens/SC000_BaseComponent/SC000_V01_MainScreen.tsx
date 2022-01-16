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
import { SC000_S_BaseComponentContext } from "./SC000_Store"
import { SC010_Home } from '../SC010_Home/SC010_V00_Home'
import { SC020_TalkList } from '../SC020_TalkList/SC020_V00_TalkList'
import { SC000_Style } from "./SC000_Style"
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"

export const SC000_V01_MainScreenCmp = () => {

    const { screenId } = useContext(SC000_S_BaseComponentContext).screenControllerObj
    console.log("C0000_Main:screenController----------------------")
    console.log("C0000_Main:screenId:", screenId)
    switch (screenId) {
        case "SC010":
            return <SC010_Home />
        case "SC020":
            return <SC020_TalkList />
        default:
            return <SC010_Home />
    }

}

export const SC000_V01_MainScreen = () => {
    const { screenId, layoutPattern } = useContext(SC000_S_BaseComponentContext).screenControllerObj
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