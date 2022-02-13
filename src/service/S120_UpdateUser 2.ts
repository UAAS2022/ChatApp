import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, makeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S120"

export const s120_UpdateUser = async (
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
    // ドキュメントIDを定義
    const docId = makeDocId([userId])
    // ドキュメントの中身を定義
    const newUserInfo = {
        // UserId: userId,
        UserName: userName,
        Comment: comment,
        LatestLoginDatatime: Timestamp.now(),
        ProfileImagePath: profileImagePath,
        GenderCd: genderCd,
        Age: age,
        AreaCd: areaCd,
        Hashtags: hashtags,
        // _CrtUserId: logUserId,
        // _CrtServiceId: SERVICE_ID,
        // _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as M050_User;
    // Firebase処理
    const result_FB = await updateDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.M050_User, docId), newUserInfo);
    // 戻り値を定義
    const resultObj = {
        result_FB: result_FB
    }
    return resultObj
}