import React, { useState, useEffect, useContext } from 'react';
import { Button, Stack,Icon ,Modal, Center, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn,
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
import { SC998_Style } from './SC998_Style'
import { SC998_S_Context } from './SC998_Store';
import { UPDATE_MURATA } from './SC998_Action';

export const SC998_V03_Cmp3 = () => {
    const { state, dispatch } = useContext(SC998_S_Context)
    const jim = ()=> {
    // 取得したstateの値を更新する（+1）
     state.murataInfo.murata = "GOD"
    // 更新後のmurataInfoオブジェクトをUPDATE_murata関数の引数に指定し、結果(Action)を取得する
    // Actionを引数に指定し、dispatchする
     dispatch(UPDATE_MURATA(state.murataInfo)) 
    }
    const ukman = () => {
        state.murataInfo.murata = "うんこ"
        dispatch(UPDATE_MURATA(state.murataInfo)) 
    }
        return (
        // <Stack mb="2.5" mt="1.5" direction={{
        //     base: "column",
        //     md: "row"
        // }} space={2} mx={{
        //     base: "auto",
        //     md: "0"
        // }}>
        <>
        <View style={SC998_Style.v00_btnpozi2}>
            <Button size="sm" variant="outline" style={SC998_Style.v00_muratapozi2} onPress={jim} >
                PRIMARY
            </Button>
            <Button size="sm" variant="outline" colorScheme="secondary" 
            style={SC998_Style.v00_muratapozi2} onPress={ukman}>
                SECONDARY
            </Button>
            <Button size="sm" variant="outline" isDisabled style={SC998_Style.v00_muratapozi2} >
                DISABLED
            </Button>
         </View>
        </>
        // </Stack>
        )
                    };