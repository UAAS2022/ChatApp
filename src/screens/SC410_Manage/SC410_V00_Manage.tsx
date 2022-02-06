// View

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    Button,
    FlatList,
    Alert,
    Image
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC410_Style } from "./SC410_Style"
import { SC000_Img, murata_unko } from "../SC000_BaseComponent/SC000_Const"


const Path = "../../static/img" + "/murata_unko.jpeg"

export const SC410_V00_Manage = (props: object) => {
    return (
        <SafeAreaView>
            <CC0010_ScreenTitle >管理メニュー画面</CC0010_ScreenTitle>
                <Image source={require(Path)} resizeMode='contain' style={SC410_Style.v00_murata} />
                {/* <Image source={require(SC000_Img.god)} resizeMode='contain' style={SC410_Style.v00_murata} /> */}
        </SafeAreaView>
    );
}
