import React, { useState, useEffect, useContext } from 'react';
import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
import type { SC020_Counter, SC020_InputUserInfo } from "./SC020_Types"
// import { SC020_ACTIONTYPE } from "./SC020_Const"

// SC020_Action.tsxでは、更新パターン(type)と更新後の内容(payload)を2個イチで入れるための箱を定義するイメージ。
// 各画面でActionを呼び出し、イベントごとにpayloadに値を入れてActionオブジェクトを生成する。
// アクション名は、「UPDATE_COUNTER」のように、「操作名(CREATE,UPDATE,DELETE)+オブジェクト名」を「全角大文字（_区切り）」で定義する。
// Actionを作るときは同時に「SC999_ACTIONTYPE」を作る必要がある。

// ①ActionTypeを定義
// ================================================================================
export const SC020_ACTIONTYPE = {
    UPDATE_COUNTER: "UPDATE_COUNTER",
    UPDATE_USERLIST: "UPDATE_USERLIST",
}
// ================================================================================

// ②Actionを定義
// ================================================================================
// COUNTERオブジェクトの値を更新するためのAction
export const UPDATE_COUNTER = (payload: SC020_Counter): SC000_Action => {
    return {
        type: SC020_ACTIONTYPE.UPDATE_COUNTER,
        payload,
    }
}

// USERオブジェクトの値を更新するためのAction
export const UPDATE_USERLIST = (payload: { userInfoList_ScreenDisp: SC020_InputUserInfo[][] }): SC000_Action => {
    return {
        type: SC020_ACTIONTYPE.UPDATE_USERLIST,
        payload,
    }
}
// ================================================================================

