import React, { useState, useEffect, useContext } from 'react';
import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
import type { SC120_UserProfileInfo } from "./SC120_Types"
// import { SC120_ACTIONTYPE } from "./SC120_Const"

// SC120_Action.tsxでは、更新パターン(type)と更新後の内容(payload)を2個イチで入れるための箱を定義するイメージ。
// 各画面でActionを呼び出し、イベントごとにpayloadに値を入れてActionオブジェクトを生成する。
// アクション名は、「UPDATE_COUNTER」のように、「操作名(CREATE,UPDATE,DELETE)+オブジェクト名」を「全角大文字（_区切り）」で定義する。
// Actionを作るときは同時に「SC999_ACTIONTYPE」を作る必要がある。

// ①ActionTypeを定義
// ================================================================================
export const SC120_ACTIONTYPE = {
    UPDATE_USERPROFILE: "UPDATE_USERPROFILE",
}
// ================================================================================

// ②Actionを定義
// ================================================================================
// USERPROFILEオブジェクトの値を更新するためのAction
export const UPDATE_USERPROFILE = (payload: SC120_UserProfileInfo): SC000_Action => {
    return {
        type: SC120_ACTIONTYPE.UPDATE_USERPROFILE,
        payload,
    }
}
// ================================================================================

