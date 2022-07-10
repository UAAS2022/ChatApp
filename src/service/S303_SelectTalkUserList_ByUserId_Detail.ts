import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { T101_TalkUser, M050_User, T100_Talk, } from '../common/C020_FirebaseUtil_Types';
import { s140_SelectUser } from "./S140_SelectUser"
import { s240_SelectTalk } from "./S240_SelectTalk"
import { s290_SelectTalkUser } from "./S290_SelectTalkUser"
import { s301_SelectTalkUserList_ByUserId } from "./S301_SelectTalkUserList_ByUserId"
import { s302_SelectTalkUserList_ByTalkId } from "./S302_SelectTalkUserList_ByTalkId"

const SERVICE_ID = "S303"

export const s303_SelectTalkUserList_ByUserId_Detail = async (userId: string) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // 戻り値用のリストを定義
    let talkUserInfoList_Detail = [] as {
        talkInfo: T100_Talk,
        talkUserInfo: T101_TalkUser,
        chatUserInfo: M050_User,
    }[]
    // トークユーザ情報を取得
    const result_S301 = await s301_SelectTalkUserList_ByUserId(userId)
    const talkUserList = result_S301.talkUserList
    // 取得したトークユーザ情報に対し、for文でユーザ情報を取得する
    for (const talkUserInfo of talkUserList) {
        const tmpTalkId = talkUserInfo.TalkId
        // ①トーク情報を取得する
        const result_s240 = await s240_SelectTalk(tmpTalkId)
        const talkInfo = result_s240.talkInfo
        // ①トークIDに紐づくユーザIDを取得（条件：自分以外）
        // トークごとのユーザIDを取得する（自分自身を除く）
        const result_s302 = await s302_SelectTalkUserList_ByTalkId(tmpTalkId, "1", userId)
        // 取得ありの場合のみ後続処理を実施する。
        if (result_s302.talkUserList.length > 0) {
            const chatUserId = result_s302.talkUserList[0].UserId
            //console.log("①トークIDに紐づくユーザIDを取得予定（条件：自分以外）:", chatUserId)
            // ②ユーザIDに紐づくユーザ情報を取得
            const result_s140 = await s140_SelectUser(chatUserId)
            const tmpChatUserInfo = result_s140.userInfo
            //console.log("②ユーザIDに紐づくユーザ情報を取得:", tmpChatUserInfo.UserId)
            // ③オブジェクトをまとめてプッシュ
            const talkInfo_Detail = {
                talkInfo: talkInfo,
                talkUserInfo: talkUserInfo,
                chatUserInfo: tmpChatUserInfo,
            }
            talkUserInfoList_Detail.push(talkInfo_Detail)
        }
        //console.log("③オブジェクトをまとめてプッシュ:", talkInfo_Detail.talkUserInfo.UserId)
    }
    // 戻り値を定義
    const resultObj = {
        talkUserInfoList_Detail: talkUserInfoList_Detail
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    // c060_DebugLog(SERVICE_ID, "END", [resultObj])
    c060_DebugLog(SERVICE_ID, "END", [])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}
