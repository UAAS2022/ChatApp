// View

import React, { useState, useEffect, useContext } from 'react';
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
import { SC000_S_BaseComponentProvider } from './SC000_Store'
import { SC000_V01_MainScreen } from './SC000_V01_MainScreen'
import { SC000_S_BaseComponentContext } from "./SC000_Store"
import { SC000_Style } from "./SC000_Style"
import { sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"

export const SC000_V00_BaseComponent = () => {
    try {
        return (
            <>
                <SC000_S_BaseComponentProvider>
                    <View style={SC000_Style.v00_BaseComponent}>
                        <SC000_V01_MainScreen />
                    </View>
                </SC000_S_BaseComponentProvider>
            </>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        throw error
    }
}