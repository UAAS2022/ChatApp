import React, { useState, useEffect, useContext } from 'react';
import { Button, Stack, Modal, Divider, Center, NativeBaseProvider } from "native-base"
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
import { SC998_V01_cmp1  }  from './SC998_V01_cmp1 '
import { SC998_V02_cmp2 } from './SC998_V02_cmp2'
import { SC998_V03_cmp3 } from './SC998_V03_cmp3'
import {SC998_S_Provider} from './SC998_Store'


export const SC998_V00_Nabe = () => {
 
    return (
        <SafeAreaView>
            <CC0010_ScreenTitle >なべ画面</CC0010_ScreenTitle>
            <Text>むらたはじめ</Text>

         <SC998_S_Provider>
            <SC998_V01_cmp1/>
            <SC998_V02_cmp2/>
            <SC998_V03_cmp3/>
        </SC998_S_Provider>
        </SafeAreaView>
    )
}