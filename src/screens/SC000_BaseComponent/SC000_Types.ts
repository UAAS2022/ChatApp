
// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type S000_Context = {
    screenControllerInfo: SC000_ScreenController,
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// スクリーンコントローラ
export type SC000_ScreenController = {
    screenId: string,
    layoutPattern: number,
    infoObj: any,
}
// メニューボタン
export type SC000_ScreenChangeBtnInfo = {
    buttonId: string | undefined,
    buttonName: string,
    nextScreenId: string,
    // action: SC000_A_ScreenController
}
// ==============================================================

// Actionの型定義。
// --------------------------------------------------------------
export type SC000_Action = {
    type: string,
    payload: Object,
}
// --------------------------------------------------------------