import React, { useState, useEffect, useContext } from 'react';
import type { SC010_Counter } from "./SC010_Types"
import { ActionType } from "./SC010_ActionType"

// SC010_Action.tsxでは、更新パターン(type)と更新後の内容(payload)を2個イチで入れるための箱を定義するイメージ。
// 各画面でActionを呼び出し、イベントごとにpayloadに値を入れてActionオブジェクトを生成する。
// アクション名は、「UPDATE_COUNTER」のように、「操作名(CREATE,UPDATE,DELETE)+オブジェクト名」を「全角大文字（_区切り）」で定義する。
// Actionを作るときは同時に以下を作る必要がある。
// 　①　SC999_ActionType.ts：アクションのパターン（アクションタイプ）を「ActionTypeオブジェクトの中」に定義する
// 　②　SC010_Types.ts：アクションの型（SC999_A_UPDATE_COUNTER）とそのアクションのペイロードの型（SC999_P_UPDATE_COUNTER）を定義する。

// COUNTERオブジェクトの値を更新するためのAction
export const UPDATE_COUNTER = (payload: SC010_Counter) => {
    return {
        type: ActionType.UPDATE_COUNTER,
        payload,
    }
}

// USERオブジェクトの値を更新するためのAction
export const UPDATE_USER = (payload: SC010_Counter) => {
    return {
        type: ActionType.UPDATE_USER,
        payload,
    }
}