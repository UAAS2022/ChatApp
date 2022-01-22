
// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type S010_Context = {
    counterInfo: SC010_Counter,
    userInfo: SC010_USER
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// カウンタ情報
export type SC010_Counter = {
    count: number,
}
// ユーザ情報
export type SC010_USER = {
    userId: string,
    userName: string,
}
// ==============================================================


// ActionとPayloadの型定義。二個イチ。
// --------------------------------------------------------------
export type SC010_A_UPDATE_COUNTER = {
    type: string,
    payload: SC010_P_UPDATE_COUNTER,
}
export type SC010_P_UPDATE_COUNTER = {
    counterInfo: SC010_Counter,
}
// --------------------------------------------------------------

