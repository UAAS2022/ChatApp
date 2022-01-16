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
import type { SC000_T_ScreenChangeBtnInfo } from "../SC000_BaseComponent/SC000_Types"
import { GO_TO_SC010, GO_TO_SC020, GO_TO_SC021 } from "../SC000_BaseComponent/SC000_Action"
import { SC000_Style } from "./SC000_Style"

export const SC000_V04_MenuBar = (props: object) => {
    const menuBtn1: SC000_T_ScreenChangeBtnInfo = { buttonId: "HOME", buttonName: "HOME", nextScreenId: "SC010", action: GO_TO_SC010 }
    const menuBtn2: SC000_T_ScreenChangeBtnInfo = { buttonId: "TalkList", buttonName: "Talk", nextScreenId: "SC020", action: GO_TO_SC020 }
    const menuBtn3: SC000_T_ScreenChangeBtnInfo = { buttonId: "Boad", buttonName: "Boad", nextScreenId: "SC021", action: GO_TO_SC021 }
    const menuBtn4: SC000_T_ScreenChangeBtnInfo = { buttonId: "Manage", buttonName: "Manage", nextScreenId: "SC040", action: GO_TO_SC010 }
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
