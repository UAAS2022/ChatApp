import React, { useState, useEffect, useContext, Component } from 'react';
import {
    Button,
    Stack,
    Icon,
    Modal,
    Center,
    NativeBaseProvider,
    Heading,
    Flex,
    Divider,
    Input,
} from "native-base"
import {
    Button as Button_Def,
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    FlatList,
    Alert,
    Dimensions,
    ScrollView,
    NativeScrollEvent,
    NativeSyntheticEvent,
    NativeModules,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC999_Style } from "./SC999_Style"
import type { SC999_ChatMessageInfo, SC999_V20_MessageItem } from './SC999_Types'
import { CONST_SC999_V20 } from "./SC999_Const"
import { c010_UaasUtil_isNotBlank, c010_UaasUtil_isNotEmpty } from '../../common/C010_UaasUtil'
import { s310_CreateChatMessage } from "../../service/S310_CreateChatMessage"
import { UPDATE_V19 } from './SC999_Action'
import { SC999_S_Context } from "./SC999_Store"
import { s351_SelectChatMessageList_New } from "../../service/S351_SelectChatMessageList_New"
import { s352_SelectChatMessageList_RealTime } from "../../service/S352_SelectChatMessageList_RealTime"
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { MediaType } from "react-native-image-picker";
import { s360_FileUpload } from "../../service/S360_FileUpload"

// 業務エラーチェッククラス
const check = (chatMessageInfo: SC999_ChatMessageInfo): boolean => {
    let errFlg = true
    // //console.log("checkchatMessageInfo", chatMessageInfo)
    // if (!c010_UaasUtil_isNotBlank(chatMessageInfo.talkId)) {
    //     Alert.alert('エラー', 'トークIDを入力してください。')
    //     errFlg = false
    // }
    // if (!c010_UaasUtil_isNotBlank(chatMessageInfo.sendUserId)) {
    //     Alert.alert('エラー', '送信ユーザIDを入力してください。')
    //     errFlg = false
    // }
    return errFlg
}

const TALKID = CONST_SC999_V20.talkId

const DEFAULT_OPTIONS = {
    mediaType: 'photo',
    videoQuality: 'high',
    quality: 1,
    maxWidth: 0,
    maxHeight: 0,
    includeBase64: false,
    cameraType: 'back',
    selectionLimit: 1,
    saveToPhotos: false,
    durationLimit: 0,
    includeExtra: false,
};

export const SC999_V24_AnyTest = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)

    // ローカルステートを定義する
    const [chatMessageInfo, setChatMessageInfo] = useState<SC999_ChatMessageInfo>({} as SC999_ChatMessageInfo);
    const [chatMessageInfoList, setChatMessageInfoList] = useState<SC999_ChatMessageInfo[]>([{}] as SC999_ChatMessageInfo[]);

    // ベースコンテキストからユーザ情報を取得する
    const loginUserId = baseState.loginUserInfo.userId

    return (
        <>
            <Text>テスト24</Text>
            <ScrollView >
                <SC999_V24_InputFile />
                <SC999_V24_ImagePicker />
                <SC999_V24_ImagePicker2 />
                <App />
                <SC999_V24_Upload2Firebase />
            </ScrollView >
        </>
    )
}

// ----------------------------------------------------------------------
const SC999_V24_InputFile = () => {
    const onChangeAvatar = () => {
        //ダイアログ
        Alert.alert("成功",
            "ログイン処理に成功しました。",
            [{ text: 'OK', onPress: () => { } }]
        )
    }
    return (
        <>
            <Input
                display="none"
                type="file"
                placeholder="ヘッダー"
                onChange={onChangeAvatar}
            />
        </>
    )
}

// ----------------------------------------------------------------------
const SC999_V24_ImagePicker = () => {
    const options = {
        mediaType: 'photo' as MediaType
    }
    const testFunc = () => {
        Alert.alert("成功",
            "成功しました。",
            [{ text: 'OK', onPress: () => { } }]
        )
    }

    const onPressEvent = async () => {
        await launchImageLibrary(options, testFunc)
        // testFunc()
    }
    const onPressEvent2 = () => {
        launchCamera(options, testFunc)
    }
    return (
        <>
            <View >
                <Button size="md" variant="outline" onPress={onPressEvent}>
                    イメージ
                </Button>
            </View>
        </>
    )
}
// ----------------------------------------------------------------------
const SC999_V24_ImagePicker2 = () => {
    const showPicker = async () => {
        let ImagePicker = await require('react-native-image-picker')

        let options = {
            title: '画像を選択',
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        }

        // ImagePicker.showImagePicker(options, (response: any) => {
        await ImagePicker.launchCamera(options, (response: any) => {
            console.log("response:", response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log(response.uri)
                // this.setState({image: response.uri})
            }
        });
    }
    return (
        <>
            <View >
                <Button size="md" variant="outline" onPress={showPicker}>
                    イメージピッカー2(launchCamera)
                </Button>
            </View>
        </>
    )
}

// ----------------------------------------------------------------------
type Props = {};
export default class App extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {
            image: null,
        }
    }

    showPicker = async () => {
        let ImagePicker = await require('react-native-image-picker')
        console.log(1)
        console.log(ImagePicker)
        let options = {
            title: '画像を選択',
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        }
        console.log(2)
        NativeModules.ImagePickerManager.launchImageLibrary(DEFAULT_OPTIONS)
        console.log(3)
        // ImagePicker.showImagePicker(options, (response: any) => {
        await ImagePicker.launchImageLibrary(options, (response: any) => {
            console.log("response:", response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log(response.uri)
                this.setState({ image: response.uri })
            }
        });
        console.log(4)
    }

    render() {
        return (
            <>
                <View >
                    <Button size="md" variant="outline" onPress={this.showPicker}>
                        イメージピッカー3(launchImageLibrary)
                    </Button>
                </View>
            </>
        );
    }
}
// ----------------------------------------------------------------------
const SC999_V24_Upload2Firebase = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // アップロード
    const userId = baseState.loginUserInfo.userId
    // File定義
    const imageFile: File = require("../../static/img" + "/murata_unko.jpeg")
    // 実行関数定義
    const onPressUpload = async () => {
        await s360_FileUpload(userId, imageFile)

    }
    return (
        <>
            <View >
                <Button size="md" variant="outline" onPress={onPressUpload}>
                    onPressUpload
                </Button>
            </View>
        </>
    );
}


// ----------------------------------------------------------------------
