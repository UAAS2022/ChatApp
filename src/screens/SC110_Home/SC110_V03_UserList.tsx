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
    Box,

} from "native-base"
import {
    Image,
    View,
    Alert,
    ScrollView,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableOpacity
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { CONST_SC000, CONST_SC110 } from "../../common/C000_Const"
import { SC110_UPDATE_USERLIST } from '../SC000_BaseComponent/SC000_Action'
import { SC000_S_Context } from "../SC000_BaseComponent/SC000_Store"
import { SC000_UserInfo } from "../SC000_BaseComponent/SC000_Types"
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC000_Style } from "../SC000_BaseComponent/SC000_Style"
import { useState_SC000_ScreenController } from "../SC000_BaseComponent/SC000_V00_BaseComponent"
import { SC110_Style } from "./SC110_Style"
// import type { SC110_Context, SC110_UserInfo } from './SC110_Types'
import { SC000_UPDATE_LOGIN_USER } from '../SC000_BaseComponent/SC000_Action'
import { CHANGE_SCREEN, UPDATE_PREINFO_120, UPDATE_INFINITY_SCROLL_INFO } from './SC110_Action'
import { Context_SC110 } from "./SC110_Store"
import { c010_UaasUtil_isNotBlank } from '../../common/C010_UaasUtil'
import { s121_UpdateUser_LoginDatetime } from "../../service/S121_UpdateUser_LoginDatetime"
import { s150_SelectUserList_New } from "../../service/S150_SelectUserList_New"
import { s370_FileDownload } from '../../service/S370_FileDownload';
import { dateToString } from '../../common/C050_DateUtil';

