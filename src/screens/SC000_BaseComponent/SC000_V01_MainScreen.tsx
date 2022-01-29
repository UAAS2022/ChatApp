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
import { SC000_Style } from "./SC000_Style"
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC000_SCREENID } from "./SC000_Const"
import { SC110_V00_Home } from '../SC110_Home/SC110_V00_Home'
import { SC210_V00_TalkList } from '../SC210_TalkList/SC210_V00_TalkList'
import { SC310_V00_Board } from '../SC310_Board/SC310_V00_Board'
import { SC410_V00_Manage } from '../SC410_Manage/SC410_V00_Manage'
import { SC998_V00_Nabe } from '../SC998_Nabe/SC998_V00_Nabe'
import { SC999_V00_Test } from '../SC999_Test/SC999_V00_Test'
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

export const SC000_V01_MainScreenCmp = () => {
    try {
        const { state, dispatch } = useContext(SC000_S_Context)
        const { screenId } = state.screenControllerInfo
        console.log("C0000_Main:screenController----------------------")
        console.log("C0000_Main:screenId:", screenId)
        switch (screenId) {
            case SC000_SCREENID.SC110:
                return <SC110_V00_Home />
            case SC000_SCREENID.SC210:
                return <SC210_V00_TalkList />
            case SC000_SCREENID.SC310:
                return <SC310_V00_Board />
            case SC000_SCREENID.SC410:
                return <SC410_V00_Manage />
            case SC000_SCREENID.SC998:
                return <SC998_V00_Nabe />
            case SC000_SCREENID.SC999:
                return <SC999_V00_Test />
            default:
                return <SC110_V00_Home />
        }
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        // throw(error)
        return (<SC950_V00_Error />)
    }


}

export const SC000_V01_MainScreen = () => {
    try {
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
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        // throw(error)
        return (<SC950_V00_Error />)
    }

}