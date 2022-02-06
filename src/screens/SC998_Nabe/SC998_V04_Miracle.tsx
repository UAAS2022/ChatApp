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
import { SC998_Style } from './SC998_Style'; 
import { SC000_Img, murata_unko } from "../SC000_BaseComponent/SC000_Const"


// const Path1 = "../../static/img" + "/murata_unko.jpeg"
// const Path2 = "../../static/img" + "/god_god.jpeg"
// const Path3 = "../../static/img" + "/murata_anime.jpeg"

export const SC998_V04_Miracle = (props: object) => {
    const Path1 = "../../static/img" + "/murata_unko.jpeg"
    const Path2 = "../../static/img" + "/god_god.jpeg"
    const Path3 = "../../static/img" + "/murata_anime.jpeg"
    return (
        <SafeAreaView>
            <CC0010_ScreenTitle >管理メニュー画面</CC0010_ScreenTitle>
                <Image source={require(Path1)} resizeMode='contain' style={SC998_Style.v00_muratapozi3} />
                <Image source={require(Path2)} resizeMode='contain' style={SC998_Style.v00_muratapozi4} />
                <Image source={require(Path3)} resizeMode='contain' style={SC998_Style.v00_muratapozi5} />
                {/* <Image source={require(SC000_Img.god)} resizeMode='contain' style={SC410_Style.v00_murata} /> */}
        </SafeAreaView>
    );
}
