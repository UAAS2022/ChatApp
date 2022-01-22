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

export const SC210_TalkList = (props: object) => {
    return (
        <SafeAreaView>
            <CC0010_ScreenTitle >トーク一覧画面</CC0010_ScreenTitle>
        </SafeAreaView>
    );
}
