import React from "react"
import { Button, Stack,Icon ,Modal, Center, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn,
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
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_Style } from './SC998_Style'

const log = () =>{
    console.log("あ")
}

export const SC998_V03_cmp3 = () => {
        return (
        <Stack mb="2.5" mt="1.5" direction={{
            base: "column",
            md: "row"
        }} space={2} mx={{
            base: "auto",
            md: "0"
        }}>
            <Button size="sm" variant="outline">
                PRIMARY
            </Button>
            <Button size="sm" variant="outline" colorScheme="secondary">
                SECONDARY
            </Button>
            <Button size="sm" variant="outline" isDisabled>
                DISABLED
            </Button>
        </Stack>
        )
                    };