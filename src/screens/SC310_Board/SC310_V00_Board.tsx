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

export const SC310_V00_Board = (props: object) => {
    return (
        <SafeAreaView>
            <CC0010_ScreenTitle >掲示板画面</CC0010_ScreenTitle>
        </SafeAreaView>
    );
}
