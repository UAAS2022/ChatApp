import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique } from '../common/C020_FirebaseUtil';
import { ref, uploadBytes } from 'firebase/storage';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User } from '../common/C020_FirebaseUtil_Types';
import { s360_FileUpload } from "./S360_FileUpload"

const SERVICE_ID = "S361"

export const s361_ProfileImageUpload = async (
    userId: string,
    uri: string,
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // エラーフラグを初期化
    let errFlg = "0"
    // オブジェクトキーの定義
    const objectKey = "100_User/" + userId + "/" + "profile.png"
    // オブジェクトの定義（uriから画像を取得し、blobに変換）
    const response = await fetch(uri);
    const blob = await response.blob();
    // ファイルアップロードメソッドの呼び出し
    s360_FileUpload(objectKey, blob)
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