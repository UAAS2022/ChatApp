import React, { useState, useEffect, useContext } from 'react';
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
} from "native-base"
import {
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
    NativeSyntheticEvent
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SC999_Style } from "./SC999_Style"
import type { SC999_Context, T999_UserInfo, SC999_TalkUserInfo, SC999_TalkUserInfo_Detail } from './SC999_Types'
import { UPDATE_V14 } from './SC999_Action'
import { SC999_S_Context } from "./SC999_Store"
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s303_SelectTalkUserList_ByUserId_Detail } from "../../service/S303_SelectTalkUserList_ByUserId_Detail"


const MAXROW = 4

// 業務エラーチェッククラス
const check = (talkInfo: SC999_TalkUserInfo): boolean => {
    let errFlg = true
    //console.log("checktalkInfo", talkInfo)
    if (!c010_UaasUtil_isNotBlank(talkInfo.userId)) {
        Alert.alert('エラー', 'ユーザIDを入力してください。')
        errFlg = false
    }
    return errFlg
}

export const SC999_V14_SelectTalk_List = () => {

    // コンテキストからステートとdispatchを取得
    const { state, dispatch } = useContext(SC999_S_Context);
    // ローカルStateを定義
    const [talkInfo_Input, setTalkInfo_Input] = useState<SC999_TalkUserInfo>({} as SC999_TalkUserInfo);

    // トークリストを取得
    const talkInfoList = state.sC999_V14_Info.talkList

    //ユーザID
    const onChangeUserId = (value: string) => {
        const newState = { ...talkInfo_Input, userId: value }
        setTalkInfo_Input(newState)
        //console.log("userId", newState.userId)
    }

    const getTalkList = async () => {
        //console.log("getUserList開始！=========================================================");
        // Firebaseからデータを取得する
        const resultObj = await s303_SelectTalkUserList_ByUserId_Detail(talkInfo_Input.userId)
        const dbObj_newTalkList = resultObj.talkUserInfoList_Detail

        // データをuserInfoListステートに合わせる
        const new_TalkInfoList = dbObj_newTalkList.map((dbObj_talkInfo) => {
            const talkInfo = {} as SC999_TalkUserInfo_Detail
            talkInfo.talkId = dbObj_talkInfo.talkUserInfo.TalkId
            talkInfo.userInfo = {
                _0_DocId: dbObj_talkInfo.chatUserInfo._0_DocId,
                userId: dbObj_talkInfo.chatUserInfo.UserId,
                userName: dbObj_talkInfo.chatUserInfo.UserName,
                LatestLoginDatetime: dbObj_talkInfo.chatUserInfo.LatestLoginDatetime.toDate(),
                profileImagePath: dbObj_talkInfo.chatUserInfo.ProfileImagePath
            }
            return talkInfo
        })

        // ステートの更新
        const newState = {
            sC999_V14_Info: {
                talkList: new_TalkInfoList
            }
        }
        dispatch(UPDATE_V14(newState))
        //console.log("dbObj_newTalkList----------------------------------------------------------------");
        //console.log(dbObj_newTalkList);
        //console.log("dbObj_newTalkList----------------------------------------------------------------");
        //console.log("new_TalkInfoList----------------------------------------------------------------");
        //console.log(new_TalkInfoList);
        //console.log("new_TalkInfoList----------------------------------------------------------------");
        //console.log("state----------------------------------------------------------------");
        //console.log(state);
        //console.log("state----------------------------------------------------------------");
        //console.log("getUserList終了！=========================================================");
    }

    const onGetTalkEvent = () => {
        if (check(talkInfo_Input)) {
            getTalkList()
        }
    }

    //最上部でさらに下すワイプすることで発火するイベントを定義 （下にぐってスクロールさせて更新する仕組み）
    const onUpScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        //スクロール最上部のさらに上までスクロールされた場合だけ実行する
        if (e.nativeEvent.contentOffset.y < 0) {
            onGetTalkEvent()
        }
    }

    // 初期表示処理-------------------------------------------------------------
    //　裏持ちのユーザ情報リストのステートを更新
    // useEffect(() => {
    //     // signin();
    //     getTalkList()
    // }, []);
    // -----------------------------------------------------------------------
    return (
        <>
            <Text>SC999_V14_トーク一覧</Text>
            <Text>※ コンテキストに値を入れいているため、遷移してまた戻っても状態が保持される</Text>

            <Text>{"\n"}</Text>
            <Text>検索用ユーザID（更新対象外）</Text>
            <View style={SC999_Style.inputTextContainer}>
                <TextInput
                    style={SC999_Style.inputText}
                    onChangeText={(value) => { onChangeUserId(value) }}
                    value={talkInfo_Input.userId}
                    placeholder="ユーザIDを入力してください"
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />
            </View>
            <Text>talkInfo_Input:{talkInfo_Input.userId}</Text>
            <Divider />
            <Text>{"\n"}</Text>
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { onGetTalkEvent(); }}>検索</Button>
            <Divider />
            {/* <Heading size="md">テストrow</Heading>
            <Flex direction="row" mb="2.5" mt="1.5" _text={{
                color: "coolGray.800"
            }}>
                {userInfoList.map((userInfo: T999_UserInfo) => {
                    return (
                        <Center size="16" bg="primary.100">{userInfo.userName}</Center>
                    )
                })}
            </Flex>
            <Divider /> */}

            <Heading size="md">トーク一覧</Heading>
            <ScrollView onMomentumScrollBegin={onUpScrollEvent}>
                <Flex direction="column" mb="2.5" mt="1.5" _text={{
                    color: "coolGray.800"
                }}>
                    {/* map処理1：行のループ */}
                    {talkInfoList.map((talkInfo: SC999_TalkUserInfo_Detail, index) => {
                        return (
                            <Center key={index} style={SC999_Style.talkInfoBox} size="20" bg={"violet.100"}>{talkInfo.userInfo.userName}</Center>
                        )
                    })}
                </Flex>
                <Divider />
                <Heading size="md">トーク一覧（シンプルコード）</Heading>
                {talkInfoList.map((talkInfo: SC999_TalkUserInfo_Detail, index) => { return (<View key={index}><Text >{talkInfo.talkId}</Text></View>) })}
            </ScrollView>
        </>
    )
}