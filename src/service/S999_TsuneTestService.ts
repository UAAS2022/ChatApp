import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique } from '../common/C020_FirebaseUtil';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User, T100_Talk } from '../common/C020_FirebaseUtil_Types';
import { c020_HttpsCallable } from "../common/C020_FirebaseUtil_Test";
import { s151_SelectUserList_ALL } from './S151_SelectUserList_ALL';
import { s121_UpdateUser_LoginDatetime } from './S121_UpdateUser_LoginDatetime';
import { s220_UpdateTalk } from './S220_UpdateTalk';


const SERVICE_ID = "S999"
const PATCH_USER_ID = "PATCHUSER"

export const s999_TsuneTestService = async (
    paramObj: any,
    processKbnList: number[]
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // エラーフラグを初期化
    let errFlg = "0"

    // (仮)処理区分を取得する
    const processKbn = processKbnList[0]

    // resultの初期化
    let resultData_S999_01 = {}
    let resultData_S999_02 = {}
    let resultData_S999_03 = {}

    switch (processKbn) {
        // ---------------------------------------------------------------------------------------------------------
        case 1:
            const param = { text: "aaa" }
            const resultData_S999_01_01 = await c020_HttpsCallable("addMessage", param)
            const resultData_S999_01_02 = await c020_HttpsCallable("getUser", param)
            resultData_S999_01 = {
                resultData_S999_01_01: resultData_S999_01_01,
                resultData_S999_01_02: resultData_S999_01_02,
            }
        // ---------------------------------------------------------------------------------------------------------
        case 2:
            // 全ユーザに対してパッチを当てる
            // 1.全ユーザ情報を取得する
            const resultObj_S151 = await s151_SelectUserList_ALL()
            const userList_ALL = resultObj_S151.userList
            // 2.更新する
            for (let userInfo of userList_ALL) {
                console.log("ユーザID：", userInfo.UserId)
                // ユーザIDを取得する
                const userId = userInfo.UserId
                // データを更新する
                await s121_UpdateUser_LoginDatetime(userId, userId)
            }
            resultData_S999_02 = {
            }
        // ---------------------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------------
        case 3:
            // 全ユーザに対してパッチを当てる
            // 1.全ユーザ情報を取得する
            const resultObj_Case3 = await case3_SelectTalk_ALL()
            const talkList = resultObj_Case3.talkList
            // 2.更新する
            for (let talkInfo of talkList) {
                console.log("トークID：", talkInfo.TalkId)
                // ユーザIDを取得する
                const talkId = talkInfo.TalkId
                // データを更新する
                await case3_UpdateTalk(talkId, PATCH_USER_ID)
            }
            resultData_S999_03 = {
            }
        // ---------------------------------------------------------------------------------------------------------
        default:
            console.log("processKbnが不正です")
        // ---------------------------------------------------------------------------------------------------------
    }


    // 返却処理
    const resultObj = {
        errFlg: errFlg,
        result: {
            resultData_S999_01: resultData_S999_01,
            resultData_S999_02: resultData_S999_02,
        }
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}



const case3_SelectTalk_ALL = async () => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // 戻り値用のリストを定義
    let talkList = [] as any[]
    // クエリを定義
    const query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T100_Talk))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach((doc) => {
        talkList.push(doc.data() as T100_Talk)
    });
    // 戻り値を定義
    const resultObj = {
        talkList: talkList
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}

const case3_UpdateTalk = async (
    talkId: string,
    logUserId: string,
    talkName?: string,
    talkKbn?: number,
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // エラーフラグを初期化
    let errFlg = "0"

    // ②トーク情報を更新------------------------------------------------------------------------
    // ドキュメントの中身を定義
    const newTalkInfo = {
        // _0_DocId: docId,
        // TalkId: docId,
        // TalkName: talkName,
        // TalkKbn: talkKbn,
        LatestMessageDateTime: Timestamp.now(),
        // _CrtUserId: logUserId,
        // _CrtServiceId: SERVICE_ID,
        // _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
        // } as T100_Talk;
    };
    const result_FB = await updateDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T100_Talk, talkId), newTalkInfo);
    // ②---------------------------------------------------------------------------------------
    // 返却処理
    const resultObj = {
        errFlg: errFlg,
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}