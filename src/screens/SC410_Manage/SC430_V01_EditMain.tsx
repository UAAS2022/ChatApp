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
import { SC420_ScreenInfo } from './SC410_Types';
import { s120_UpdateUser } from '../../service/S120_UpdateUser';

export const SC430_V01_EditMain = () => {
    const [localState, setLocalState] = useState<SC420_ScreenInfo>({} as SC420_ScreenInfo);

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

    const editM050 = async () => {
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
    return (
        <>
            <Box>
                {/* <Box alignSelf="flex-start" bg="primary.500" _text={{
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
                        value={localState.userProfileInfo.password}
                        onChangeText={(value) => { onChangePassword(value) }} />
                </Stack> */}
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
