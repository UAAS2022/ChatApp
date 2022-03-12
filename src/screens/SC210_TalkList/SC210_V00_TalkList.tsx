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
import { SC210_V01_ScreenController } from "./SC210_V01_ScreenController"

export const SC210_V00_TalkList = (props: object) => {
    return (
        <>
            <Provider_SC210>
                <SC210_V01_ScreenController />
            </Provider_SC210>
        </>
    );
}
