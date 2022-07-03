// 1.共通定数
// =========================================================================================================
export const CONST_COMMON = {
    // 環境変数
    CONF: {
        ENVIRONMENT: "00",
        ENVIRONMENT_KBN: {
            DEV: "00",
            TEST: "20",
            PRODUCT: "40",
        }
    },
    // ログ関連定数
    LOG: {
        PROCESS_KBN: {
            START: "START",
            END: "END"
        },
        LOG_KBN: {
            DEBUG: "00",
            INFO: "10",
            ART: "20",
            ERR: "30",
        }
    }
}
// 2.画面のみで使う定数
// =========================================================================================================
// SC000---------------------------------------------------------------------------
export const CONST_SC000 = {
    // 画面ID
    // SCREENID: {
    //     SC010: "SC010",
    //     SC020: "SC020",
    //     SC030: "SC030",
    //     SC110: "SC110",
    //     SC120: "SC120",
    //     SC210: "SC210",
    //     SC220: "SC220",
    //     SC310: "SC310",
    //     SC320: "SC320",
    //     SC410: "SC420",
    //     SC430: "SC430",
    //     SC950: "SC950",
    //     SC998: "SC998",
    //     SC999: "SC999",
    //     SC999_V04: "SC999_V04",
    //     SC999_V21: "SC999_V21",
    //     SC999_V30: "SC999_V30",
    // },

    SCREENINFO: {
        SC010: { SCREENID: "SC010", HEADERKBN: "0", FOOTERKBN: "0" }, // HEADERKBN/FOOTERKBN："0"（非表示）、"1"（表示）
        SC020: { SCREENID: "SC020", HEADERKBN: "0", FOOTERKBN: "0" },
        SC030: { SCREENID: "SC030", HEADERKBN: "0", FOOTERKBN: "0" },
        SC110: { SCREENID: "SC110", HEADERKBN: "0", FOOTERKBN: "1" },
        SC120: { SCREENID: "SC120", HEADERKBN: "0", FOOTERKBN: "1" },
        SC210: { SCREENID: "SC210", HEADERKBN: "0", FOOTERKBN: "1" },
        SC220: { SCREENID: "SC220", HEADERKBN: "0", FOOTERKBN: "0" },
        SC310: { SCREENID: "SC310", HEADERKBN: "0", FOOTERKBN: "1" },
        SC320: { SCREENID: "SC320", HEADERKBN: "0", FOOTERKBN: "1" },
        SC410: { SCREENID: "SC420", HEADERKBN: "0", FOOTERKBN: "1" },
        SC430: { SCREENID: "SC430", HEADERKBN: "0", FOOTERKBN: "1" },
        SC950: { SCREENID: "SC950", HEADERKBN: "0", FOOTERKBN: "1" },
        SC998: { SCREENID: "SC998", HEADERKBN: "0", FOOTERKBN: "1" },
        SC999: { SCREENID: "SC999", HEADERKBN: "0", FOOTERKBN: "1" },
        SC999_V04: { SCREENID: "SC999_V04", HEADERKBN: "0", FOOTERKBN: "1" },
        SC999_V21: { SCREENID: "SC999_V21", HEADERKBN: "0", FOOTERKBN: "1" },
        SC999_V30: { SCREENID: "SC999_V30", HEADERKBN: "0", FOOTERKBN: "1" },
    },
}
// SC030---------------------------------------------------------------------------
export const CONST_SC030 = {
    DefaultProfileImagePath: "010_Default/010_UaasDefaultProfile.png"
}
// --------------------------------------------------------------------------------
// SC110---------------------------------------------------------------------------
export const CONST_SC110 = {
    // コンポーネントID
    COMPONENT_ID: {
        V03: "V03",
        V04: "V04",
    },
    // 1行に何ボックス入れるかの値
    MAXROW: 10,
    MAXCOL: 2,
}
// --------------------------------------------------------------------------------
// SC210---------------------------------------------------------------------------
export const CONST_SC210 = {
    COMPONENT_ID: {
        V03: "V03",
        V04: "V04",
    }
}
// --------------------------------------------------------------------------------
// =========================================================================================================


// 3.サービスまたは画面で使う定数
// =========================================================================================================
export const C000_FIREBASE_INFO = {
    DocIdMaker: "_,_",
}
// =========================================================================================================
