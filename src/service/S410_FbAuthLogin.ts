import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_CheckUnique } from '../common/C020_FirebaseUtil';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S410"

export const s410_FbAuthLogin = async (
    email: string,
    password: string,
) => {
    // ---------------------------------------------------------------------------------------------------------
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [])
    // ---------------------------------------------------------------------------------------------------------
    // エラーフラグを初期化
    let errFlg = "0"
    // ユーザ追加
    const auth = getAuth();
    console.log("auth", auth)
    console.log("----------------------------------")
    const result = await createUserWithEmailAndPassword(auth, email, password)
    console.log("result", result)

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            console.log("ZZZZZZZZ")
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    console.log("AAAAAAAAA")

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