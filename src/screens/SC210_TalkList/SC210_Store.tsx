import { createContext, useState, useReducer } from "react";
import type {
    SC210_Provider,
    SC210_Context,
    SC210_TalkInfo,
    SC210_UserInfo,
    SC210_ScreenController
} from "./SC210_Types"
import { CONST_SC000, CONST_SC210 } from "../../common/C000_Const"
import { reducer } from "./SC210_Reducer"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"


// SC999_Store.tsxではコンテキスト（グローバルステートのこと。複数コンポーネントで利用可能な変数だと思えばOK）を定義する。
// ここでは以下の3つを用意する。
// 　1.コンテキスト（S999_S_Context）
// 　2.コンテキストの初期値(DefaultState)
// 　3.プロバイダ(SC210_S_Provider)

// 1.コンテキスト（S999_S_Context）
export const Context_SC210 = createContext<SC210_Provider>({} as SC210_Provider);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
// ==========================================================================================
// 各要素の初期値を定義
const DEfAULT_TalkInfoList = [{
    talkInfo: {} as SC210_TalkInfo,
    userInfo: {
        // _0_DocId: "",
        // userId: "",
        // userName: "",
        // latestLoginDatatime: new Date(),
        // profileImagePath: "",
    } as SC210_UserInfo,
}]
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const DEfAULT_ScreenControllerInfo = {
    componentId: CONST_SC210.COMPONENT_ID.V03,
    layoutPattern: 1,
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const DEfAULT_ChatScreenPreInfo = {
    talkId: "",
    talkName: "",
    talkKbn: "",
}
// コンテキストに↑で定義した初期値を設定し、デフォルトステートを作成
const DEFAULT_State: SC210_Context = {
    screenControllerInfo: DEfAULT_ScreenControllerInfo,
    // talkUserInfoList_Detail: DEfAULT_TalkInfoList,
    chatScreenPreInfo: DEfAULT_ChatScreenPreInfo,
}
// ==========================================================================================

// 3.プロバイダ(SC210_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const Provider_SC210 = (props: any) => {
    try {
        // JSXでchildrenを使うため、propsからchildrenを取得する
        const { children } = props;

        // useReducerを使ってstateとdispatchを取得する
        const [state, dispatch] = useReducer(reducer, DEFAULT_State)

        // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
        return (
            <Context_SC210.Provider value={{ state, dispatch }}>
                {children}
            </Context_SC210.Provider>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }

};


