import { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
// 画面ごとのProviderを定義する
// ==============================================================
export type SC210_Provider = {
    state: SC210_Context,
    dispatch: React.Dispatch<SC000_Action>
}
// ==============================================================

// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type SC210_Context = {
    screenControllerInfo: SC210_ScreenController,
    // talkUserInfoList_Detail: SC210_TalkUserInfo_Detail[],
    chatScreenPreInfo: SC210_ChatScreenPreInfo
}

// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// スクリーンコントローラ
export type SC210_ScreenController = {
    componentId: string,
    // layoutPattern: number,
}

export type SC210_TalkUserInfo_Detail = {
    talkInfo: SC210_TalkInfo,
    userInfo: SC210_UserInfo,
}
export type SC210_TalkInfo = {
    talkId: string,
    talkName: string,
    talkKbn: string,
}
export type SC210_UserInfo = {
    _0_DocId: string,
    userId: string,
    userName: string,
    latestLoginDatatime: String,
    profileImagePath: string,
}

export type SC210_ChatScreenPreInfo = {
    talkId: string,
    talkName: string,
    talkKbn: string,
}
// --------------------------------------------------------------

// Actionの型定義。
// --------------------------------------------------------------
export type SC210_Action = {
    type: string,
    payload: Object,
}
// --------------------------------------------------------------
