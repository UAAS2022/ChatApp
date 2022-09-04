import React from 'react';
import { Dispatch } from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp, onSnapshot } from 'firebase/firestore';
import type { QuerySnapshot, DocumentData } from 'firebase/firestore';
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
import { SC210_UPDATE_TAlKUSER } from '../screens/SC000_BaseComponent/SC000_Action';
import { SC000_Action } from '../screens/SC000_BaseComponent/SC000_Types';
import { SC210_TalkUserInfo_Detail } from '../screens/SC000_BaseComponent/SC000_Types';
import { SC210_BaseContext } from '../screens/SC000_BaseComponent/SC000_Types';
import { dateToString_Zero } from '../common/C050_DateUtil';

const SERVICE_ID = "S304"

export const s304_SelectTalkUserList_ByUserId_Detail_RealTime = async (
    userId: string,
    baseDispatch: Dispatch<SC000_Action>
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // 戻り値用のリストを定義
    let talkUserList = [] as T101_TalkUser[]
    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T101_TalkUser))
    query_FB = query(query_FB, where("UserId", "==", userId))
    // query_FB = query(query_FB, orderBy("ReadedDatetime", 'desc'))
    // リアルタイムで値を取得する
    const unsubscribe = onSnapshot(query_FB, async (snapshot) => {
        const querySnapshot_Change = snapshot.docChanges()
        // querySnapshotからdocのデータを取り出し、リストに追加する
        querySnapshot_Change.forEach(async (change) => {
            // // トークユーザ情報取得
            const tmpTalkUserInfo = change.doc.data() as T101_TalkUser
            // talkUserList.push(tmpTalkUserInfo)
            // トークリストが追加された場合
            if (change.type === "added") {
                console.log("----------------------------------------------------------------------change.type === added", tmpTalkUserInfo.TalkId, tmpTalkUserInfo.UserId)
                talkUserList.push(tmpTalkUserInfo)
            }
            // トークリストが修正された場合
            else if (change.type === "modified") {
                //console.log("Modified Message: ");
                console.log("----------------------------------------------------------------------change.type === modified", tmpTalkUserInfo.TalkId, tmpTalkUserInfo.UserId)
                // 既存のリストから値を取り除く
                talkUserList = talkUserList.filter(item => ((item.TalkId.match(tmpTalkUserInfo.TalkId)) == null && (item.TalkId.match(tmpTalkUserInfo.UserId)) == null));
                // 追加する
                talkUserList.push(tmpTalkUserInfo)
            }
            // トークリストが削除された場合
            else if (change.type === "removed") {
                //console.log("Removed Message: ");
                console.log("----------------------------------------------------------------------change.type === modified", tmpTalkUserInfo.TalkId, tmpTalkUserInfo.UserId)
                // talkUserList.push(tmpTalkUserInfo)
            }
        });
        // 戻り値を定義
        const result_S304 = {
            talkUserList: talkUserList
        }
        // ---------------------------------------------------------------------------------------------
        // 戻り値を定義
        const result_S303 = await _s304_getTalkUserInfoList_Detail(userId, result_S304.talkUserList)
        // ---------------------------------------------------------------------------------------------------------
        _s304_BaseDispatch_SC210_UPDATE_TAlKUSER(result_S303, baseDispatch)
        // ---------------------------------------------------------------------------------------------------------
    });
}

const _s304_getTalkUserInfoList_Detail = async (
    userId: string,
    talkUserList: T101_TalkUser[]
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", ["実行関数：_s304_getTalkUserInfoList_Detail"])
    // ---------------------------------------------------------------------------------------------------------
    // 戻り値用のリストを定義
    let talkUserInfoList_Detail = [] as {
        talkInfo: T100_Talk,
        talkUserInfo: T101_TalkUser,
        chatUserInfo: M050_User,
    }[]
    // トークユーザ情報を取得
    // const result_S304 = await s304_SelectTalkUserList_ByUserId(userId)
    // const talkUserList = result_S304.talkUserList
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
    c060_DebugLog(SERVICE_ID, "END", ["実行関数：_s304_getTalkUserInfoList_Detail"])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}

