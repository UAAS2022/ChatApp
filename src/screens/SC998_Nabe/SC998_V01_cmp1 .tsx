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
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_S_Context } from './SC998_Store';

export const SC998_V01_cmp1 = () => {
    const { state, dispatch } = useContext(SC998_S_Context)

    return (
        <>
            <Text>{state.murataInfo.murata}</Text>
        </>
    )
}