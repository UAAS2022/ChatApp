import type { Timestamp } from 'firebase/firestore';

// 画面ごとのProviderを定義する
// ==============================================================
export type SC999_Provider = {
    state: SC999_Context,
    dispatch: React.Dispatch<SC999_Action>
}

// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type SC999_Context = {

}

// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// スクリーンコントローラ
export type SC999_ScreenController = {
    componentId: string,
    layoutPattern: number,
    infoObj: any,
}

// ユーザ情報
export type T999_UserInfo = {
    _0_DocId: string,
    userId: string,
    userName: string,
    comment: string,
    latestLoginDatatime: Timestamp | Date,
    profileImagePath: string,
    genderCd: string,
    age: number,
    areaCd: string,
    hashtags: string,
    _CrtUserId: string,
    _CrtServiceId: string,
    _CrtDatetime: Timestamp,
    _UpdUserId: string,
    _UpdServiceId: string,
    _UpdDatetime: Timestamp,
}
export type SC999_V14_UserInfo = {
    _0_DocId: string,
    userId: string,
    userName: string,
    latestLoginDatatime: Date,
    profileImagePath: string,
}

// トークユーザ情報
export type SC999_TalkUserInfo = {
    talkId: string,
    userId: string,
}
export type SC999_TalkUserInfo_Detail = {
    talkId: string,
    userInfo: SC999_V14_UserInfo,
}
// トーク情報
export type SC999_ChatMessageInfo = {
    _0_DocId: string,
    talkId: string,
    seq: number
    sendUserId: string,
    sendDateTime: Timestamp,
    message: string,
}

export type SC999_V14 = {
    talkList: SC999_TalkUserInfo_Detail[]
}

export type SC999_V15 = {
    chatMessage: SC999_ChatMessageInfo
}

export type SC999_V19 = {
    chatMessageInfoList: SC999_ChatMessageInfo[]
}

export type SC999_V20 = {
    messageItem: SC999_V20_MessageItem
};
export type SC999_V20_MessageItem = {
    loginUserId: string | undefined;
    chatMessageInfo: SC999_ChatMessageInfo;
};
// Actionの型定義。
// --------------------------------------------------------------
export type SC999_Action = {
    type: string,
    payload: Object,
}
// --------------------------------------------------------------
