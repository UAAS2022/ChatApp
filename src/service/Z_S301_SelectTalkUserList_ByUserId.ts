import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T101_TalkUser, M050_User } from '../common/C020_FirebaseUtil_Types';
import { s140_SelectUser } from "./S140_SelectUser"
import { s290_SelectTalkUser } from "./S290_SelectTalkUser"
import { s302_SelectTalkUserList_ByTalkId } from "./S302_SelectTalkUserList_ByTalkId"

const SERVICE_ID = "S301"

export const s301_SelectTalkUserList_ByUserId = async (userId: string) => {
    //console.log("s301_SelectTalkUserList_ByUserId：開始------------------------------")
    // 戻り値用のリストを定義
    // let talkUserList = [] as T101_TalkUser[]
    // let talkUserInfo = {} as T101_TalkUser
    // let chatUserInfoList = [] as M050_User[]
    let talkInfoList = [{}] as {
        talkUserInfo: T101_TalkUser,
        chatUserInfo: M050_User,
    }[]

    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser))
    query_FB = query(query_FB, where("UserId", "==", userId))
    // query_FB = query(query_FB, orderBy("LatestLoginDatetime", 'desc'))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach(async (doc) => {
        // ①トーク情報取得
        const tmpTalkUserInfo = doc.data() as T101_TalkUser
        //console.log("①トーク情報取得:", tmpTalkUserInfo.TalkId)
        // talkUserList.push(talkUserInfo)
        // ②トークIDに紐づくユーザIDを取得予定（条件：自分以外）
        const tmpTalkId = tmpTalkUserInfo.TalkId
        // トークごとのユーザIDを取得する（自分自身を除く）
        const result_s302 = await s302_SelectTalkUserList_ByTalkId(tmpTalkId, "1", userId)
        const chatUserId = result_s302.talkUserList[0].UserId
        //console.log("②トークIDに紐づくユーザIDを取得予定（条件：自分以外）:", chatUserId)
        // ③ユーザIDに紐づくユーザ情報を取得
        const result_s140 = await s140_SelectUser(chatUserId)
        const tmpChatUserInfo = result_s140.userInfo
        //console.log("③ユーザIDに紐づくユーザ情報を取得:", tmpChatUserInfo.UserId)
        // chatUserInfoList.push(chatUserInfo)
        // ④オブジェクトをまとめてプッシュ
        const talkInfo = {
            talkUserInfo: tmpTalkUserInfo,
            chatUserInfo: tmpChatUserInfo,
        }
        talkInfoList.push(talkInfo)
        //console.log("④オブジェクトをまとめてプッシュ:", talkInfo)
    });
    // 戻り値を定義
    const resultObj = {
        talkInfoList: talkInfoList
    }
    //console.log("resultObj:", resultObj)
    //console.log("s301_SelectTalkUserList_ByUserId：終了------------------------------")
    return resultObj
}