const _s304_BaseDispatch_SC210_UPDATE_TAlKUSER = async (result_S303: {
    talkUserInfoList_Detail: {
        talkInfo: T100_Talk;
        talkUserInfo: T101_TalkUser;
        chatUserInfo: M050_User;
    }[];
},
    baseDispatch: Dispatch<SC000_Action>
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", ["実行関数：_s304_BaseDispatch_SC210_UPDATE_TAlKUSER",])
    // ---------------------------------------------------------------------------------------------------------
    const dbObj_talkUserInfoList_Detail = result_S303.talkUserInfoList_Detail
    // ②データをuserInfoListステートに合わせる
    let new_talkUserInfoList_Detail = dbObj_talkUserInfoList_Detail.map((dbObj_talkUserInfo_Detail) => {
        // 日付変換
        const latestMessageDateTime = dbObj_talkUserInfo_Detail.talkInfo.LatestMessageDateTime.toDate()
        const latestLoginDatetime = dbObj_talkUserInfo_Detail.chatUserInfo.LatestLoginDatetime.toDate()
        // トーク名判断
        let talkName = ""
        const talkKbn = String(dbObj_talkUserInfo_Detail.talkInfo.TalkKbn)
        if (talkKbn === "1") {
            // ユーザとの1対1チャットの場合、ユーザ名を入れる
            talkName = dbObj_talkUserInfo_Detail.chatUserInfo.UserName
        }
        if (talkKbn === "2") {
            // グループチャットの場合、T110_トークのトーク名を入れる
            talkName = dbObj_talkUserInfo_Detail.talkInfo.TalkName
        } else {
            // ユーザとの1対1チャットの場合、ユーザ名を入れる
            talkName = dbObj_talkUserInfo_Detail.chatUserInfo.UserName
        }
        const talkUserInfo_Detail = {
            talkInfo: {
                talkId: dbObj_talkUserInfo_Detail.talkUserInfo.TalkId,
                talkName: talkName,
                talkKbn: talkKbn,
                latestMessageDateTime: dateToString_Zero(latestMessageDateTime, "MM/DD hh:mm:ss"),
            },
            userInfo: {
                _0_DocId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                userId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
                userName: dbObj_talkUserInfo_Detail.chatUserInfo.UserName,
                latestLoginDatetime: dateToString_Zero(latestLoginDatetime, "MM/DD"),
                profileImagePath: dbObj_talkUserInfo_Detail.chatUserInfo.ProfileImagePath,
            }
        } as SC210_TalkUserInfo_Detail
        return talkUserInfo_Detail
    })
    // 最新メッセージ送信日時でソートする
    new_talkUserInfoList_Detail = new_talkUserInfoList_Detail.sort(
        (n1, n2) => {
            let val = 0
            if (n1.talkInfo.latestMessageDateTime > n2.talkInfo.latestMessageDateTime) {
                val = -1;
            }
            if (n1.talkInfo.latestMessageDateTime < n2.talkInfo.latestMessageDateTime) {
                return val = 1;
            }
            return val;
        }
    )

    // ③更新用ステートを定義する
    const newState = {
        baseContext_SC210: {
            talkUserInfoList_Detail: new_talkUserInfoList_Detail
        } as SC210_BaseContext
    }
    // ④ステートを更新する
    baseDispatch(SC210_UPDATE_TAlKUSER(newState))
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    // c060_DebugLog(SERVICE_ID, "END", [resultObj])
    c060_DebugLog(SERVICE_ID, "END", ["実行関数：_s304_BaseDispatch_SC210_UPDATE_TAlKUSER"])
    // ---------------------------------------------------------------------------------------------------------
}



