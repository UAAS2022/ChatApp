import { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
// 画面ごとのProviderを定義する
// ==============================================================
export type SC020_Provider = {
    state: SC020_Context,
    dispatch: React.Dispatch<SC000_Action>
}
// ==============================================================

// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type SC020_Context = {
    userInfoList_ScreenDisp: SC020_InputUserInfo[][],
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// カウンタ情報
export type SC020_Counter = {
    count: number,
}
// ユーザ情報
export type SC020_InputUserInfo = {
    userId: string,
    password: string
    userName: string,
    comment: string,
    profileImagePath: string,
    genderCd: string,
    age: number,
    areaCd: string,
    // hashtags: string,
}

// ==============================================================


