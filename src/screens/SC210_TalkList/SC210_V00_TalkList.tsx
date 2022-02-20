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
    Alert
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_V04_MenuBar } from "../SC000_BaseComponent/SC000_V04_MenuBar"
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { Provider_SC210 } from "./SC210_Store"
import { SC210_V01_TalkList } from "./SC210_V01_TalkList"

export const SC210_V00_TalkList = (props: object) => {
    return (
        <>
            <View style={SC000_Style.v00_HeaderArea}>
                <CC0010_ScreenTitle >トーク一覧画面</CC0010_ScreenTitle>
            </View>
            <Provider_SC210>
                <SC210_V01_TalkList />
            </Provider_SC210>
        </>
    );
}
