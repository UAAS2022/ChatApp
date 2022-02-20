import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T110_ChatMessage } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S351"

export const s351_SelectChatMessageList_New = async (
    talkId: string,
    // userId: string,
) => {
    // エラーフラグを初期化
    let errFlg = "0"
    // 戻り値用のリストを定義
    let chatMessageList = [] as T110_ChatMessage[]
    // クエリを定義
    const query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage), where("TalkId", "==", talkId), orderBy("Seq", 'desc'), limit(1000))
    // クエリを実行し、FirebaseからquerySnapshotを取得
    const querySnapshot = await getDocs(query_FB);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    querySnapshot.forEach((doc) => {
        chatMessageList.push(doc.data() as T110_ChatMessage)
    });
    // 戻り値を定義
    const resultObj = {
        errFlg: errFlg,
        chatMessageList: chatMessageList
    }
    return resultObj
}