// export const s352_SelectChatMessageList_RealTime = async (
//     talkId: string,
//     setChatMessageInfoList: (value: React.SetStateAction<SC999_ChatMessageInfo[]>) => void
// ) => {
//     // ---------------------------------------------------------------------------------------------------------
//     // 開始ログ
//     c060_DebugLog(SERVICE_ID, "START", [])
//     // ---------------------------------------------------------------------------------------------------------
//     // チャットメーセージ情報リストを初期化
//     const newChatMessageInfoList = [] as SC999_ChatMessageInfo[];
//     // クエリを定義
//     const query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage), where("TalkId", "==", talkId), orderBy("Seq", "asc"), limit(1000))
//     // リアルタイムで値を取得する
//     const unsubscribe = await onSnapshot(query_FB, (snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//             // メッセージが追加された場合
//             if (change.type === "added") {
//                 //console.log("New Message: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//                 // 取得処理実行
//                 // getChatMessageList()
//                 // 変更ドキュメントを取得
//                 const newDoc = change.doc.data()
//                 // 画面表示用に変換
//                 const newChatMessageInfo = {} as SC999_ChatMessageInfo
//                 newChatMessageInfo._0_DocId = newDoc._0_DocId
//                 newChatMessageInfo.talkId = newDoc.TalkId
//                 newChatMessageInfo.seq = newDoc.Seq
//                 newChatMessageInfo.sendUserId = newDoc.SendUserId
//                 newChatMessageInfo.message = newDoc.Message
//                 newChatMessageInfo.sendDateTime = newDoc.SendDateTime
//                 // リストに追加メッセージを格納する(unshift:先頭に追加、push：最後尾に追加)
//                 newChatMessageInfoList.unshift(newChatMessageInfo)
//                 //console.log(newChatMessageInfo.seq, newChatMessageInfo.message);
//                 // ステートの更新
//                 setChatMessageInfoList(newChatMessageInfoList)
//                 // サブスクの終了
//                 // unsubscribe();
//             }
//             // // メッセージが修正された場合
//             // else if (change.type === "modified") {
//             //     //console.log("Modified Message: ");
//             // }
//             // // メッセージが削除された場合
//             // else if (change.type === "removed") {
//             //     //console.log("Removed Message: ");
//             // }
//         });
//     });
//     // ---------------------------------------------------------------------------------------------------------
//     // 終了ログ
//     c060_DebugLog(SERVICE_ID, "END", [])
//     // ---------------------------------------------------------------------------------------------------------
// }

// export const S304_SelectTalkUserList_ByUserId_Detail_RealTime0 = async (
//     userId: string,
//     baseDispatch: (value: React.SetStateAction<SC000_Action>) => void
// ) => {
//     // ---------------------------------------------------------------------------------------------------------
//     // 開始ログ
//     c060_DebugLog(SERVICE_ID, "START", [])
//     // ---------------------------------------------------------------------------------------------------------
//     // 戻り値用のリストを定義
//     let talkUserInfoList_Detail = [] as {
//         talkInfo: T100_Talk,
//         talkUserInfo: T101_TalkUser,
//         chatUserInfo: M050_User,
//     }[]
//     // トークユーザ情報を取得
//     const result_S301 = await s301_SelectTalkUserList_ByUserId(userId)
//     const talkUserList = result_S301.talkUserList
//     // 取得したトークユーザ情報に対し、for文でユーザ情報を取得する
//     for (const talkUserInfo of talkUserList) {
//         const tmpTalkId = talkUserInfo.TalkId
//         // ①トーク情報を取得する
//         const result_s240 = await s240_SelectTalk(tmpTalkId)
//         const talkInfo = result_s240.talkInfo
//         // ①トークIDに紐づくユーザIDを取得（条件：自分以外）
//         // トークごとのユーザIDを取得する（自分自身を除く）
//         const result_s302 = await s302_SelectTalkUserList_ByTalkId(tmpTalkId, "1", userId)
//         // 取得ありの場合のみ後続処理を実施する。
//         if (result_s302.talkUserList.length > 0) {
//             const chatUserId = result_s302.talkUserList[0].UserId
//             //console.log("①トークIDに紐づくユーザIDを取得予定（条件：自分以外）:", chatUserId)
//             // ②ユーザIDに紐づくユーザ情報を取得
//             const result_s140 = await s140_SelectUser(chatUserId)
//             const tmpChatUserInfo = result_s140.userInfo
//             //console.log("②ユーザIDに紐づくユーザ情報を取得:", tmpChatUserInfo.UserId)
//             // ③オブジェクトをまとめてプッシュ
//             const talkInfo_Detail = {
//                 talkInfo: talkInfo,
//                 talkUserInfo: talkUserInfo,
//                 chatUserInfo: tmpChatUserInfo,
//             }
//             talkUserInfoList_Detail.push(talkInfo_Detail)
//         }
//         //console.log("③オブジェクトをまとめてプッシュ:", talkInfo_Detail.talkUserInfo.UserId)
//     }
//     // 戻り値を定義
//     const resultObj = {
//         talkUserInfoList_Detail: talkUserInfoList_Detail
//     }
//     // ---------------------------------------------------------------------------------------------------------
//     // 終了ログ
//     // c060_DebugLog(SERVICE_ID, "END", [resultObj])
//     c060_DebugLog(SERVICE_ID, "END", [])
//     // ---------------------------------------------------------------------------------------------------------
//     return resultObj
// }

