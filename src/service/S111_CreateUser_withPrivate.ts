import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User } from '../common/C020_FirebaseUtil_Types';
import { s110_CreateUser } from "./S110_CreateUser"
import { s160_CreateUserPrivate } from "./S160_CreateUserPrivate"

const SERVICE_ID = "S111"

export const s111_CreateUser_withPrivate = async (
    userId: string,
    password: string,
    userName: string,
    comment: string,
    profileImagePath: string,
    genderCd: string,
    age: number,
    areaCd: string,
    hashtags: string,
    logUserId: string
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // エラーフラグを初期化
    let errFlg = "0"
    // Pkeyチェック
    if (await c020_CheckUnique(FIREBASE_COLLECTIONS.M050_User, ["UserId"], [userId])) {
        // Firebase処理
        // ①ユーザ情報登録
        const result_S110 = await s110_CreateUser(userId, userName, comment, profileImagePath, genderCd, age, areaCd, hashtags, logUserId)
        // ②ユーザ機密情報登録
        const result_S160 = await s160_CreateUserPrivate(userId, userId, password, logUserId)
    } else {
        errFlg = "1"
        console.log("error")
    }
    // 返却処理
    const resultObj = {
        errFlg: errFlg,
        returnInfo: {
            userId: userId
        }
    }
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [resultObj])
    // ---------------------------------------------------------------------------------------------------------
    return resultObj
}