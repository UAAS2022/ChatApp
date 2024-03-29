
// 画面ごとのProviderを定義する
// ==============================================================
export type SC000_Provider = {
    state: SC000_Context,
    dispatch: React.Dispatch<SC000_Action>
}
// ==============================================================

// Actionの型定義。
// ==============================================================
export type SC000_Action = {
    type: string,
    payload: Object,
}
// ==============================================================

// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type SC000_Context = {
    screenControllerInfo: SC000_ScreenController,
    loginUserInfo: SC000_LoginUserInfo,
    errorInfo: SC000_ErrorInfo,
    baseContext_SC110: SC110_BaseContext,
    baseContext_SC210: SC210_BaseContext,
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく

// SC000---------------------------------------------------------
// スクリーンコントローラ
export type SC000_ScreenController = {
    screenId: string,
    headerKbn: string,
    footerKbn: string,
    // layoutPattern: number,
    // infoObj: any,
}
// ログインユーザ情報
export type SC000_LoginUserInfo = {
    userId: string,
    userName: string,
    comment: string,
    LatestLoginDatetime: Date,
    profileImagePath: string,
    genderCd: string,
    age: number,
    areaCd: string,
    hashtag: string,
}
// メニューボタン
export type SC000_ScreenChangeBtnInfo = {
    buttonId: string | undefined,
    buttonName: string,
    nextScreenInfo: { SCREENID: string, HEADERKBN: string, FOOTERKBN: string },
    // action: SC000_A_ScreenController
}
// エラー情報
export type SC000_ErrorInfo = {
    errorKbn: number,
}
// SC110---------------------------------------------------------
// コンテキスト情報
export type SC110_BaseContext = {
    userInfoList_ScreenDisp: SC000_UserInfo[][],
}
// --------------------------------------------------------------
// SC210---------------------------------------------------------
// コンテキスト情報
export type SC210_BaseContext = {
    talkUserInfoList_Detail: SC210_TalkUserInfo_Detail[],
}
// 画面ごとのコンテキスト内の情報をここに定義していく
export type SC210_TalkUserInfo_Detail = {
    talkInfo: SC210_TalkInfo,
    userInfo: SC210_UserInfo,
}
export type SC210_TalkInfo = {
    talkId: string,
    talkName: string,
    talkKbn: string,
    latestMessageDateTime: string,
}
export type SC210_UserInfo = {
    _0_DocId: string,
    userId: string,
    userName: string,
    latestLoginDatetime: string,
    profileImagePath: string,
}
// --------------------------------------------------------------
// --------------------------------------------------------------

// SC999---------------------------------------------------------
// コンテキスト情報

// --------------------------------------------------------------
// ==============================================================

// その他、画面間共通の型定義=========================================
// ユーザ情報
export type SC000_UserInfo = {
    userId: string,
    userName: string,
    comment: string,
    LatestLoginDatetime: Date,
    profileImagePath: string,
    genderCd: string,
    age: number,
    areaCd: string,
    hashtag: string,
}

// ==============================================================

