import React, { useState, useEffect } from 'react';
import { Center, VStack, Button, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn, View, Platform, Pressable, Image, Text, Alert
} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_Style } from './SC998_Style'
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { MediaType } from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';

export const SC998_V07_Cmp7 = () => {
    const [image, setImage] = useState("https://instagrammernewsimg.s3.ap-northeast-1-ntt.wasabisys.com/CAWoZoPlcx7");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result);
            console.log(typeof (result.uri));
            setImage(result.uri);
        }
    };

    return (
        <>
            <SimpleBtn title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SimpleBtn title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View> */}
        </>
    );
};

// export const SC998_V07_Cmp7 = () => {
//     const options = {
//         mediaType: 'photo' as MediaType
//     }
//     const testFunc = () => {
//         Alert.alert("成功",
//             "成功しました。",
//             [{ text: 'OK', onPress: () => { } }]
//         )
//     }

//     const onPressEvent = async () => {
//         await launchImageLibrary(options, testFunc)
//     }
//     const onPressEvent2 = () => {
//         launchCamera(options, testFunc)
//     }
//     // ImagePicker.showImagePicker(options,
//     //     (response) => { // このresponseに選択された画像または処理結果が入っています。
//     //       if (response.didCancel) {
//     //         console.log('User cancelled image picker');
//     //       }
//     //       else if (response.error) {
//     //         console.log('ImagePicker Error: ', response.error);
//     //       }
//     //       else {
//     //         // キャンセルまたはエラーではないので、画像が選択されています
//     //         let source = { uri: response.uri }; // response.uriに選択された画像を表すURIが入っています。
//     //       }
//     //     }
//     //   );
//     return (
//         <>
//             <View style={SC998_Style.v00_btnpozi2}>
//                 <Button size="md" variant="outline" style={SC998_Style.v00_glasspozi2} onPress={onPressEvent}>
//                     イメージ
//                 </Button>
//             </View>
//         </>
//         // </Stack>

//     )
// };