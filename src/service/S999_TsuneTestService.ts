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


const SERVICE_ID = "S999"

export const s999_TsuneTestService = async (
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // エラーフラグを初期化
    let errFlg = "0"

    // ---------------------------------------------------------------------------------------------------------
    const param = { text: "aaa" }
    const resultData_S999_01 = await c020_HttpsCallable("addMessage", param)
    const resultData_S999_02 = await c020_HttpsCallable("getUser", param)

    // const data = result.data;

    // ---------------------------------------------------------------------------------------------------------

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