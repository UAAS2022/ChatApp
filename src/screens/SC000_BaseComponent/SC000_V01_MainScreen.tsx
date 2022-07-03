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
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { CONST_SC000 } from "../../common/C000_Const"
import { SC010_V00_Init } from '../SC010_Init/SC010_V00_Init';
import { SC020_V00_SignUp } from '../SC020_SignUp/SC020_V00_SignUp';
import { SC030_V00_SignIn } from '../SC030_SignIn/SC030_V00_SignIn';
import { SC110_V00_Home } from '../SC110_Home/SC110_V00_Home'
import { SC210_V00_TalkList } from '../SC210_TalkList/SC210_V00_TalkList'
import { SC310_V00_Board } from '../SC310_Board/SC310_V00_Board'
import { SC410_V00_Manage } from '../SC410_Manage/SC410_V00_Manage'
import { SC998_V00_Nabe } from '../SC998_Nabe/SC998_V00_Nabe'
import { SC999_V00_Test } from '../SC999_Test/SC999_V00_Test'
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

export const SC000_V01_MainScreen = () => {
    const { state } = useContext(SC000_S_Context)
    const { screenId, headerKbn, footerKbn } = state.screenControllerInfo
    // パターン１：ヘッダ非表示、フッタ非表示
    if (headerKbn == "0" && footerKbn == "0") {
        return (
            <>
                <SafeAreaView>
                    <View style={SC000_Style.v01_MainScreen_NoMenu}>
                        <SC000_V01_MainScreenController />
                    </View>
                </SafeAreaView>
            </>
        )
    }
    // パターン２：ヘッダ表示、フッタ表示
    else if (headerKbn == "0" && footerKbn != "0") {
        return (
            <>
                <SafeAreaView>
                    <View style={SC000_Style.v01_MainScreen}>
                        <SC000_V01_MainScreenController />
                    </View>
                    <View style={SC000_Style.v01_Hooter}>
                        <SC000_V01_HooterController />
                    </View>
                </SafeAreaView>
            </>
        )
    }
    else {
        return (
            <>
                <Text>不正なレイアウトパターンです。ヘッダ区分は「0」のみ許容してます。</Text>
            </>
        )
    }
}

export const SC000_V01_MainScreenController = () => {
    try {
        const { state, dispatch } = useContext(SC000_S_Context)
        const { screenId } = state.screenControllerInfo
        //console.log("C0000_Main:screenController----------------------")
        //console.log("C0000_Main:screenId:", screenId)
        switch (screenId) {
            case CONST_SC000.SCREENINFO.SC010.SCREENID:
                return <SC010_V00_Init />
            case CONST_SC000.SCREENINFO.SC020.SCREENID:
                return <SC020_V00_SignUp />
            case CONST_SC000.SCREENINFO.SC030.SCREENID:
                return <SC030_V00_SignIn />
            case CONST_SC000.SCREENINFO.SC110.SCREENID:
                return <SC110_V00_Home />
            case CONST_SC000.SCREENINFO.SC120.SCREENID:
                return <SC110_V00_Home />
            case CONST_SC000.SCREENINFO.SC210.SCREENID:
                return <SC210_V00_TalkList />
            case CONST_SC000.SCREENINFO.SC220.SCREENID:
                return <SC210_V00_TalkList />
            case CONST_SC000.SCREENINFO.SC310.SCREENID:
                return <SC310_V00_Board />
            case CONST_SC000.SCREENINFO.SC410.SCREENID:
                return <SC410_V00_Manage />
            case CONST_SC000.SCREENINFO.SC998.SCREENID:
                return <SC998_V00_Nabe />
            case CONST_SC000.SCREENINFO.SC999.SCREENID:
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

// ↓参照なし
export const SC000_V01_HeaderController = () => {
    try {
        const { state, dispatch } = useContext(SC000_S_Context)
        const { headerKbn } = state.screenControllerInfo
        // const layoutPattern = getLayoutPattern(screenId)
        //console.log("C0000_Main:screenController----------------------")
        //console.log("C0000_Main:screenId:", screenId, ",layoutPattern:", layoutPattern)
        switch (headerKbn) {
            case "0":
                return (
                    <>
                        <Divider />
                        <SC000_V04_MenuBar />
                    </>
                )
            case "1":
                return (
                    <>
                        <Divider />
                        <SC000_V04_MenuBar />
                    </>
                )
            default:
                return (
                    <>
                        <Divider />
                        <Text>Default</Text>
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

export const SC000_V01_HooterController = () => {
    try {
        const { state, dispatch } = useContext(SC000_S_Context)
        const { footerKbn, } = state.screenControllerInfo
        // const layoutPattern = getLayoutPattern(screenId)
        //console.log("C0000_Main:screenController----------------------")
        //console.log("C0000_Main:screenId:", screenId, ",layoutPattern:", layoutPattern)
        switch (footerKbn) {
            case "0":
                return (
                    <>
                        <Divider />
                        <SC000_V04_MenuBar />
                    </>
                )
            case "1":
                return (
                    <>
                        <Divider />
                        <SC000_V04_MenuBar />
                    </>
                )
            default:
                return (
                    <>
                        <Divider />
                        <Text>Default</Text>
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

// ↓参照なし（不要コンポーネント？）
export const SC000_V01_MainScreen_bk = () => {
    try {
        const { state } = useContext(SC000_S_Context)
        // const { screenId, layoutPattern } = state.screenControllerInfo
        const { screenId } = state.screenControllerInfo
        const layoutPattern = getLayoutPattern(screenId)
        //console.log("C0000_Main:screenController----------------------")
        //console.log("SC000_V01_MainScreen:", screenId, ",layoutPattern:", layoutPattern)
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
                            <Text>Default</Text>
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
