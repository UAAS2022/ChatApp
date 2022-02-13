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
    Dimensions,
    ScrollView,
    NativeScrollEvent,
    NativeSyntheticEvent
} from 'react-native';
import {
    Divider,
} from "native-base"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { CHANGE_SCREEN } from './SC999_Action'
import { SC999_S_Provider, SC999_S_Context } from './SC999_Store'
import { SC999_Style } from "./SC999_Style"
import { SC999_COMPONENT_ID } from "./SC999_Const"
import {
    SC999_V01_ScreenController,
    SC999_V01_Test_MenuBar1,
    SC999_V01_Test_MenuBar2,
    SC999_V01_Test_MenuBar3,
    SC999_V01_Test_MenuBar4,
    SC999_V01_Test_MenuBar5,
} from "./SC999_V01_ScreenController"


export const SC999_V00_Test = () => {
    return (
        <>
            <SC999_S_Provider>
                <View style={SC999_Style.testMainScreen}>
                    <SC999_V01_ScreenController />
                </View>
                <Divider />
                <ScrollView>
                    <SC999_V01_Test_MenuBar1 />
                    <SC999_V01_Test_MenuBar2 />
                    <SC999_V01_Test_MenuBar3 />
                    <SC999_V01_Test_MenuBar4 />
                    <SC999_V01_Test_MenuBar5 />
                </ScrollView>
            </SC999_S_Provider>
        </>
    )
}
