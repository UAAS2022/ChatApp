import React, { useState, useEffect } from 'react';
import { Center, VStack, Button, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn, View, Platform, Pressable, Image, Text, Alert
} from 'react-native';
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
            <Button style={{ width: 200, height: 200 }} onPress={pickImage} >
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            </Button>
            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SimpleBtn title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View> */}
        </>
    );
}
