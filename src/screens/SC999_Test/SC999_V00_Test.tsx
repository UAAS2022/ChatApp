import React from "react"
import { Button, Modal, Center, NativeBaseProvider } from "native-base"
import {
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
import { SC999_V01_Example } from "./SC999_V01_Example"

export const SC999_V00_Test = () => {
    return (
        <SafeAreaView>
            <SC999_V01_Example />
        </SafeAreaView>
    )
}