
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
    errorInfo: SC000_ErrorInfo,
    baseContext_SC110: SC110_BaseContext
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// スクリーンコントローラ
export type SC000_ScreenController = {
    screenId: string,
    layoutPattern: number,
    // infoObj: any,
}
// メニューボタン
export type SC000_ScreenChangeBtnInfo = {
    buttonId: string | undefined,
    buttonName: string,
    nextScreenId: string,
    // action: SC000_A_ScreenController
}
// スクリーンコントローラ
export type SC000_ErrorInfo = {
    errorKbn: number,
}
// SC110---------------------------------------------------------
// コンテキスト情報
export type SC110_BaseContext = {
    userInfoList_ScreenDisp: SC000_UserInfo[][],
}
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
    latestLoginDatatime: Date,
    profileImagePath: string,
    genderCd: string,
    age: number,
    areaCd: string,
    hashtag: string,
}

// ==============================================================

