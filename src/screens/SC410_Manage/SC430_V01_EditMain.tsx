import React, { useState, useMemo, useEffect, useContext } from 'react';
import {
    Select,
    Stack,
    Box,
    Input,
    Button,
    Center,
    CheckIcon
} from "native-base"
import {
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import { SC420_ScreenInfo, SC410_UserProfileInfo } from './SC410_Types';
import { s120_UpdateUser } from '../../service/S120_UpdateUser';
import * as ImagePicker from 'expo-image-picker';
import { s370_FileDownload } from '../../service/S370_FileDownload';
import { s361_ProfileImageUpload } from '../../service/S361_ProfileImageUpload';
import { SC000_S_Context } from '../../screens/SC000_BaseComponent/SC000_Store'

export const SC430_V01_EditMain = () => {

    // ①BaseContextを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    const defaultState = {
        userProfileInfo: {
            userId: baseState.loginUserInfo.userId,
            userName: baseState.loginUserInfo.userName,
            comment: baseState.loginUserInfo.comment,
            LatestLoginDatetime: String(baseState.loginUserInfo.LatestLoginDatetime),
            profileImagePath: baseState.loginUserInfo.profileImagePath,
            genderCd: baseState.loginUserInfo.genderCd,
            age: baseState.loginUserInfo.age,
            areaCd: baseState.loginUserInfo.areaCd,
            hashtag: baseState.loginUserInfo.hashtag,
        } as SC410_UserProfileInfo
    } as SC420_ScreenInfo

    const [localState, setLocalState] = useState<SC420_ScreenInfo>(defaultState);
    const [localState_ImagePath, setLocalState_ImageUri] = useState("100_User/" + defaultState.userProfileInfo.userId + "/" + "profile.png");
    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...localState, userId: value }
        setLocalState(newState)
        console.log("userId", newState.userId)

    }
    // パスワード
    const onChangePassword = (value: string) => {
        const newState = { ...localState, password: value }
        setLocalState(newState)
        console.log("password", newState.password)
    }
    //ユーザ名
    const onChangeUserName = (value: string) => {
        const newState = { ...localState, userName: value }
        setLocalState(newState)
        console.log("userName", newState.userName)
    }
    //雌雄
    const onChangegenderCd = (value: string) => {
        const newState = { ...localState, genderCd: value }
        setLocalState(newState)
        console.log("genderCd", newState.genderCd)
    }
    //コメント
    const onChangeComment = (value: string) => {
        const newState = { ...localState, comment: value }
        setLocalState(newState)
        console.log("comment", newState.comment)
    }
    //取り込んでから
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log("result.uri", result.uri)
            setLocalState_ImageUri(result.uri);
        }
    };
    //送るのだ！
    const uploadProfileImage = () => {
        // ローカルStateから情報を取得する
        const userId = localState.userProfileInfo.userId
        // プロフィール画像をアップロードする
        s361_ProfileImageUpload(localState.userProfileInfo.userId, localState_ImagePath)
    }


    const editM050 = async () => {
        uploadProfileImage()
        const userId = localState.userProfileInfo.userId
        const userName = localState.userProfileInfo.userName
        const comment = localState.userProfileInfo.comment
        const genderCd = localState.userProfileInfo.genderCd
        const profileImagePath = ""
        const age = 5
        const areaCd = "1"
        const hashtags = "1"
        const logUserId = localState.userProfileInfo.userId
        await s120_UpdateUser(
            userId,
            userName,
            comment,
            genderCd,
            profileImagePath,
            age,
            areaCd,
            hashtags,
            logUserId
        )

    }
    const initMain = async () => {
        // デフォルトの画像パスを取得してstateに入れる
        const result_S370 = await s370_FileDownload("100_User/" + defaultState.userProfileInfo.userId + "/" + "profile.png")
        const defaultProfileImagePath = result_S370.fileUrl
        setLocalState_ImageUri(defaultProfileImagePath)
    }
    //初期画像を出すために入れた
    useEffect(() => {

        initMain()
    }, []);

    const onClickSinUpBtn = async () => {
        let errFlg = "0"
        // 画像をアップロードする
        if (errFlg === "0") {
            // 画像をアップロードする
            uploadProfileImage()
            // ログイン処理を実行する
            // 1. ユーザIDとパスワードからログインする
        }
        // // M050生成
        // createM050()
        // // M051生成
        // createM051()
    }
    return (
        <>
            <Box>
                <Button style={{ width: 150, height: 150 }} onPress={pickImage} >
                    <Image source={{ uri: localState_ImagePath }} style={{ width: 150, height: 150 }} />
                </Button>
                <Text>{"\n"}</Text>
                <Box alignSelf="flex-start" bg="primary.500" _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg"
                }}>
                    ユーザーID
                </Box>
                <Stack space={0} w="100%" alignItems="flex-start">
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="ユーザーID" value={localState.userProfileInfo.userId}
                        onChangeText={(value) => { onChangeUserId(value) }} />
                    {/* <Box alignSelf="flex-start" bg="primary.500" _text={{
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "warmGray.50",
                        letterSpacing: "lg"
                    }}>
                        パスワード
                    </Box>
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="パスワード"
                        value={localState.userProfileInfo.password}
                        onChangeText={(value) => { onChangePassword(value) }} /> */}
                </Stack>
                {/* 名前BOX */}
                <Box alignSelf="flex-start" bg="primary.500" _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg"
                }}>
                    ニックネーム
                </Box>
                <Box alignItems="flex-start">
                    <Input mx="0" placeholder="ニックネーム" w="75%" maxWidth="300px"
                        value={localState.userProfileInfo.userName}
                        onChangeText={(value) => { onChangeUserName(value) }} />
                </Box>
                {/* 性別BOX */}
                {/* <Box alignSelf="flex-start" bg="primary.500" _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg"
                }}>
                    性別
                </Box> */}
                {/* <Box alignItems="flex-start">
                    <Input mx="3" placeholder="Input" w="75%" maxWidth="300px"
                        value={localState.genderCd}
                        onChangeText={(value) => { onChangegenderCd(value) }} />
                </Box> */}
                {/* <Box alignItems="flex-start">
                    <Select selectedValue={localState.userProfileInfo.genderCd} minWidth="200" accessibilityLabel="♂ or ♀" placeholder="♂ or ♀"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={itemValue => onChangegenderCd(itemValue)}>
                        <Select.Item label="♂" value="1" />
                        <Select.Item label="♀" value="2" />

                    </Select> */}
            </Box>
            {/* コメント */}
            <Box alignSelf="flex-start" bg="primary.500" _text={{
                fontSize: "md",
                fontWeight: "medium",
                color: "warmGray.50",
                letterSpacing: "lg"
            }}>
                コメント
            </Box>
            <Box alignItems="flex-start">
                <Input mx="0" placeholder="入力してね" w="75%" maxWidth="300px"
                    value={localState.userProfileInfo.comment}
                    onChangeText={(value) => { onChangeComment(value) }} />
            </Box>
            <Box alignItems="center">
                <Button onPress={editM050}>PUSH</Button>
            </Box>

        </>
    )
}
