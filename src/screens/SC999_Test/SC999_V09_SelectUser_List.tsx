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
import type { T999_UserInfo } from './SC999_Types'
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s150_SelectUserList_New } from "../../service/S150_SelectUserList_New"

// 1行に何ボックス表示するかの設定値
const MAXROW = 4

export const SC999_V09_SelectUser_List = () => {

    const [userInfoList, setUserList] = useState([{} as T999_UserInfo]);
    const [userInfoList_ScreenDisp, setUserList_ScreenDisp] = useState([[{} as T999_UserInfo]]);

    //console.log("userInfoList！----------------------------------------------------------------");
    //console.log(userInfoList);
    //console.log("userInfoList！----------------------------------------------------------------");

    //console.log("userInfoList_ScreenDisp----------------------------------------------------------------");
    //console.log(userInfoList_ScreenDisp);
    //console.log("userInfoList_ScreenDisp----------------------------------------------------------------");

    const getUserList = async () => {
        // //console.log("getUserList開始！=========================================================");
        // Firebaseからデータを取得する
        const resultObj = await s150_SelectUserList_New(10)
        const dbObj_newuserInfoList = resultObj.userList

        // データをuserInfoListステートに合わせる
        const new_UserInfoList = dbObj_newuserInfoList.map((dbObj_userInfo) => {
            const userInfo = {} as T999_UserInfo
            userInfo.userId = dbObj_userInfo.UserId
            userInfo.userName = dbObj_userInfo.UserName
            userInfo.comment = dbObj_userInfo.Comment
            // userInfo.LatestLoginDatetime = dbObj_userInfo.LatestLoginDatetime
            // userInfo.profileImagePath = dbObj_userInfo.ProfileImagePath
            userInfo.genderCd = dbObj_userInfo.GenderCd
            userInfo.age = dbObj_userInfo.Age
            userInfo.areaCd = dbObj_userInfo.AreaCd
            userInfo.hashtags = dbObj_userInfo.Hashtags
            return userInfo
        })
        // //console.log(new_UserInfoList);
        // ステートを更新する
        setUserList(new_UserInfoList)

        // // 画面に表示する用
        // let newuserInfoList_ScreenDisp: T999_UserInfo[][] = []
        // let tmpList: T999_UserInfo[] = []
        // for (let userInfo of new_UserInfoList) {
        //     // 一時配列にオブジェクトを格納する
        //     tmpList.push(userInfo)
        //     // 配列長判定
        //     if (tmpList.length >= MAXROW) {
        //         // 配列長が最大の場合

        //         // 行配列を格納して
        //         newuserInfoList_ScreenDisp.push([...tmpList])
        //         // 行配列を初期化
        //         tmpList = []
        //     }

        // }
        // // 最後のループのtempListを追加する
        // if (tmpList.length !== 0) {
        //     newuserInfoList_ScreenDisp.push([...tmpList])
        // }
        // // ステートの更新
        // setUserList_ScreenDisp(newuserInfoList_ScreenDisp)
        // //console.log("getUserList終了！=========================================================");
    }

    const setScreenState = () => {
        // 画面に表示する用
        let newuserInfoList_ScreenDisp: T999_UserInfo[][] = []
        let tmpList: T999_UserInfo[] = []
        for (let userInfo of userInfoList) {
            // 一時配列にオブジェクトを格納する
            tmpList.push(userInfo)
            // 配列長判定
            if (tmpList.length >= MAXROW) {
                // 配列長が最大の場合

                // 行配列を格納して
                newuserInfoList_ScreenDisp.push([...tmpList])
                // 行配列を初期化
                tmpList = []
            }

        }
        // 最後のループのtempListを追加する
        if (tmpList.length !== 0) {
            newuserInfoList_ScreenDisp.push([...tmpList])
        }
        // ステートの更新
        setUserList_ScreenDisp(newuserInfoList_ScreenDisp)
    }

    //最上部でさらに下すワイプすることで発火するイベントを定義 （下にぐってスクロールさせて更新する仕組み）
    const onUpScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        //スクロール最上部のさらに上までスクロールされた場合だけ実行する
        if (e.nativeEvent.contentOffset.y < 0) {
            getUserList()
            setScreenState()
        }
    }

    // 初期表示処理-------------------------------------------------------------
    // ①　裏持ちのユーザ情報リストのステートを更新
    useEffect(() => {
        // signin();
        getUserList()
    }, []);
    // ②　①で更新したユーザ情報のステートの変更を契機に、画面に表示する用にリストを整形してステートを更新
    useEffect(() => {
        // signin();
        setScreenState()
    }, [userInfoList]);
    // -----------------------------------------------------------------------
    return (
        <>
            <Text>SC999_V09_ユーザ一覧</Text>
            <Text>※ ローカルステートに値を入れいているため、遷移すると状態がクリアされる。再描画で最新情報を取得するため少し遅い。</Text>
            <Text>{"\n"}</Text>
            <Button size="sm" style={SC999_Style.regularBtn} onPress={() => { getUserList(); }}>一覧更新</Button>
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

            <Heading size="md">ユーザ一覧</Heading>
            <ScrollView onMomentumScrollBegin={onUpScrollEvent}>
                <Flex direction="column" mb="2.5" mt="1.5" _text={{
                    color: "coolGray.800"
                }}>
                    {/* map処理1：行のループ */}
                    {userInfoList_ScreenDisp.map((userInfoList_ScreenDisp_ROW: T999_UserInfo[]) => {
                        return (
                            <>
                                {/* <Heading size="md">row</Heading> */}
                                <Flex direction="row" mb="2.5" mt="1.5" _text={{
                                    color: "coolGray.800"
                                }}>
                                    {/* map処理2：列のループ */}
                                    {userInfoList_ScreenDisp_ROW.map((userInfo: T999_UserInfo) => {
                                        return (
                                            <Center style={SC999_Style.userInfoBox} size="20" bg="primary.100">{userInfo.userName}</Center>
                                        )
                                    })}
                                </Flex>
                            </>
                        )
                    })}

                </Flex>
                <Divider />
                <Heading size="md">ユーザ一覧（シンプルコード）</Heading>
                {userInfoList.map((userInfo: T999_UserInfo) => { return (<Text>{userInfo.userName}</Text>) })}
            </ScrollView>
        </>
    )
}