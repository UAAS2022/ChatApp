import { SC000_Action } from "../SC000_BaseComponent/SC000_Types"

// 画面ごとのProviderを定義する
// ==============================================================
export type SC410_Provider = {
    state: SC410_Context,
    dispatch: React.Dispatch<SC000_Action>
}
// ==============================================================

// 画面ごとのcontextを定義する
// ==============================================================
export type SC410_Context = {
    screenControllerInfo: SC410_ScreenController,
    screenInfo_SC420:SC420_ScreenInfo

}

// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// スクリーンコントローラ
export type SC410_ScreenController = {
    screenId: string,
    layoutPattern: number,
    infoObj: any,
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
export type SC420_ScreenInfo = {
    userProfileInfo:SC410_UserProfileInfo
}
// ユーザプロフィール情報
export type SC410_UserProfileInfo = {
    userId: string,
    userName: string,
    comment: string,
    latestLoginDatatime: string,
    profileImagePath: string,
    genderCd: string,
    age: number,
    areaCd: string,
    hashtag: string,
}

// Actionの型定義。
// --------------------------------------------------------------
export type SC410_Action = {
    type: string,
    payload: Object,
}
// --------------------------------------------------------------
