// import * as firebase from 'firebase';
// import 'firebase/app';
// import 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    Timestamp,
    QueryConstraint,
    query,
    where,
    orderBy,
    limit,
    FirestoreSettings,
    initializeFirestore,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
    getFunctions
    , httpsCallable
} from 'firebase/functions';
import { C000_FIREBASE_INFO } from './C000_Const';
import { S000_SeqId } from "./C020_FirebaseUtil_Types"

// firebaseへの接続情報
const firebaseConfig = {
    // apiKey: 'AIzaSyCEwOdcgltaDYsUw8EtpqYesBLasQpQoBM',
    apiKey: 'AIzaSyC5Og98oDmRqrjHxhU9yF-LholipbJlams',
    authDomain: "uaas-chatproject-pre.firebaseapp.com",
    projectId: "uaas-chatproject-pre",
    storageBucket: "uaas-chatproject-pre.appspot.com",
    messagingSenderId: "901661061415",
    appId: "1:901661061415:ios:4f88424bc0ea32e5063902"

};

const firestoreSettings: FirestoreSettings = {
    // ignoreUndefinedProperties: true
    // 指定なしの場合、デフォルト設定が入る
}

// if (getApps().length < 1) {
//     initializeApp(firebaseConfig);
// }

initializeApp(firebaseConfig);
export const APP_FIREBASE = getApps()

initializeFirestore(APP_FIREBASE[0], firestoreSettings)
export const DB_FIREBASE = getFirestore(APP_FIREBASE[0]);

export const SG_FIREBASE = getStorage(APP_FIREBASE[0]);

export const FC_FIREBASE = getFunctions(APP_FIREBASE[0]);


// 1. FirestoreUtill
// ========================================================================================================================
// Firestoreのコレクションを定義
export const FIREBASE_COLLECTIONS = {
    T999_V04_FB_SampleMessage: "T999_V04_FB_SampleMessage",
    T100_Talk: "T999_T100_Talk",
    T101_TalkUser: "T999_T101_TalkUser",
    T110_ChatMessage: "T999_T110_ChatMessage",
    M050_User: "T999_M050_User",
    // M050_User: "T999_M050_User02",
    M051_UserPrivate: "T999_M051_UserPrivate",
    S110_ChatMessageId: "T999_S110_ChatMessageId",
    S100_TalkId: "T999_S100_TalkId",
    T999_M050_User: "T999_M050_USER",
}

// ドキュメントIDを作る関数
export const c020_MakeDocId = (strList: string[]) => {
    // 変数の初期化
    let docId: string = ""
    // パラメータのリストの分だけループし、配列要素を結合してく
    for (let str of strList) {
        // 最初の1回目
        if (docId === "") {
            docId = str
        }
        // ２回目以降
        else {
            docId = docId + C000_FIREBASE_INFO.DocIdMaker + str
        }
    }
    // docIdを返却する
    return docId

}

