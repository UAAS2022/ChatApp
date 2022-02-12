
// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type S010_Context = {
    counterInfo: SC110_Counter,
    userInfo: SC110_USER
}
// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// カウンタ情報
export type SC110_Counter = {
    count: number,
}
// ユーザ情報
export type SC110_USER = {
    userId: string,
    userName: string,
}
// ==============================================================


