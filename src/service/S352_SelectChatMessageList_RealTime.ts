import React from 'react';
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, Timestamp, onSnapshot } from 'firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { DB_FIREBASE, SG_FIREBASE, FIREBASE_COLLECTIONS, c020_MakeDocId } from '../common/C020_FirebaseUtil';
import { C000_FIREBASE_INFO } from '../common/C000_Const';
import type { T110_ChatMessage } from '../common/C020_FirebaseUtil_Types';
import type { SC999_ChatMessageInfo } from "../screens/SC999_Test/SC999_Types"

const SERVICE_ID = "S352"

export const s352_SelectChatMessageList_RealTime = async (
    talkId: string,
    setChatMessageInfoList: (value: React.SetStateAction<SC999_ChatMessageInfo[]>) => void
) => {
    const newChatMessageInfoList = [] as SC999_ChatMessageInfo[];
    // クエリを定義
    const query_FB = query(collection(DB_FIREBASE, FIREBASE_COLLECTIONS.T110_ChatMessage), where("TalkId", "==", talkId), orderBy("Seq", "asc"), limit(1000))
    // リアルタイムで値を取得する
    const unsubscribe = await onSnapshot(query_FB, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            // メッセージが追加された場合
            if (change.type === "added") {
                //console.log("New Message: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                // 取得処理実行
                // getChatMessageList()
                // 変更ドキュメントを取得
                const newDoc = change.doc.data()
                // 画面表示用に変換
                const newChatMessageInfo = {} as SC999_ChatMessageInfo
                newChatMessageInfo._0_DocId = newDoc._0_DocId
                newChatMessageInfo.talkId = newDoc.TalkId
                newChatMessageInfo.seq = newDoc.Seq
                newChatMessageInfo.sendUserId = newDoc.SendUserId
                newChatMessageInfo.message = newDoc.Message
                newChatMessageInfo.sendDateTime = newDoc.SendDateTime
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
};
