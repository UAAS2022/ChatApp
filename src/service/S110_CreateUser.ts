import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S110"

export const s110_CreateUser = async (
    userId: string,
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
    // ドキュメントIDを定義
    const docId = c020_MakeDocId([userId])
    // ドキュメントの中身を定義
    const newUserInfo = {
        _0_DocId: docId,
        UserId: userId,
        UserName: userName,
        Comment: comment,
        LatestLoginDatatime: Timestamp.now(),
        ProfileImagePath: profileImagePath,
        GenderCd: genderCd,
        Age: age,
        AreaCd: areaCd,
        Hashtags: hashtags,
        _CrtUserId: logUserId,
        _CrtServiceId: SERVICE_ID,
        _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as M050_User;
    // Pkeyチェック
    if (await c020_CheckUnique(FIREBASE_COLLECTIONS.M050_User, ["UserId"], [userId])) {
        // Firebase処理
        const docRef = doc(DB_FIREBASE, FIREBASE_COLLECTIONS.M050_User, docId)
        const result_FB = await setDoc(docRef, newUserInfo, { merge: false });       //→Idを指定する場合はこっち
        // await addDoc(collection(db_Firebase, FIREBASE_COLLECTIONS.T999_M050_USER), newUserInfo);                                 //→Idを指定しない場合はこっち
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