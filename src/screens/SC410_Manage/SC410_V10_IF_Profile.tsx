// View

import React, { useEffect, useContext } from 'react';
import {
    Center,
    Divider,
} from "native-base"
import {
    View,
    Text,
    Image,
} from 'react-native';
import { SC410_V05_ManageHeader } from './SC410_V05_ManageHeader';
import { SC410_Style } from './SC410_Style';
import { SC410_S_Context } from './SC410_Store'
import { s140_SelectUser } from "../../service/S140_SelectUser"
import { dateToString } from "../../common/C050_DateUtil"
import { UPDATE_USERPROFILE } from "../SC120_UserProfile/SC120_Action"
import { SC120_Style } from '../SC120_UserProfile/SC120_Style';


const USERID = "DAHYUN"
export const SC410_V10_IF_Profile = (props: any) => {
    // ②ScreenContextを取得する
    const { state: screenState, dispatch: screenDispatch } = useContext(SC410_S_Context)
    // ③ローカルステートを定義する

    // ④propsからデータを取得する
    const userId = USERID

    // ユーザプロフィール情報取得イベントハンドラ
    const getUserProfileInfo = async () => {
        // ①Firebaseからデータを取得する
        const result_S140 = await s140_SelectUser(userId)
        // ②データをuserInfoListステートに合わせる
        const newState = { ...screenState }
        newState.screenInfo_SC420.userProfileInfo.userId = result_S140.userInfo.UserId
        newState.screenInfo_SC420.userProfileInfo.userName = result_S140.userInfo.UserName
        newState.screenInfo_SC420.userProfileInfo.comment = result_S140.userInfo.Comment
        newState.screenInfo_SC420.userProfileInfo.latestLoginDatatime = dateToString(result_S140.userInfo.LatestLoginDatatime.toDate(), "MM/DD")
        newState.screenInfo_SC420.userProfileInfo.profileImagePath = result_S140.userInfo.ProfileImagePath
        newState.screenInfo_SC420.userProfileInfo.genderCd = result_S140.userInfo.GenderCd
        newState.screenInfo_SC420.userProfileInfo.age = result_S140.userInfo.Age
        newState.screenInfo_SC420.userProfileInfo.areaCd = result_S140.userInfo.AreaCd


        // ③ステートを更新する
        screenDispatch(UPDATE_USERPROFILE(newState.screenInfo_SC420.userProfileInfo))

        //console.log(screenState)

    }

    // 初期表示処理-------------------------------------------------------------
    //
    useEffect(() => {
        // getChatMessageList()
        getUserProfileInfo()
    }, []);
    // -----------------------------------------------------------------------
    return (
        <>
            <SC410_V05_ManageHeader />

            <Center w="100%" h="50%"  >

                <Image style={SC120_Style.v06_Profile} source={{
                    uri: screenState.screenInfo_SC420.userProfileInfo.profileImagePath
                }} />
            </Center>

            <View>
                <Text style={SC410_Style.v07_Profile}>名前</Text>
                <Divider />
                <Text>{screenState.screenInfo_SC420.userProfileInfo.userName}</Text>
                <Divider />
                <Text style={SC410_Style.v07_Profile}>年齢</Text>
                <Divider />
                <Text>{screenState.screenInfo_SC420.userProfileInfo.age}</Text>
                <Divider />
                <Text style={SC410_Style.v07_Profile}>地域</Text>
                <Divider />
                <Text>{screenState.screenInfo_SC420.userProfileInfo.areaCd}</Text>
                <Divider />
                <Text style={SC410_Style.v07_Profile}>自己紹介</Text>
                <Divider />
                <Text>{screenState.screenInfo_SC420.userProfileInfo.comment}</Text>

            </View>
        </>
    )
}
// -----------以下、村田基--------------------
// const USERID = "xxx"
// export const SC410_V10_IF_Profile = (props: object) => {
//     return (
//         <>
//             <SC410_V05_ManageHeader />

//             <Center w="100%" h="50%"  >
//                 <Image source={require("../../static/img" + "/murata_unko.jpeg")} style={SC410_Style.v06_Profile} />

//             </Center>

//             <View>
//                 <Text style={SC410_Style.v07_Profile}>名前</Text>
//                 <Divider />
//                 <Text>村田基</Text>
//                 {/* ↑DBから取得したい */}
//                 <Divider />
//                 <Text style={SC410_Style.v07_Profile}>年齢</Text>
//                 <Divider />
//                 <Text>63歳</Text>
//                 <Divider />
//                 <Text style={SC410_Style.v07_Profile}>地域</Text>
//                 <Divider />
//                 <Text>潮来釣具センター</Text>
//                 {/* ↑DBから取得したい */}
//                 <Divider />
//                 <Text style={SC410_Style.v07_Profile}>自己紹介</Text>
//                 <Divider />
//                 <Text>フィィィィィィッシュ！</Text>
//                 <Text>僕はただの釣具やのオヤジでございす。</Text>

//             </View>
//         </>
//     )
// }