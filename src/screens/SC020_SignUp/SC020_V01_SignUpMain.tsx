import React, { useState, useMemo, useContext, useEffect } from 'react';
import {
    Select,
    Stack,
    Box,
    Input,
    Button,
    Center,
    CheckIcon,
    Divider,
} from "native-base"
import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
} from 'react-native'
import { SC020_InputUserInfo } from './SC020_Types';
import { CONST_SC030, CONST_SC000 } from "../../common/C000_Const"
import { s110_CreateUser } from '../../service/S110_CreateUser';
import { s111_CreateUser_withPrivate } from '../../service/S111_CreateUser_withPrivate';
import { s160_CreateUserPrivate } from '../../service/S160_CreateUserPrivate';
import { s361_ProfileImageUpload } from '../../service/S361_ProfileImageUpload';
import { s370_FileDownload } from '../../service/S370_FileDownload';
import { s410_FbAuthLogin } from '../../service/S410_FbAuthLogin';
import * as ImagePicker from 'expo-image-picker';
import { useState_SC000_ScreenController } from '../SC000_BaseComponent/SC000_V00_BaseComponent'


const Default_LocalState_UserInfo = {
    userId: "",
    password: "",
    userName: "",
    comment: "",
    profileImagePath: "",
    genderCd: "",
    age: 0,
    areaCd: "",
}

