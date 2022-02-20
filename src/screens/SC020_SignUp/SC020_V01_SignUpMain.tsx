import React, { useState, useEffect, useContext } from 'react';
import {
    Stack,
    Box,
    Input,
    Button
} from "native-base"
import {
    StyleSheet,
} from 'react-native'
import { SC020_InputUserInfo } from './SC020_Types';
import { FieldValue } from '@firebase/firestore';
import { s110_CreateUser } from '../../service/S110_CreateUser';
import { async } from '@firebase/util';

export const SC020_V01_SignUpMain = () => {
    const [localState, setLocalState] = useState<SC020_InputUserInfo>({} as SC020_InputUserInfo);

    //onChangeイベントハンドラ（テキストインプットの中身が変わるたびにステートを更新する）
    // --------------------------------------------------------------
    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...localState, userId: value }
        setLocalState(newState)
        console.log("userId", newState.userId)

    }
    //パスワード
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
    return (
        <>
            <Box>
                <Stack space={4} w="100%" alignItems="flex-start">
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} placeholder="ユーザーID" value={localState.userId}
                        onChangeText={(value) => { onChangeUserId(value) }} />
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
                    NAME
                </Box>
                <Box alignItems="flex-start">
                    <Input mx="3" placeholder="Input" w="75%" maxWidth="300px"
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
                    雌雄
                </Box>
                <Box alignItems="flex-start">
                    <Input mx="3" placeholder="Input" w="75%" maxWidth="300px"
                        value={localState.genderCd}
                        onChangeText={(value) => { onChangegenderCd(value) }} />
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
                    <Input mx="3" placeholder="Input" w="75%" maxWidth="300px"
                        value={localState.comment}
                        onChangeText={(value) => { onChangeComment(value) }} />
                </Box>
                <Box alignItems="center">
                    <Button onPress={createM050}>おしてね😎</Button>
                </Box>
            </Box>
        </>
    )
}
