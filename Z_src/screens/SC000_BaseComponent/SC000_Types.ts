export type SC000_A_ScreenController = {
    type: string,
    payload: SC000_ScreenController,
}





export type SC000_T_test01 = {
    testParam01: string,
    testParam02: string,
    testParam03: string,
    testParam04: string,
    testParam05: string,
    testParam06: number,
    testParam07: number,
}


export type SC000_T_test02 = {
    testParam01: string,
    testParam02: string,
}



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