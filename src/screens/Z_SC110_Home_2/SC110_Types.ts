
// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type SC110_Context = {
    userInfoList_ScreenDisp: SC110_UserInfo[][],
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

// ==============================================================


