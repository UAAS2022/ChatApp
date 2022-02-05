import React from "react"
import { Button, Modal, Center, NativeBaseProvider } from "native-base"
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

export const SC998_V02_Cmp2 = () => {
    return (
        <>
            <Text>こ</Text>
            <View style={SC998_Style.v00_nabebts}>
                <SimpleBtn title="ぼたん" onPress={log} />  

            </View>
        </>
    )
}