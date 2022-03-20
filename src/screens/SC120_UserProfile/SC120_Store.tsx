import { createContext, useState, useReducer } from "react";
import type {
    SC120_Provider,
    SC120_Context,
    SC120_UserProfileInfo,
} from "./SC120_Types"
import { CONST_SC000 } from "../../common/C000_Const"
import { reducer } from "./SC120_Reducer"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"


// SC999_Store.tsxではコンテキスト（グローバルステートのこと。複数コンポーネントで利用可能な変数だと思えばOK）を定義する。
// ここでは以下の3つを用意する。
// 　1.コンテキスト（S999_S_Context）
// 　2.コンテキストの初期値(DefaultState)
// 　3.プロバイダ(SC120_S_Provider)

// 1.コンテキスト（S999_S_Context）
export const Context_SC120 = createContext<SC120_Provider>({} as SC120_Provider);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
// ==========================================================================================
// 各要素の初期値を定義
const DEFAULT_UserProfileInfo = {
} as SC120_UserProfileInfo
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// コンテキストに↑で定義した初期値を設定し、デフォルトステートを作成
const DEFAULT_State: SC120_Context = {
    userProfileInfo: DEFAULT_UserProfileInfo,
}
// ==========================================================================================

// 3.プロバイダ(SC120_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const Provider_SC120 = (props: any) => {
    try {
        // JSXでchildrenを使うため、propsからchildrenを取得する
        const { children } = props;

        // useReducerを使ってstateとdispatchを取得する
        const [state, dispatch] = useReducer(reducer, DEFAULT_State)

        // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
        return (
            <Context_SC120.Provider value={{ state, dispatch }}>
                {children}
            </Context_SC120.Provider>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }

};


