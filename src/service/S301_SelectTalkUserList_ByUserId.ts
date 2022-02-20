import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T101_TalkUser, M050_User, } from '../common/C020_FirebaseUtil_Types';
import { s140_SelectUser } from "./S140_SelectUser"
import { s290_SelectTalkUser } from "./S290_SelectTalkUser"
import { s302_SelectTalkUserList_ByTalkId } from "./S302_SelectTalkUserList_ByTalkId"

const SERVICE_ID = "S301"

export const s301_SelectTalkUserList_ByUserId = async (userId: string) => {
    console.log("s301_SelectTalkUserList_ByUserId：開始------------------------------")
    // 戻り値用のリストを定義
    let talkUserList = [] as T101_TalkUser[]
    // let talkUserInfo = {} as T101_TalkUser
    // let chatUserInfoList = [] as M050_User[]
    let talkUserInfoList_Detail = [] as {
        talkUserInfo: T101_TalkUser,
        chatUserInfo: M050_User,
    }[]

    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser))
    query_FB = query(query_FB, where("UserId", "==", userId))
    // query_FB = query(query_FB, orderBy("LatestLoginDatatime", 'desc'))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、リストに追加する
    querySnapshot.forEach(async (doc) => {
        // トーク情報取得
        const tmpTalkUserInfo = doc.data() as T101_TalkUser
        talkUserList.push(tmpTalkUserInfo)
    });
    console.log("talkUserList.length", talkUserList.length)
    // 取得したトーク情報に対し、for文でユーザ情報を取得する
    for (const talkUserInfo of talkUserList) {
        // ①トークIDに紐づくユーザIDを取得予定（条件：自分以外）
        const tmpTalkId = talkUserInfo.TalkId
        // トークごとのユーザIDを取得する（自分自身を除く）
        const result_s302 = await s302_SelectTalkUserList_ByTalkId(tmpTalkId, "1", userId)
        const chatUserId = result_s302.talkUserList[0].UserId
        console.log("①トークIDに紐づくユーザIDを取得予定（条件：自分以外）:", chatUserId)
        // ②ユーザIDに紐づくユーザ情報を取得
        const result_s140 = await s140_SelectUser(chatUserId)
        const tmpChatUserInfo = result_s140.userInfo
        console.log("②ユーザIDに紐づくユーザ情報を取得:", tmpChatUserInfo.UserId)
        // ③オブジェクトをまとめてプッシュ
        const talkInfo_Detail = {
            talkUserInfo: talkUserInfo,
            chatUserInfo: tmpChatUserInfo,
        }
        talkUserInfoList_Detail.push(talkInfo_Detail)
        console.log("③オブジェクトをまとめてプッシュ:", talkInfo_Detail.talkUserInfo.UserId)
    }
    // 戻り値を定義
    const resultObj = {
        talkUserInfoList_Detail: talkUserInfoList_Detail
    }
    console.log("resultObj.talkUserInfoList_Detail.length:", resultObj.talkUserInfoList_Detail.length)
    console.log("s301_SelectTalkUserList_ByUserId：終了------------------------------")
    return resultObj
}
