
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
    screenControllerInfo: SC999_ScreenController,
}

// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// スクリーンコントローラ
export type SC999_ScreenController = {
    componentId: string,
    layoutPattern: number,
    infoObj: any,
}
// Actionの型定義。
// --------------------------------------------------------------
export type SC999_Action = {
    type: string,
    payload: Object,
}
// --------------------------------------------------------------