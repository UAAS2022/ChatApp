import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp, onSnapshot } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T110_ChatMessage } from '../common/C020_FirebaseUtil_Types';
import { c060_DebugLog } from "../common/C060_LogUtil"
import type { SC220_ChatMessageInfo } from "../screens/SC220_ChatScreen/SC220_Types"

const SERVICE_ID = "S352"

export const s352_SelectChatMessageList_RealTime = async (
    talkId: string,
    setChatMessageInfoList: (value: React.SetStateAction<SC220_ChatMessageInfo[]>) => void,
    cursorSeq?: number,
) => {
    // 開始ログ
    c060_DebugLog(SERVICE_ID, "START", [talkId, setChatMessageInfoList, cursorSeq])
    // チャットメーセージ情報リストを初期化
    const newChatMessageInfoList = [] as SC220_ChatMessageInfo[];
    // クエリを定義
    let query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage),
        where("TalkId", "==", talkId),
        orderBy("Seq", "asc"),
        limit(1000)
    )
    if (cursorSeq !== undefined) {
        query_FB = query(query_FB, where("Seq", ">", cursorSeq))
    }
    // リアルタイムで値を取得する
    const unsubscribe = await onSnapshot(query_FB, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            // メッセージが追加された場合
            if (change.type === "added") {
                // 変更ドキュメントを取得
                const newDoc = change.doc.data()
                // 画面表示用に変換
                const newChatMessageInfo = {} as SC220_ChatMessageInfo
                newChatMessageInfo._0_DocId = newDoc._0_DocId
                newChatMessageInfo.talkId = newDoc.TalkId
                newChatMessageInfo.seq = newDoc.Seq
                newChatMessageInfo.sendUserId = newDoc.SendUserId
                newChatMessageInfo.message = newDoc.Message
                newChatMessageInfo.sendDateTime = newDoc.SendDateTime.toDate()
                // リストに追加メッセージを格納する(unshift:先頭に追加、push：最後尾に追加)
                newChatMessageInfoList.unshift(newChatMessageInfo)
                //console.log(newChatMessageInfo.seq, newChatMessageInfo.message);
                // ステートの更新
                setChatMessageInfoList(newChatMessageInfoList)
                // サブスクの終了
                // unsubscribe();
            }
            // // メッセージが修正された場合
            // else if (change.type === "modified") {
            //     //console.log("Modified Message: ");
            // }
            // // メッセージが削除された場合
            // else if (change.type === "removed") {
            //     //console.log("Removed Message: ");
            // }
        });
    });
    // ---------------------------------------------------------------------------------------------------------
    // 終了ログ
    c060_DebugLog(SERVICE_ID, "END", [])
    // ---------------------------------------------------------------------------------------------------------
};
