import { CONST_SC000 } from "../../common/C000_Const"
import { SC000_LoginUserInfo } from "../SC000_BaseComponent/SC000_Types"

// Actionを追加する場合、ここに必ずActionTypeも追加する（こうしたほうがやりやすい）。
export const SC999_ACTIONTYPE = {
    CHANGE_SCREEN: "CHANGE_SCREEN",
    UPDATE_V08: "UPDATE_V08",
    UPDATE_V14: "UPDATE_V14",
    UPDATE_V19: "UPDATE_V19",
    ERROR: "ERROR",
}
export const SC999_COMPONENT_ID = {
    SC999_V00: "SC999_V00",
    SC999_V01: "SC999_V01",
    SC999_V02: "SC999_V02",
    SC999_V03: "SC999_V03",
    SC999_V04: "SC999_V04",
    SC999_V05: "SC999_V05",
    SC999_V06: "SC999_V06",
    SC999_V07: "SC999_V07",
    SC999_V08: "SC999_V08",
    SC999_V09: "SC999_V09",
    SC999_V10: "SC999_V10",
    SC999_V11: "SC999_V11",
    SC999_V12: "SC999_V12",
    SC999_V13: "SC999_V13",
    SC999_V14: "SC999_V14",
    SC999_V15: "SC999_V15",
    SC999_V16: "SC999_V16",
    SC999_V17: "SC999_V17",
    SC999_V18: "SC999_V18",
    SC999_V19: "SC999_V19",
    SC999_V20: "SC999_V20",
    SC999_V21: "SC999_V21",
    SC999_V22: "SC999_V22",
    SC999_V23: "SC999_V23",
    SC999_V24: "SC999_V24",
    SC999_V25: "SC999_V25",
    SC999_V26: "SC999_V26",
    SC999_V27: "SC999_V27",
    SC999_V28: "SC999_V28",
    SC999_V29: "SC999_V29",
    SC999_V30: "SC999_V30",
}

// SC999_V20--------------------------------------------------------------------------------

export const CONST_SC999_V20 = {
    talkId: "oS03SA5bZ9XXbaH6MaJe",
}
// ------------------------------------------------------------------------------------------

// SC999_V21--------------------------------------------------------------------------------
export const CONST_SC999_V21 = {
    loginUserInfo: {
        tsune: {
            userId: "tsune",
            userName: "つねを",
            comment: "よろろ",
            // latestLoginDatatime: Date,
            profileImagePath: "../../../",
            genderCd: "1",
            age: 29,
            areaCd: "26",
            hashtag: "",
        } as SC000_LoginUserInfo,
        nabe: {
            userId: "nabe",
            userName: "なべべ",
            comment: "おけけ",
            // latestLoginDatatime: Date,
            profileImagePath: "../../../",
            genderCd: "1",
            age: 29,
            areaCd: "26",
            hashtag: "",
        } as SC000_LoginUserInfo,
        hide: {
            userId: "hide",
            userName: "ひでごり",
            comment: "やっぱガルバだよな。",
            // latestLoginDatatime: Date,
            profileImagePath: "../../../",
            genderCd: "1",
            age: 29,
            areaCd: "26",
            hashtag: "",
        } as SC000_LoginUserInfo,
    },
}
// ------------------------------------------------------------------------------------------