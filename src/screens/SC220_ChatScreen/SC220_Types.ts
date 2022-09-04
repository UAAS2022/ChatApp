import type { Timestamp } from 'firebase/firestore';

// // 画面ごとのProviderを定義する
// // ==============================================================
// export type SC220_Provider = {
//     state: SC220_Context,
//     dispatch: React.Dispatch<SC220_Action>
// }

// // 画面ごとのcontextを定義する
// // ==============================================================
// // S999_Contextで、ほぼ固定
// export type SC220_Context = {

// }

// // --------------------------------------------------------------
// // 画面ごとのコンテキスト内の情報をここに定義していく
// // スクリーンコントローラ
// export type SC220_ScreenController = {
//     componentId: string,
//     layoutPattern: number,
//     infoObj: any,
// }

// // ユーザ情報
// export type T999_UserInfo = {
//     _0_DocId: string,
//     userId: string,
//     userName: string,
//     comment: string,
//     LatestLoginDatetime: Timestamp | Date,
//     profileImagePath: string,
//     genderCd: string,
//     age: number,
//     areaCd: string,
//     hashtags: string,
//     _CrtUserId: string,
//     _CrtServiceId: string,
//     _CrtDatetime: Timestamp,
//     _UpdUserId: string,
//     _UpdServiceId: string,
//     _UpdDatetime: Timestamp,
// }
// export type SC220_V14_UserInfo = {
//     _0_DocId: string,
//     userId: string,
//     userName: string,
//     LatestLoginDatetime: Date,
//     profileImagePath: string,
// }

// // トークユーザ情報
// export type SC220_TalkUserInfo = {
//     talkId: string,
//     userId: string,
// }
// export type SC220_TalkUserInfo_Detail = {
//     talkId: string,
//     userInfo: SC220_V14_UserInfo,
// }
// トーク情報
export type SC220_ChatMessageInfo = {
    _0_DocId: string,
    talkId: string,
    seq: number
    sendUserId: string,
    sendDateTime: Date,
    message: string,
}

// export type SC220_V14 = {
//     talkList: SC220_TalkUserInfo_Detail[]
// }

// export type SC220_V15 = {
//     chatMessage: SC220_ChatMessageInfo
// }

// export type SC220_V19 = {
//     chatMessageInfoList: SC220_ChatMessageInfo[]
// }

// export type SC220_V20 = {
//     messageItem: SC220_V20_MessageItem
// };
export type SC220_V20_MessageItem = {
    loginUserId: string | undefined;
    chatMessageInfo: SC220_ChatMessageInfo;
};
// // Actionの型定義。
// // --------------------------------------------------------------
// export type SC220_Action = {
//     type: string,
//     payload: Object,
// }
// // --------------------------------------------------------------