export const SC020_V01_SignUpMain = () => {
    //  ②ローカルステートを定義
    const [localState_UserInfo, setLocalState_UserInfo] = useState<SC020_InputUserInfo>(Default_LocalState_UserInfo as SC020_InputUserInfo);
    const [localState_ImagePath, setLocalState_ImageUri] = useState("");
    // const [localState_ImagePath, setLocalState_ImageUri] = useState("../../static/img/murata_unko.jpeg");

    //スクリーン更新用。
    const [updateBaseScreenId] = useState_SC000_ScreenController()

    // 初期表示処理の関数を定義する
    const initMain = async () => {
        // デフォルトの画像パスを取得してstateに入れる
        const result_S370 = await s370_FileDownload(CONST_SC030.DefaultProfileImagePath)
        const defaultProfileImagePath = result_S370.fileUrl
        setLocalState_ImageUri(defaultProfileImagePath)
    }

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...localState_UserInfo, userId: value }
        setLocalState_UserInfo(newState)
        //console.log("userId", newState.userId)

    }
    //パスワード
    const onChangePassword = (value: string) => {
        const newState = { ...localState_UserInfo, password: value }
        setLocalState_UserInfo(newState)
        //console.log("password", newState.password)
    }
    //ユーザ名
    const onChangeUserName = (value: string) => {
        const newState = { ...localState_UserInfo, userName: value }
        setLocalState_UserInfo(newState)
        //console.log("userName", newState.userName)
    }
    //雌雄
    const onChangegenderCd = (value: string) => {
        const newState = { ...localState_UserInfo, genderCd: value }
        setLocalState_UserInfo(newState)
        //console.log("genderCd", newState.genderCd)
    }
    //雌雄
    const onChangeAreaCd = (value: string) => {
        const newState = { ...localState_UserInfo, areaCd: value }
        setLocalState_UserInfo(newState)
        //console.log("genderCd", newState.genderCd)
    }
    //コメント
    const onChangeComment = (value: string) => {
        const newState = { ...localState_UserInfo, comment: value }
        setLocalState_UserInfo(newState)
        //console.log("comment", newState.comment)
    }

    // M050生成
    const createM050 = async () => {
        const userId = localState_UserInfo.userId
        const userName = localState_UserInfo.userName
        const comment = localState_UserInfo.comment
        const genderCd = localState_UserInfo.genderCd
        const profileImagePath = ""
        const age = 5
        const areaCd = "1"
        const hashtags = "1"
        const logUserId = localState_UserInfo.userId
        await s110_CreateUser(
            userId,
            userName,
            comment,
            genderCd,
            profileImagePath,
            age,
            areaCd,
            hashtags,
            logUserId)
    }
    // M051生成
    const createM051 = async () => {
        // ユーザプライベート情報登録
        const userId = localState_UserInfo.userId
        const password = localState_UserInfo.password
        const logUserId = localState_UserInfo.userId
        await s160_CreateUserPrivate(
            userId,
            userId,
            password,
            logUserId,
        )
    }
    // M050,M051生成
    const createM050M051 = async () => {
        const userId = localState_UserInfo.userId
        const password = localState_UserInfo.password
        const userName = localState_UserInfo.userName
        const comment = localState_UserInfo.comment
        const genderCd = localState_UserInfo.genderCd
        const profileImagePath = "100_User/" + userId + "/" + "profile.png"
        const age = 5
        const areaCd = "1"
        const hashtags = "1"
        const logUserId = localState_UserInfo.userId
        console.log(localState_UserInfo)
        const result_S111 = await s111_CreateUser_withPrivate(
            userId,
            password,
            userName,
            comment,
            profileImagePath,
            genderCd,
            age,
            areaCd,
            hashtags,
            logUserId)
        return result_S111.errFlg
    }

    // 画像アップロード
    const uploadProfileImage = () => {
        // ローカルStateから情報を取得する
        const userId = localState_UserInfo.userId
        // プロフィール画像をアップロードする
        s361_ProfileImageUpload(userId, localState_ImagePath)
    }

    // Firebaseユーザ追加
    const createFbAuthUser = async () => {
        // 認証情報を取得する
        const userId = localState_UserInfo.userId
        const password = localState_UserInfo.password
        // Firebaseにユーザ登録する
        await s410_FbAuthLogin(userId, password)
    }

    // 登録イベントハンドラ
    const onClickSinUpBtn = async () => {
        let errFlg = "0"
        // テスト
        await createFbAuthUser()
        // M050,M051生成
        errFlg = await createM050M051()
        // ユーザ作成に成功したら、画像をアップロードする
        if (errFlg === "0") {
            // 画像をアップロードする
            uploadProfileImage()
            // ホーム画面に遷移する
            updateBaseScreenId(CONST_SC000.SCREENID.SC110)
        }
        // // M050生成
        // createM050()
        // // M051生成
        // createM051()
    }
    // const [imagePath, setImagePath] = useState("https://instagrammernewsimg.s3.ap-northeast-1-ntt.wasabisys.com/CAWoZoPlcx7");

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

    // 初期表示処理-------------------------------------------------------------
    //
    useEffect(() => {
        // getChatMessageList()
        initMain()
    }, []);
    // -----------------------------------------------------------------------

    return (
        <>
            <ScrollView>
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
                        }} placeholder="ユーザーID" value={localState_UserInfo.userId}
                            onChangeText={(value) => { onChangeUserId(value) }} />
                        <Box alignSelf="flex-start" bg="primary.500" _text={{
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
                        }} placeholder="パスワード(６文字以上)"
                            value={localState_UserInfo.password}
                            onChangeText={(value) => { onChangePassword(value) }} />
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
                            value={localState_UserInfo.userName}
                            onChangeText={(value) => { onChangeUserName(value) }} />
                    </Box>
                    {/* 性別BOX */}
                    <Box alignSelf="flex-start" bg="primary.500" _text={{
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "warmGray.50",
                        letterSpacing: "lg"
                    }}>
                        性別
                    </Box>
                    {/* <Box alignItems="flex-start">
                    <Input mx="3" placeholder="Input" w="75%" maxWidth="300px"
                        value={localState_UserInfo.genderCd}
                        onChangeText={(value) => { onChangegenderCd(value) }} />
                </Box> */}
                    <Box alignItems="flex-start">
                        <Select selectedValue={localState_UserInfo.genderCd} minWidth="200" accessibilityLabel="♂ or ♀" placeholder="♂ or ♀"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => onChangegenderCd(itemValue)}>
                            <Select.Item label="♂" value="1" />
                            <Select.Item label="♀" value="2" />

                        </Select>
                    </Box>
                    {/* 地域 */}
                    <Box alignSelf="flex-start" bg="primary.500" _text={{
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "warmGray.50",
                        letterSpacing: "lg"
                    }}>
                        地域
                    </Box>
                    <Box alignItems="flex-start">
                        <Select selectedValue={localState_UserInfo.areaCd} minWidth="200" placeholder="地域"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => onChangeAreaCd(itemValue)}>
                            <Select.Item label="北海道" value="北海道" />
                            <Select.Item label="東北地方" value="東北地方" />
                            <Select.Item label="北関東" value="北関東" />
                            <Select.Item label="南関東" value="南関東" />
                            <Select.Item label="中部" value="中部" />
                            <Select.Item label="北陸" value="北陸" />
                            <Select.Item label="関西" value="関西" />
                            <Select.Item label="四国" value="四国" />
                            <Select.Item label="中国" value="中国" />
                            <Select.Item label="九州" value="九州" />
                            <Select.Item label="沖縄" value="沖縄" />
                            <Select.Item label="その他" value="その他" />
                        </Select>
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
                            value={localState_UserInfo.comment}
                            onChangeText={(value) => { onChangeComment(value) }} />
                    </Box>
                    {/* <Box alignSelf="flex-start" bg="primary.500" _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg"
                }}>
                    写真
                </Box> */}
                    {/* <Box alignItems="flex-start">
                    <Input mx="0" placeholder="入力してね" w="75%" maxWidth="300px"
                        value={localState_UserInfo.comment}
                        onChangeText={(value) => { onChangeComment(value) }} />
                </Box> */}
                    <Box alignItems="center">
                        <Button onPress={onClickSinUpBtn} >おしてね😎</Button>
                    </Box>
                </Box>
            </ScrollView>
        </>
    )
}
