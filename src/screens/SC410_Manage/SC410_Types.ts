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
// S999_Contextで、ほぼ固定
export type SC410_Context = {
    screenControllerInfo: SC410_ScreenController,

}

// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// スクリーンコントローラ
export type SC410_ScreenController = {
    screenId: string,
    layoutPattern: number,
    infoObj: any,
}

// Actionの型定義。
// --------------------------------------------------------------
export type SC410_Action = {
    type: string,
    payload: Object,
}
// --------------------------------------------------------------