export const SC110_V03_UserList = () => {

    // ①ベースコンテキストを取得する
    const { state: baseState, dispatch: baseDispatch } = useContext(SC000_S_Context)
    // ②画面コンテキストを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(Context_SC110)
    // ④カスタムフック呼び出し
    // const [updateLayoutPattern] = useState_SC000_LayoutPattern(CONST_SC000.SCREENINFO.SC210)
    const [updateScreenControllerInfo] = useState_SC000_ScreenController()

    // 表示用と保持用のリストをそれぞれ取得
    // const userInfoList = state.baseContext_SC110.userInfoList_ScreenDisp
    const userInfoList_ScreenDisp = baseState.baseContext_SC110.userInfoList_ScreenDisp

    const refreshUserList = async () => {
        console.log("updateDisp--------------------------------------------------updateDisp")
        await updateLatestLoginDatetime()
        await getUserList(0)
    }

    const updateLatestLoginDatetime = async () => {
        // screenContextのインフィニティスクロール用の値を更新する
        // let new_infinityScrollInfo = { ...screenState.infinityScrollInfo }
        // new_infinityScrollInfo.cursorTimestamp = new Date()
        // screenDispatch(UPDATE_INFINITY_SCROLL_INFO(new_infinityScrollInfo))
        updateInfinityCursor(new Date())
        // DBの最終ログイン日時を更新する
        await s121_UpdateUser_LoginDatetime(baseState.loginUserInfo.userId, baseState.loginUserInfo.userId)
    }

    const getUserList = async (addFlg: number) => {
        console.log("addFlg--------------------------------------------------addFlg", addFlg)
        //console.log("getUserList開始！=========================================================");
        // Firebaseからデータを取得する
        const resultObj = await s150_SelectUserList_New(CONST_SC110.MAXROW, baseState.loginUserInfo.userId, screenState.infinityScrollInfo.cursorTimestamp)
        const dbObj_newuserInfoList = resultObj.userList

        // データをuserInfoListステートに合わせる
        const new_UserInfoList = []
        for (let dbObj_userInfo of dbObj_newuserInfoList) {
            const userInfo = {} as SC000_UserInfo
            userInfo.userId = dbObj_userInfo.UserId
            userInfo.userName = dbObj_userInfo.UserName
            userInfo.comment = dbObj_userInfo.Comment
            // console.log(dbObj_userInfo.UserName)
            userInfo.LatestLoginDatetime = dbObj_userInfo.LatestLoginDatetime.toDate()
            const date = new Date().getTime()
            // console.log(Math.floor(date / 1000) % 60)
            const result_S370 = await s370_FileDownload(dbObj_userInfo.ProfileImagePath)
            const date2 = new Date().getTime()
            // console.log(Math.floor(date2 / 1000) % 60)
            console.log(date - date2)
            userInfo.profileImagePath = result_S370.fileUrl

            // userInfo.profileImagePath = dbObj_userInfo.profileImagePath
            userInfo.genderCd = dbObj_userInfo.GenderCd
            userInfo.age = dbObj_userInfo.Age
            userInfo.areaCd = dbObj_userInfo.AreaCd
            userInfo.hashtag = dbObj_userInfo.Hashtags
            // LISTに詰める
            new_UserInfoList.push(userInfo)
        }
        // //console.log("getUserList終了！=========================================================");

        // 画面に表示する用
        let new_UserInfoList_ScreenDisp: SC000_UserInfo[][] = []
        let tmpList: SC000_UserInfo[] = []
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
        if (addFlg === 1) {
            console.log("addFlg--------------------------------------------------addFlg addFlg === 1", addFlg)
            // 既存のユーザリスト（画面）に、新しく取得したユーザ情報を追加する
            new_UserInfoList_ScreenDisp = baseState.baseContext_SC110.userInfoList_ScreenDisp.concat(new_UserInfoList_ScreenDisp)
        }

        // ステートの更新
        const newState = {
            baseContext_SC110: {
                userInfoList_ScreenDisp: new_UserInfoList_ScreenDisp,
            }
        }
        baseDispatch(SC110_UPDATE_USERLIST(newState))
        // console.log("newState--------------------------------------------------")
        // console.log(newState)
        // console.log("newState--------------------------------------------------")

        // リストの最後の要素のログイン日時を取得する
        const cursorTimeStamp = new_UserInfoList[new_UserInfoList.length - 1].LatestLoginDatetime
        // インフィニティスクロール用の情報を更新する
        updateInfinityCursor(cursorTimeStamp)
    }

    // インフィニティスクロール用のカーソルを更新する関数
    const updateInfinityCursor = (cursorTimeStamp: Date) => {
        // screenContextのインフィニティスクロール用の値を更新する
        let new_screenState = { ...screenState }
        new_screenState.infinityScrollInfo.cursorTimestamp = cursorTimeStamp
        screenDispatch(UPDATE_INFINITY_SCROLL_INFO(new_screenState.infinityScrollInfo))
    }

    // リフレッシュ関数
    //最上部でさらに下すワイプすることで発火するイベントを定義 （下にぐってスクロールさせて更新する仕組み）
    const onUpScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        //スクロール最上部のさらに上までスクロールされた場合だけ実行する
        if (e.nativeEvent.contentOffset.y < -50) {
            refreshUserList()
        }
    }

    // 表示ユーザ追加関数（インフィニティスクロール用）
    //最下部までスクロールすることで発火するイベントを定義
    const onDownScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        // リフレッシュ用のイベントと混同しないよう、発火条件にy軸の値を加える
        if (e.nativeEvent.contentOffset.y > 0) {
            // リストリフレッシュ
            getUserList(1)
        }
    }


    // preInfo_SC120情報を更新する
    const updatePreInfo_SC120 = (userId: string) => {
        // ステートの定義
        const newState = { ...screenState }
        // チャットスクリーンプレ情報を更新
        newState.preInfo_SC120.userId = userId
        // ステートを更新する
        screenDispatch(UPDATE_PREINFO_120(newState.preInfo_SC120))
    }

    // 画面遷移
    const goToSC120 = (userId: string) => {
        //console.log("goToSC120:開始")
        // ステートの定義
        const newState = { ...screenState }
        // プレ情報を更新する
        updatePreInfo_SC120(userId)
        // 画面遷移情報を更新
        newState.screenControllerInfo.componentId = CONST_SC110.COMPONENT_ID.V04
        // トーク画面の内容をチャット画面に切り替える
        screenDispatch(CHANGE_SCREEN(newState.screenControllerInfo))
        // BaseComponentの画面IDを更新する
        updateScreenControllerInfo(CONST_SC000.SCREENINFO.SC120)
        //console.log("goToChat:終了")
    }

    // 初期表示処理-------------------------------------------------------------
    //　裏持ちのユーザ情報リストのステートを更新
    useEffect(() => {
        refreshUserList()
    }, []);
    // -----------------------------------------------------------------------
    return (
        <>
            {/* <Button size="sm" style={SC110_Style.regularBtn} onPress={() => { getUserList(); }}>一覧更新</Button> */}

            {/* <Heading size="md">ユーザ一覧</Heading> */}
            {/* スクロールエリアを定義 */}
            <View style={SC000_Style.v00_HeaderArea}>
                <CC0010_ScreenTitle >Home画面⇦ここは広告欄に変更</CC0010_ScreenTitle>
            </View>
            <Divider />

            <ScrollView onMomentumScrollBegin={onUpScrollEvent} onMomentumScrollEnd={onDownScrollEvent}>
                {/* <ScrollView onMomentumScrollBegin={onUpScrollEvent}> */}
                {/* <ScrollView onMomentumScrollEnd={onDownScrollEvent}> */}
                <Flex direction="column" mb="2.5" mt="1.5" _text={{
                    color: "coolGray.800"
                }}>
                    {/* map処理1：行のループ */}
                    {userInfoList_ScreenDisp.map((userInfoList_ScreenDisp_ROW: SC000_UserInfo[], index) => {
                        return (
                            <View style={SC110_Style.userInfoArea} key={index}>
                                {/* <Heading size="md">row</Heading> */}

                                <Flex direction="row" mb="2.5" mt="1.5" _text={{
                                    color: "coolGray.800"
                                }}>

                                    {/* map処理2：列のループ (デフォルトは4だが、1以上の好きな値をCONST.tsで設定可能)*/}
                                    {userInfoList_ScreenDisp_ROW.map((userInfo: SC000_UserInfo, index) => {

                                        return (

                                            <Center style={SC110_Style.userInfoBox} size="40" bg="primary.100"
                                                key={index}  >
                                                {/* {userInfo.userName} */}
                                                <TouchableOpacity style={SC110_Style.userInfoBox3} onPress={() => { goToSC120(userInfo.userId) }} >
                                                    {/* {userInfo.userName} */}
                                                    <Image style={SC110_Style.userInfoBox3} source={{
                                                        uri: userInfo.profileImagePath
                                                    }} />

                                                </TouchableOpacity>
                                            </Center>
                                        )
                                    })}
                                </Flex>
                            </View>
                        )
                    })}
                </Flex>
            </ScrollView>
        </>
    )
}