import React, { useState, useMemo, useContext } from 'react';
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
    StyleSheet,
} from 'react-native'
import { SC020_InputUserInfo } from './SC020_Types';
import { s110_CreateUser } from '../../service/S110_CreateUser';
import { s111_CreateUser_withPrivate } from '../../service/S111_CreateUser_withPrivate';
import { s160_CreateUserPrivate } from '../../service/S160_CreateUserPrivate';

export const SC020_V01_SignUpMain = () => {
    const [localState, setLocalState] = useState<SC020_InputUserInfo>({} as SC020_InputUserInfo);

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...localState, userId: value }
        setLocalState(newState)
        //console.log("userId", newState.userId)

    }
    //パスワード
    const onChangePassword = (value: string) => {
        const newState = { ...localState, password: value }
        setLocalState(newState)
        //console.log("password", newState.password)
    }
    //ユーザ名
    const onChangeUserName = (value: string) => {
        const newState = { ...localState, userName: value }
        setLocalState(newState)
        //console.log("userName", newState.userName)
    }
    //雌雄
    const onChangegenderCd = (value: string) => {
        const newState = { ...localState, genderCd: value }
        setLocalState(newState)
        //console.log("genderCd", newState.genderCd)
    }
    //コメント
    const onChangeComment = (value: string) => {
        const newState = { ...localState, comment: value }
        setLocalState(newState)
        //console.log("comment", newState.comment)
    }

    // M050生成
    const createM050 = async () => {
        const userId = localState.userId
        const userName = localState.userName
        const comment = localState.comment
        const genderCd = localState.genderCd
        const profileImagePath = ""
        const age = 5
        const areaCd = "1"
        const hashtags = "1"
        const logUserId = localState.userId
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
        const userId = localState.userId
        const password = localState.password
        const logUserId = localState.userId
        await s160_CreateUserPrivate(
            userId,
            userId,
            password,
            logUserId,
        )
    }
    // M050,M051生成
    const createM050M051 = async () => {
        const userId = localState.userId
        const password = localState.password
        const userName = localState.userName
        const comment = localState.comment
        const genderCd = localState.genderCd
        const profileImagePath = ""
        const age = 5
        const areaCd = "1"
        const hashtags = "1"
        const logUserId = localState.userId
        await s111_CreateUser_withPrivate(
            userId,
            password,
            userName,
            comment,
            genderCd,
            profileImagePath,
            age,
            areaCd,
            hashtags,
            logUserId)
    }

    // 登録イベントハンドラ
    const onClickRegistBtn = () => {
        // M050,M051生成
        createM050M051()
        // // M050生成
        // createM050()
        // // M051生成
        // createM051()
    }

    return (
        <>
            <Box>
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
                    }} placeholder="ユーザーID" value={localState.userId}
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
                    }} placeholder="パスワード"
                        value={localState.password}
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
                        value={localState.userName}
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
                        value={localState.genderCd}
                        onChangeText={(value) => { onChangegenderCd(value) }} />
                </Box> */}
                <Box alignItems="flex-start">
                    <Select selectedValue={localState.genderCd} minWidth="200" accessibilityLabel="♂ or ♀" placeholder="♂ or ♀"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={itemValue => onChangegenderCd(itemValue)}>
                        <Select.Item label="♂" value="1" />
                        <Select.Item label="♀" value="2" />

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
                        value={localState.comment}
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
                        value={localState.comment}
                        onChangeText={(value) => { onChangeComment(value) }} />
                </Box> */}
                <Box alignItems="center">
                    <Button onPress={onClickRegistBtn}>おしてね😎</Button>
                </Box>
            </Box>
        </>
    )
}
