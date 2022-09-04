import { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
// 画面ごとのProviderを定義する
// ==============================================================
export type SC110_Provider = {
    state: SC110_Context,
    dispatch: React.Dispatch<SC000_Action>
}
// ==============================================================

// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type SC110_Context = {
    screenControllerInfo: SC110_ScreenController,
    userInfoList_ScreenDisp: SC110_UserInfo[][],
    preInfo_SC120: SC110_PreInfo_SC120,
    infinityScrollInfo: SC110_InfinityScrollInfo,
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// カウンタ情報
export type SC110_Counter = {
    count: number,
}
// ユーザ情報
export type SC110_UserInfo = {
    userId: string,
    userName: string,
    comment: string,
    genderCd: string,
    age: number,
    areaCd: string,
    hashtag: string,
}
// スクリーンコントローラ
export type SC110_ScreenController = {
    componentId: string,
    // layoutPattern: number,
}
// プレ情報
export type SC110_PreInfo_SC120 = {
    userId: string
}
// インフィニティスクロール情報
export type SC110_InfinityScrollInfo = {
    cursorTimestamp: Date
}
// ==============================================================


