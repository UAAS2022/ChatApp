import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { M050_User } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S150"

export const s150_SelectUserList_New = async () => {
    // 戻り値用のリストを定義
    let userList = [] as any[]
    // クエリを定義
    const query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.M050_User), orderBy("LatestLoginDatatime", 'desc'), limit(100))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach((doc) => {
        userList.push(doc.data() as M050_User)
    });
    // 戻り値を定義
    const resultObj = {
        userList: userList
    }
    return resultObj
}
