import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { query, where, orderBy, limit, } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId, c020_UpdateDocId, c020_CreateSecId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T110_ChatMessage } from '../common/C020_FirebaseUtil_Types';

const SERVICE_ID = "S310"

export const s310_CreateChatMessage = async (
    talkId: string,
    // seq: number,
    sendUserId: string,
    message: string,
    logUserId: string
) => {
    // エラーフラグを初期化
    let errFlg = "0"

    // ①チャットメッセージIDを採番------------------------------------------------------------------------
    // 採番したIDを取得する
    const result_c020 = await c020_CreateSecId(FIREBASE_COLLECTIONS.S110_ChatMessageId, logUserId, SERVICE_ID)
    const docId = result_c020.returnInfo.secId
    console.log("①チャットメッセージを採番", docId)
    // --------------------------------------------------------------------------------------

    // ② 最大通番+1を取得------------------------------------------------------------------------
    const collectionRef1 = collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage)
    const query_FB_1 = query(collectionRef1, where("TalkId", "==", talkId), orderBy("Seq", 'desc'), limit(1))
    const querySnapshot_1 = await getDocs(query_FB_1);
    // querySnapshotからdocのデータを取り出し、戻り値用のリストに追加する
    let seq = 0
    querySnapshot_1.forEach((doc) => {
        let tmp_T110_ChatMessage = doc.data() as T110_ChatMessage
        seq = tmp_T110_ChatMessage.Seq + 1
    });
    console.log("② 最大通番+1を取得", seq)
    // ------------------------------------------------------------------------------------

    // ③ ドキュメント追加--------------------------------------------------------------------
    // ドキュメントの中身を定義
    const newChatMessageInfo = {
        _0_DocId: docId,
        TalkId: talkId,
        Seq: seq,
        SendUserId: sendUserId,
        SendDateTime: Timestamp.now(),
        Message: message,
        _CrtUserId: logUserId,
        _CrtServiceId: SERVICE_ID,
        _CrtDatetime: Timestamp.now(),
        _UpdUserId: logUserId,
        _UpdServiceId: SERVICE_ID,
        _UpdDatetime: Timestamp.now(),
    } as T110_ChatMessage;
    // Firebase処理
    // const result_FB = await setDoc(doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage, docId), newChatMessageInfo);       //→Idを指定する場合はこっち
    const docRef2 = doc(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage, docId)
    const result_FB_2 = await setDoc(docRef2, newChatMessageInfo);                                //→Idを指定しない場合はこっち
    console.log("③ ドキュメント追加", docId)
    // ------------------------------------------------------------------------------------

    // ③ ドキュメントID取得--------------------------------------------------------------------
    // const collectionRef3 = collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage)
    // const query_FB_3 = query(collectionRef3, where("TalkId", "==", talkId), where("Seq", "==", seq), where("SendUserId", "==", sendUserId), orderBy("_UpdDatetime", 'desc'), limit(1))
    // const querySnapshot_3 = await getDocs(query_FB_3);
    // querySnapshot_3.forEach((doc) => {
    //     docId = doc.id
    // });
    // console.log("③ ドキュメントID取得", querySnapshot_3.size, docId)
    // console.log("TalkId", talkId, "Seq", seq, "SendUserId", sendUserId)

    // ------------------------------------------------------------------------------------

    // ③ _0_DocId更新------------------------------------------------------------------------
    c020_UpdateDocId(FIREBASE_COLLECTIONS.T110_ChatMessage, docId, logUserId, SERVICE_ID)
    // ----------------------------------------------------------------------------------

    const resultObj = {
        errFlg: errFlg,
        result_FB2: result_FB_2,
    }
    return resultObj
}