import type { Timestamp } from 'firebase/firestore';

// --------------------------------------------------------------
export type T999_V04_FB_SampleMessage = {
    text: string;
    createdAt: Timestamp;
    userId: string;
}
// --------------------------------------------------------------

//ユーザ情報
export type T999_M050_USER = {
    UserId: string,
    UserName: string,
    Comment: string,
    LatestLoginDatatime: Timestamp,
    ProfileImagePath: string,
    GenderCd: string,
    Age: number,
    AreaCd: string,
    Hashtag: string,
}
// --------------------------------------------------------------