// キーの組み合わせがユニークであることを確認する関数
export const c020_CheckUnique = async (collectionName: string, itemList: string[], conditionList: string[]) => {
    // 判定値の初期化
    let errFlg = false
    // コレクションを定義
    const collectionObj = collection(DB_FIREBASE, collectionName)
    let query_FB = query(collectionObj)
    // 主キーの分だけ条件を追加する
    let count1 = 0
    for (let item of itemList) {
        let condition = conditionList[count1]
        query_FB = query(query_FB, where(item, "==", condition))
        count1 = count1 + 1
        //console.log("query:-------------------------------------------------")
        //console.log("item:", item, "condition", condition)
        //console.log("query:-------------------------------------------------")
    }

    // 検証用--------------------------------------------------------------------------------
    // query_FB = query(collectionObj, where("TalkId", "==", conditionList[0],), where("UserId", "==", conditionList[1]))
    // let tmpList = [] as QueryConstraint[]
    // let countTemp = 0
    // for (let item of itemList) {
    //     let condition = conditionList[countTemp]
    //     countTemp = countTemp + 1
    //     tmpList.push(where(item, "==", condition))
    //     //console.log("query:-------------------------------------------------")
    //     //console.log("item:", item, "condition", condition)
    //     //console.log("query:-------------------------------------------------")
    // }
    // query_FB = query(collectionObj, ...tmpList)
    // //console.log("query:-------------------------------------------------")
    // //console.log("query_FB:", query_FB)
    // //console.log("query:-------------------------------------------------")
    // 検証用--------------------------------------------------------------------------------

    // クエリ実行
    const querySnapshot = await getDocs(query_FB);
    // 判定
    if (querySnapshot.size == 0) {
        errFlg = true
    }
    // let count2 = 0
    // querySnapshot.forEach((doc) => {
    //     //console.log("doc.data():-------------------------------------------------")
    //     //console.log("doc.data()_count", count2, ":", doc.data())
    //     //console.log("doc.data():-------------------------------------------------")
    //     count2 = count2 + 1
    //     errFlg = true
    // });

    // //console.log("itemList:-------------------------------------------------")
    // //console.log("itemList:", itemList)
    // //console.log("itemList:-------------------------------------------------")
    // //console.log("conditions:-------------------------------------------------")
    // //console.log("conditions:", conditionList)
    // //console.log("conditions:-------------------------------------------------")
    // //console.log("querySnapshot_1:-------------------------------------------------")
    // //console.log("querySnapshot.size:", querySnapshot.size)
    // //console.log("querySnapshot_1:-------------------------------------------------")
    // //console.log("errFlg:-------------------------------------------------")
    // //console.log("errFlg:", errFlg)
    // //console.log("errFlg:-------------------------------------------------")
    // docIdを返却する
    return errFlg

}

// M050のユニークチェック関数
export const c020_CheckUnique_M050 = async (conditionList: string[]) => {
    let errFlg = await c020_CheckUnique(FIREBASE_COLLECTIONS.M050_User, ["UserId"], conditionList)
    return errFlg
}

// _0_DocIdを更新する関数
export const c020_UpdateDocId = async (firebaseCollection: string, docId: string, logUserId: string, serviceId: string) => {
    let errFlg = "0"
    // 更新データを定義
    const newDocIdInfo = {
        _0_DocId: docId,
        _UpdUserId: logUserId,
        _UpdServiceId: serviceId,
        _UpdDatetime: Timestamp.now(),
    };
    // Firebase処理
    const docRef3 = doc(DB_FIREBASE, firebaseCollection, docId)
    const result_FB_3 = await updateDoc(docRef3, newDocIdInfo);
    // 返却処理
    const resultObj = {
        errFlg: errFlg
    }
    return resultObj
}

// DocIdを採番する関数
export const c020_CreateSecId = async (firebaseCollection: string, logUserId: string, serviceId: string) => {
    let errFlg = "0"
    const seqIdObj = {
        // _0_DocId: "",
        _CrtUserId: logUserId,
        _CrtServiceId: serviceId,
        _CrtDatetime: Timestamp.now(),
    } as S000_SeqId;
    // Firebase処理
    const collectionRef = collection(DB_FIREBASE, firebaseCollection)
    const result_FB = await addDoc(collectionRef, seqIdObj);                                //→Idを指定しない場合はこっち
    // 採番したIDを取得する
    const secId = result_FB.id
    // 返却処理
    const resultObj = {
        errFlg: errFlg,
        returnInfo: {
            secId: secId
        }
    }
    return resultObj
}
// ========================================================================================================================


// 2. StorageUtill
// ========================================================================================================================

// ========================================================================================================================

// 3. FunctionsUtill
// ========================================================================================================================
export const c020_HttpsCallable = (endPoint: string) => {
    // httpリクエストを発行
    const anyFunction: any = httpsCallable(FC_FIREBASE, endPoint);
    return anyFunction
}

// ========================================================================================================================