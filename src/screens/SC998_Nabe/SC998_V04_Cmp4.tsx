import React from "react"
import { Button, Modal, HStack,Avatar,Center, NativeBaseProvider } from "native-base"
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
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_Style } from './SC998_Style'

const log = () =>{
    console.log("あ")
}

export const SC998_V04_Cmp4  = () => {
    return <HStack justifyContent="center" space={2}>
        <Avatar bg="green.500" size="2xl" source={ require("../../static/img/kanna.jpeg")}>
          </Avatar>
          </HStack>
          }