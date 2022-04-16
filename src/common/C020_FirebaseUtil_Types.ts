import type { Timestamp } from 'firebase/firestore';

// --------------------------------------------------------------
export type T999_V04_FB_SampleMessage = {
    text: string;
    createdAt: Timestamp;
    userId: string;
}
// --------------------------------------------------------------

// M050_ユーザ情報
export type M050_User = {
    _0_DocId: string,
    UserId: string,
    UserName: string,
    Comment: string,
    LatestLoginDatatime: Timestamp,
    ProfileImagePath: string,
    GenderCd: string,
    Age: number,
    AreaCd: string,
    Hashtags: string,
    _CrtUserId: string,
    _CrtServiceId: string,
    _CrtDatetime: Timestamp,
    _UpdUserId: string,
    _UpdServiceId: string,
    _UpdDatetime: Timestamp,
}

// M051_ユーザ機密情報
export type M051_UserPrivate = {
    _0_DocId: string,
    UserId: string,
    LoginId: string,
    Password: string,
    _CrtUserId: string,
    _CrtServiceId: string,
    _CrtDatetime: Timestamp,
    _UpdUserId: string,
    _UpdServiceId: string,
    _UpdDatetime: Timestamp,
}

// T100_トーク
export type T100_Talk = {
    _0_DocId: string,
    TalkId: string,
    TalkName: string,
    TalkKbn: string,
    _CrtUserId: string,
    _CrtServiceId: string,
    _CrtDatetime: Timestamp,
    _UpdUserId: string,
    _UpdServiceId: string,
    _UpdDatetime: Timestamp,
}

// T101_トークユーザ
export type T101_TalkUser = {
    _0_DocId: string,
    TalkId: string,
    UserId: string,
    ReadedDatetime: Timestamp,
    _CrtUserId: string,
    _CrtServiceId: string,
    _CrtDatetime: Timestamp,
    _UpdUserId: string,
    _UpdServiceId: string,
    _UpdDatetime: Timestamp,
}

// T110_チャットメッセージ
export type T110_ChatMessage = {
    _0_DocId: string,
    TalkId: string,
    Seq: number
    SendUserId: string,
    SendDateTime: Timestamp,
    Message: string,
    _CrtUserId: string,
    _CrtServiceId: string,
    _CrtDatetime: Timestamp,
    _UpdUserId: string,
    _UpdServiceId: string,
    _UpdDatetime: Timestamp,
}

// S000系　採番マスタ共通
export type S000_SeqId = {
    _CrtUserId: string,
    _CrtServiceId: string,
    _CrtDatetime: Timestamp,
}

// --------------------------------------------------------------