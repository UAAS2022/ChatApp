import React, { useState, useEffect, useContext } from 'react';
import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
import type { SC998_murata} from "./SC998_Types"
import { SC998_ACTIONTYPE } from "./SC998_Const"

// SC998_Action.tsxでは、更新パターン(type)と更新後の内容(payload)を2個イチで入れるための箱を定義するイメージ。
// 各画面でActionを呼び出し、イベントごとにpayloadに値を入れてActionオブジェクトを生成する。
// アクション名は、「UPDATE_COUNTER」のように、「操作名(CREATE,UPDATE,DELETE)+オブジェクト名」を「全角大文字（_区切り）」で定義する。
// Actionを作るときは同時に以下を作る必要がある。
// 　①　SC999_Const.ts：アクションのパターン（アクションタイプ）を「ACTIONTYPEオブジェクトの中」に定義する

// COUNTERオブジェクトの値を更新するためのAction
export const UPDATE_MURATA = (payload: SC998_murata): SC000_Action => {
    return {
        type: SC998_ACTIONTYPE.UPDATE_MURATA,
        payload,
    }
}
