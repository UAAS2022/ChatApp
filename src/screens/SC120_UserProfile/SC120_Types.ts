import { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
// 画面ごとのProviderを定義する
// ==============================================================
export type SC120_Provider = {
    state: SC120_Context,
    dispatch: React.Dispatch<SC000_Action>
}
// ==============================================================

// 画面ごとのcontextを定義する
// ==============================================================
// S999_Contextで、ほぼ固定
export type SC120_Context = {
    userProfileInfo: SC120_UserProfileInfo,
}

// --------------------------------------------------------------
// 画面ごとのコンテキスト内の情報をここに定義していく
// ユーザプロフィール情報
export type SC120_UserProfileInfo = {
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


// export type SC220_ScreenController = {
//     componentId: string,
//     // layoutPattern: number,
// }

// export type SC220_TalkUserInfo_Detail = {
//     talkInfo: SC220_TalkInfo,
//     userInfo: SC220_UserInfo,
// }
// export type SC220_TalkInfo = {
//     talkId: string,
//     talkName: string,
//     talkKbn: string,
// }
// export type SC220_UserInfo = {
//     _0_DocId: string,
//     userId: string,
//     userName: string,
//     latestLoginDatatime: String,
//     profileImagePath: string,
// }

// export type SC220_ChatScreenPreInfo = {
//     talkId: string,
//     talkName: string,
//     talkKbn: string,
// }
// // --------------------------------------------------------------

// // Actionの型定義。
// // --------------------------------------------------------------
// export type SC220_Action = {
//     type: string,
//     payload: Object,
// }
// // --------------------------------------------------------------
