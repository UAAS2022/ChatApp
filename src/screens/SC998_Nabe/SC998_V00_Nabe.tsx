import React from "react"
import { Button, Stack, Modal, Divider, Center, NativeBaseProvider } from "native-base"
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
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'

export const SC998_V00_Nabe = () => {
    return (
        <SafeAreaView>
            <CC0010_ScreenTitle >なべ画面</CC0010_ScreenTitle>
            <Text>むらたはじめ</Text>
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
            <Divider w="100%" />
        </SafeAreaView>
    )
}