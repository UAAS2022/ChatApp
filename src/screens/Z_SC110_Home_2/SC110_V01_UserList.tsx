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
import { SC110_Style } from "./SC110_Style"
import type { SC110_Context, SC110_UserInfo } from './SC110_Types'
import { UPDATE_USERLIST } from './SC110_Action'
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC110_S_Context } from "./SC110_Store"
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s150_SelectUserList_New } from "../../service/S150_SelectUserList_New"
import { CONST_SC000, CONST_SC110 } from "../../common/C000_Const"

export const SC110_V01_UserList = () => {
    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // コンテキストからステートとdispatchを取得
    const { state, dispatch } = useContext(SC110_S_Context);

    // 表示用と保持用のリストをそれぞれ取得
    const userInfoList = state.userInfoList
    const userInfoList_ScreenDisp = state.userInfoList_ScreenDisp

    const getUserList = async () => {
        //console.log("getUserList開始！=========================================================");
        // Firebaseからデータを取得する
        const resultObj = await s150_SelectUserList_New(CONST_SC110.MAXROW, baseState.loginUserInfo.userId)
        const dbObj_newuserInfoList = resultObj.userList

        // データをuserInfoListステートに合わせる
        const new_UserInfoList = dbObj_newuserInfoList.map((dbObj_userInfo) => {
            const userInfo = {} as SC110_UserInfo
            userInfo.userId = dbObj_userInfo.UserId
            userInfo.userName = dbObj_userInfo.UserName
            userInfo.comment = dbObj_userInfo.Comment
            // userInfo.LatestLoginDatetime = dbObj_userInfo.LatestLoginDatetime
            // userInfo.profileImagePath = dbObj_userInfo.ProfileImagePath
            userInfo.genderCd = dbObj_userInfo.GenderCd
            userInfo.age = dbObj_userInfo.Age
            userInfo.areaCd = dbObj_userInfo.AreaCd
            userInfo.hashtag = dbObj_userInfo.Hashtags
            return userInfo
        })

        // //console.log("getUserList終了！=========================================================");

        // 画面に表示する用
        let new_UserInfoList_ScreenDisp: SC110_UserInfo[][] = []
        let tmpList: SC110_UserInfo[] = []
        for (let userInfo of new_UserInfoList) {
            // 一時配列にオブジェクトを格納する
            tmpList.push(userInfo)
            // 配列長判定
            if (tmpList.length >= CONST_SC110.MAXCOL) {
                // 配列長が最大の場合

                // 行配列を格納して
                new_UserInfoList_ScreenDisp.push([...tmpList])
                // 行配列を初期化
                tmpList = []
            }

        }
        // 最後のループのtempListを追加する
        if (tmpList.length !== 0) {
            new_UserInfoList_ScreenDisp.push([...tmpList])
        }
        // ステートの更新
        const newState = {
            userInfoList_ScreenDisp: new_UserInfoList_ScreenDisp,
        }
        dispatch(UPDATE_USERLIST(newState))
        //console.log("userInfoList！----------------------------------------------------------------");
        //console.log(userInfoList);
        //console.log("userInfoList！----------------------------------------------------------------");

        //console.log("userInfoList_ScreenDisp----------------------------------------------------------------");
        //console.log(userInfoList_ScreenDisp);
        //console.log("userInfoList_ScreenDisp----------------------------------------------------------------");
        //console.log("getUserList終了！=========================================================");
    }

    //最上部でさらに下すワイプすることで発火するイベントを定義 （下にぐってスクロールさせて更新する仕組み）
    const onUpScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        //スクロール最上部のさらに上までスクロールされた場合だけ実行する
        if (e.nativeEvent.contentOffset.y < 0) {
            getUserList()
        }
    }

    // 初期表示処理-------------------------------------------------------------
    //　裏持ちのユーザ情報リストのステートを更新
    useEffect(() => {
        // signin();
        getUserList()
    }, []);
    // -----------------------------------------------------------------------
    return (
        <>
            <Text>{"\n"}</Text>
            <Divider />
            {/* <Button size="sm" style={SC110_Style.regularBtn} onPress={() => { getUserList(); }}>一覧更新</Button> */}

            {/* <Heading size="md">ユーザ一覧</Heading> */}
            {/* スクロールエリアを定義 */}
            <ScrollView onMomentumScrollBegin={onUpScrollEvent}>
                <Flex direction="column" mb="2.5" mt="1.5" _text={{
                    color: "coolGray.800"
                }}>
                    {/* map処理1：行のループ */}
                    {userInfoList_ScreenDisp.map((userInfoList_ScreenDisp_ROW: SC110_UserInfo[]) => {
                        return (
                            <>
                                <View style={SC110_Style.userInfoArea}>
                                    {/* <Heading size="md">row</Heading> */}
                                    <Flex direction="row" mb="2.5" mt="1.5" _text={{
                                        color: "coolGray.800"
                                    }}>
                                        {/* map処理2：列のループ (デフォルトは4だが、1以上の好きな値をCONST.tsで設定可能)*/}
                                        {userInfoList_ScreenDisp_ROW.map((userInfo: SC110_UserInfo) => {
                                            return (
                                                <Center style={SC110_Style.userInfoBox} size="20" bg="primary.100">{userInfo.userName}</Center>
                                            )
                                        })}
                                    </Flex>
                                </View>
                            </>
                        )
                    })}
                </Flex>
            </ScrollView>
        </>
    )
}