import { createContext, useState, useReducer } from "react";
import type { SC030_Provider, SC030_Context, } from "./SC030_Types"
import { reducer } from "./SC030_Reducer"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"


// SC999_Store.tsxではコンテキスト（グローバルステートのこと。複数コンポーネントで利用可能な変数だと思えばOK）を定義する。
// ここでは以下の3つを用意する。
// 　1.コンテキスト（S999_S_Context）
// 　2.コンテキストの初期値(DefaultState)
// 　3.プロバイダ(SC030_S_Provider)

// 1.コンテキスト（S999_S_Context）
export const Context_SC030 = createContext<SC030_Provider>({} as SC030_Provider);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
const DefaultState: SC030_Context = {
    userInfoList_ScreenDisp: [[]],
}

// 3.プロバイダ(SC030_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const Provider_SC030 = (props: any) => {
    try {
        // JSXでchildrenを使うため、propsからchildrenを取得する
        const { children } = props;

        // useReducerを使ってstateとdispatchを取得する
        const [state, dispatch] = useReducer(reducer, DefaultState)

        // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
        return (
            <Context_SC030.Provider value={{ state, dispatch }}>
                {children}
            </Context_SC030.Provider>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }

};


