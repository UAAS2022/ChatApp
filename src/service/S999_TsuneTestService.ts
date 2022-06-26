import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique } from '../common/C020_FirebaseUtil';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User } from '../common/C020_FirebaseUtil_Types';
import { c020_HttpsCallable } from "../common/C020_FirebaseUtil_Test";
import { s151_SelectUserList_ALL } from './S151_SelectUserList_ALL';
import { s121_UpdateUser_LoginDatetime } from './S121_UpdateUser_LoginDatetime';


const SERVICE_ID = "S999"

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