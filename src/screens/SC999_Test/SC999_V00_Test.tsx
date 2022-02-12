import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Center, NativeBaseProvider } from "native-base"
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
import { CHANGE_SCREEN } from './SC999_Action'
import {
    SC999_V01_Test_MainScreen,
    SC999_V01_Test_MenuBar1,
    SC999_V01_Test_MenuBar2,
    SC999_V01_Test_MenuBar3,
    SC999_V01_Test_MenuBar4,
} from "./SC999_V01_Test_MainScreen"
import { SC999_S_Provider, SC999_S_Context } from './SC999_Store'
import { SC999_Style } from "./SC999_Style"
import { SC999_COMPONENT_ID } from "./SC999_Const"

export const SC999_V00_Test = () => {
    return (
        <>
            <SC999_S_Provider>
                <View style={SC999_Style.testMainScreen}>
                    <SC999_V01_Test_MainScreen />
                </View>
                <View>
                    <SC999_V01_Test_MenuBar1 />
                    <SC999_V01_Test_MenuBar2 />
                    <SC999_V01_Test_MenuBar3 />
                    <SC999_V01_Test_MenuBar4 />
                </View>
            </SC999_S_Provider>
        </>
    )
}

// export const check_Required = (obj: any): boolean => {
//     let errFlg = true
//     if (obj == null) {
//         errFlg = false
//     } else if (obj == undefined) {
//         errFlg = false
//     } else if (obj == NaN) {
//         errFlg = false
//     }
//     return errFlg
// }