// // Firebaseからデータを取得する関数
// const getTalkUserInfoList_Detail = async (baseDispatch: (value: React.SetStateAction<SC000_Action>) => void) => {
//     const result_S303 = await s303_SelectTalkUserList_ByUserId_Detail(userId)
//     const dbObj_talkUserInfoList_Detail = result_S303.talkUserInfoList_Detail
//     // ②データをuserInfoListステートに合わせる
//     let new_talkUserInfoList_Detail = dbObj_talkUserInfoList_Detail.map((dbObj_talkUserInfo_Detail) => {
//         // 日付変換
//         const latestMessageDateTime = dbObj_talkUserInfo_Detail.talkInfo.LatestMessageDateTime.toDate()
//         const latestLoginDatetime = dbObj_talkUserInfo_Detail.chatUserInfo.LatestLoginDatetime.toDate()
//         // トーク名判断
//         let talkName = ""
//         const talkKbn = String(dbObj_talkUserInfo_Detail.talkInfo.TalkKbn)
//         if (talkKbn === "1") {
//             // ユーザとの1対1チャットの場合、ユーザ名を入れる
//             talkName = dbObj_talkUserInfo_Detail.chatUserInfo.UserName
//         }
//         if (talkKbn === "2") {
//             // グループチャットの場合、T110_トークのトーク名を入れる
//             talkName = dbObj_talkUserInfo_Detail.talkInfo.TalkName
//         } else {
//             // ユーザとの1対1チャットの場合、ユーザ名を入れる
//             talkName = dbObj_talkUserInfo_Detail.chatUserInfo.UserName
//         }
//         const talkUserInfo_Detail = {
//             talkInfo: {
//                 talkId: dbObj_talkUserInfo_Detail.talkUserInfo.TalkId,
//                 talkName: talkName,
//                 talkKbn: talkKbn,
//                 latestMessageDateTime: dateToString_Zero(latestMessageDateTime, "MM/DD hh:mm"),
//             },
//             userInfo: {
//                 _0_DocId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
//                 userId: dbObj_talkUserInfo_Detail.chatUserInfo.UserId,
//                 userName: dbObj_talkUserInfo_Detail.chatUserInfo.UserName,
//                 latestLoginDatetime: dateToString_Zero(latestLoginDatetime, "MM/DD"),
//                 profileImagePath: dbObj_talkUserInfo_Detail.chatUserInfo.ProfileImagePath,
//             }
//         } as SC210_TalkUserInfo_Detail
//         return talkUserInfo_Detail
//     })
//     // 最新メッセージ送信日時でソートする
//     new_talkUserInfoList_Detail = new_talkUserInfoList_Detail.sort(
//         (n1, n2) => {
//             let val = 0
//             if (n1.talkInfo.latestMessageDateTime > n2.talkInfo.latestMessageDateTime) {
//                 val = -1;
//             }
//             if (n1.talkInfo.latestMessageDateTime < n2.talkInfo.latestMessageDateTime) {
//                 return val = 1;
//             }
//             return val;
//         }
//     )

//     // ③更新用ステートを定義する
//     const newState = {
//         baseContext_SC210: {
//             talkUserInfoList_Detail: new_talkUserInfoList_Detail
//         } as SC210_BaseContext
//     }
//     // ④ステートを更新する
//     baseDispatch(SC210_UPDATE_TAlKUSER(newState))
// }