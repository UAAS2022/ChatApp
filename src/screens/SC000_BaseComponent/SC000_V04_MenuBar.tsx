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
import { CC0020_MenuBtn } from '../SC000_BaseComponent/SC000_V03_MenuBtn'
import type { SC000_ScreenChangeBtnInfo } from "../SC000_BaseComponent/SC000_Types"
// import { GO_TO_SC110, GO_TO_SC210, GO_TO_SC021 } from "../SC000_BaseComponent/SC000_Action"
import { SC000_Style } from "./SC000_Style"

export const SC000_V04_MenuBar = (props: object) => {
    const menuBtn1: SC000_ScreenChangeBtnInfo = { buttonId: "HOME", buttonName: "HOME", nextScreenId: "SC110" }
    const menuBtn2: SC000_ScreenChangeBtnInfo = { buttonId: "TalkList", buttonName: "Talk", nextScreenId: "SC210" }
    const menuBtn3: SC000_ScreenChangeBtnInfo = { buttonId: "Boad", buttonName: "Boad", nextScreenId: "SC310" }
    const menuBtn4: SC000_ScreenChangeBtnInfo = { buttonId: "Manage", buttonName: "Manage", nextScreenId: "SC410", }
    return (
        <>
            <View style={SC000_Style.v04_MenuBar}>
                <CC0020_MenuBtn btnInfo={menuBtn1} />
                <CC0020_MenuBtn btnInfo={menuBtn2} />
                <CC0020_MenuBtn btnInfo={menuBtn1} />
                <CC0020_MenuBtn btnInfo={menuBtn4} />
            </View>
        </>
    );
}
