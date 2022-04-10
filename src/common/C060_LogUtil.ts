import React, { useState, useEffect } from 'react';
import { CONST_COMMON } from "../common/C000_Const"
import { c010_UaasUtil_isNotBlank } from "../common/C010_UaasUtil"
import {
    T100_Talk,
    T101_TalkUser,
    M050_User,
} from "./C020_FirebaseUtil_Types"

export const c060_printLog = (logKbn: string, funcId: string, processKbn: string, paramList: any[], methodName: string = ""): void => {
    // 1. 機能カテゴリ判定

    // 1文字目切り出し
    const header01 = funcId.substr(0, 1)
    // 2文字目切り出し
    const header02 = funcId.substr(1, 1)
    // 判定
    let funcCategory = ""
    if (header01 === "S") {
        if (header02 === "C") {
            funcCategory = "画面"
        } else {
            funcCategory = "サービス"
        }
    } else if (header01 === "C") {
        funcCategory = "共通部品"
    } else {
        funcCategory = "機能IDが不正"
    }

    // 2. ログ出力用の文字列に変換
    logKbn = "【" + logKbn + "】"

    // 3. 開始/終了により処理を分岐する
    let processName = ""
    // a.開始の場合
    if (processKbn === CONST_COMMON.LOG.PROCESS_KBN.START) {
        processName = "開始"
        // タグを作成
        const tag = "【" + funcId + ":" + funcCategory + ":" + processName + "】"
        // 開始/終了ログ出力
        console.log(logKbn, tag, "------------------------------------------------------------")
        // メソッド名を出力する
        c060_printLog_Methoｄ(methodName)
        // パラメータを出力する
        c060_printLog_List(paramList)
        // b.終了の場合
    } else if (processKbn === CONST_COMMON.LOG.PROCESS_KBN.END) {
        processName = "終了"
        // タグを作成
        const tag = "【" + funcId + ":" + funcCategory + ":" + processName + "】"
        // パラメータを出力する
        c060_printLog_List(paramList)
        // 開始/終了ログ出力
        console.log(logKbn, tag, "------------------------------------------------------------")
    } else {
        processName = "開始終了区分が不正(" + processKbn + ")"
        // 開始/終了ログ出力
        // タグを作成
        const tag = "【" + funcId + ":" + funcCategory + ":" + processName + "】"
        // 開始/終了ログ出力
        console.log(logKbn, tag, "------------------------------------------------------------")
    }
    return
}

export const c060_printLog_List = (paramList: any[]) => {
    let count = 0
    for (const param of paramList) {
        count = count + 1
        console.log("　　パラメータ", "[", count, "]：")
        console.log("　　", param)
    }
}

export const c060_printLog_Methoｄ = (methodName: string) => {
    if (c010_UaasUtil_isNotBlank(methodName)) {
        console.log("　　メソッド", "[", methodName, "]：")
    }
}

// DEBUGLOG
export const c060_DebugLog = (funcId: string, processKbn: string, paramList: any[], methodName: string = ""): void => {
    // 開発環境のみ出力する
    if (CONST_COMMON.CONF.ENVIRONMENT === CONST_COMMON.CONF.ENVIRONMENT_KBN.DEV) {
        c060_printLog("DEBG", funcId, processKbn, paramList, methodName)
    }
}
