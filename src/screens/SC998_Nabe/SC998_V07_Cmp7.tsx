import React from "react"
import { Center, VStack, Button, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn, View, StyleSheet, Pressable, Image, Text, Alert
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_Style } from './SC998_Style'
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { MediaType } from "react-native-image-picker";

export const SC998_V07_Cmp7 = () => {
    const options = {
        mediaType: 'photo' as MediaType
    }
    const testFunc = () => {
        Alert.alert("成功",
            "成功しました。",
            [{ text: 'OK', onPress: () => { } }]
        )
    }

    const onPressEvent = () => {
        launchImageLibrary(options, testFunc)
    }
    const onPressEvent2 = () => {
        launchCamera(options, testFunc)
    }
    // ImagePicker.showImagePicker(options,
    //     (response) => { // このresponseに選択された画像または処理結果が入っています。
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       }
    //       else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       }
    //       else {
    //         // キャンセルまたはエラーではないので、画像が選択されています
    //         let source = { uri: response.uri }; // response.uriに選択された画像を表すURIが入っています。
    //       }
    //     }
    //   );
    return (
        <>
            <View style={SC998_Style.v00_btnpozi2}>
                <Button size="md" variant="outline" style={SC998_Style.v00_glasspozi2} onPress={onPressEvent}>
                    イメージ
                </Button>
            </View>
        </>
        // </Stack>

    )
};