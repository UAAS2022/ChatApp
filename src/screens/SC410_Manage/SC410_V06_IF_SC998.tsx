// View

import React, { useState, useEffect, useContext } from 'react';
import {
    Divider,
} from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    // Text,
    // Button,
    FlatList,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import { SC410_V05_ManageHeader } from "./SC410_V05_ManageHeader"
import { SC998_V00_Nabe } from "../SC998_Nabe/SC998_V00_Nabe"

export const SC410_V06_IF_SC998 = (props: object) => {
    return (
        <>
            <SC410_V05_ManageHeader />
            <Divider />
            <SC998_V00_Nabe />
        </>


    )
}
