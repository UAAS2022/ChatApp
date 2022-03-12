// View

import React, { useContext } from 'react';
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
import { SC000_S_Context } from "./SC000_Store"
import { SC000_Style } from "./SC000_Style"
import { SC000_UPDATE_LAYOUTPATTERN } from "./SC000_Action"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { CONST_SC000 } from "../../common/C000_Const"
import { SC110_V00_Home } from '../SC110_Home/SC110_V00_Home'
import { SC210_V00_TalkList } from '../SC210_TalkList/SC210_V00_TalkList'
import { SC310_V00_Board } from '../SC310_Board/SC310_V00_Board'
import { SC410_V00_Manage } from '../SC410_Manage/SC410_V00_Manage'
import { SC998_V00_Nabe } from '../SC998_Nabe/SC998_V00_Nabe'
import { SC999_V00_Test } from '../SC999_Test/SC999_V00_Test'
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

export const SC000_V01_MainScreenController = () => {
    try {
        const { state, dispatch } = useContext(SC000_S_Context)
        const { screenId } = state.screenControllerInfo
        console.log("C0000_Main:screenController----------------------")
        console.log("C0000_Main:screenId:", screenId)
        switch (screenId) {
            case CONST_SC000.SCREENID.SC110:
                return <SC110_V00_Home />
            case CONST_SC000.SCREENID.SC210:
                return <SC210_V00_TalkList />
            case CONST_SC000.SCREENID.SC310:
                return <SC310_V00_Board />
            case CONST_SC000.SCREENID.SC410:
                return <SC410_V00_Manage />
            case CONST_SC000.SCREENID.SC998:
                return <SC998_V00_Nabe />
            case CONST_SC000.SCREENID.SC999:
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

export const SC000_V01_MenuBarController = () => {
    try {
        const { state, dispatch } = useContext(SC000_S_Context)
        const { screenId, layoutPattern } = state.screenControllerInfo
        console.log("C0000_Main:screenController----------------------")
        console.log("C0000_Main:screenId:", screenId)
        switch (layoutPattern) {
            case 1:
                return (
                    <>
                        <Divider />
                        <SC000_V04_MenuBar />
                    </>
                )
            case 2:
                return (<></>)
            default:
                return (
                    <>
                        <Divider />
                        <SC000_V04_MenuBar />
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

// export const SC000_V01_MainScreen_bk = () => {
//     const { state } = useContext(SC000_S_Context)
//     const { screenId, layoutPattern } = state.screenControllerInfo
//     try {

//         return (
//             <>
//                 <SafeAreaView>
//                     <View style={SC000_Style.v01_MainScreen}>
//                         <SC000_V01_MainScreenController />
//                     </View>
//                     <SC000_V04_MenuBar />
//                 </SafeAreaView>
//             </>
//         )
//     } catch (error) {
//         if (error instanceof Error) {
//             sc950_V00_commonErr(error)
//         }
//         // throw(error)
//         return (<SC950_V00_Error />)
//     }
// }

export const SC000_V01_MainScreen = () => {
    try {
        const { state } = useContext(SC000_S_Context)
        const { screenId, layoutPattern } = state.screenControllerInfo
        console.log("C0000_Main:screenController----------------------")
        console.log("SC000_V01_MainScreen:", screenId, layoutPattern)
        switch (layoutPattern) {
            case 1:
                return (
                    <>
                        <SafeAreaView>
                            <View style={SC000_Style.v01_MainScreen}>
                                <SC000_V01_MainScreenController />
                            </View>
                            <Divider />
                            <SC000_V04_MenuBar />
                        </SafeAreaView>
                    </>
                )
            case 2:
                return (
                    <>
                        <View style={SC000_Style.v01_MainScreen_NoMenu}>
                            <SC000_V01_MainScreenController />
                        </View>
                    </>
                )
            default:
                return (
                    <>
                        <SafeAreaView>
                            <Text>case def</Text>
                            <View style={SC000_Style.v01_MainScreen}>
                                <SC000_V01_MainScreenController />
                            </View>
                            <Divider />
                            <SC000_V04_MenuBar />
                        </SafeAreaView>
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

export const useState_SC000_LayoutPattern = (screenId: string) => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    const newState = { ...baseState }
    newState.screenControllerInfo.layoutPattern = getLayoutPattern(screenId)

    const updateLayoutPattern = () => {
        // メニューバー非表示
        baseDispatch(SC000_UPDATE_LAYOUTPATTERN(newState.screenControllerInfo))
    }
    return [updateLayoutPattern]
}