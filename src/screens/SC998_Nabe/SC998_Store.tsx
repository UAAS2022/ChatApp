import { createContext, useState, useReducer } from "react";
import type { SC998_Context, } from "./SC998_Types"
import { reducer } from "./SC998_Reducer"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"


// SC999_Store.tsxではコンテキスト（グローバルステートのこと。複数コンポーネントで利用可能な変数だと思えばOK）を定義する。
// ここでは以下の3つを用意する。
// 　1.コンテキスト（S999_S_Context）
// 　2.コンテキストの初期値(DefaultState)
// 　3.プロバイダ(SC998_S_Provider)

// 1.コンテキスト（S999_S_Context）
export const SC998_S_Context = createContext<any>({} as SC998_Context);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
const DefaultState: SC998_Context = {
    murataInfo: { murata:"色黒" },

}

// 3.プロバイダ(SC998_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const SC998_S_Provider = (props: any) => {
    try {
        // JSXでchildrenを使うため、propsからchildrenを取得する
        const { children } = props;

        // useReducerを使ってstateとdispatchを取得する
        const [state, dispatch] = useReducer(reducer, DefaultState)

        // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
        return (
            <SC998_S_Context.Provider value={{ state, dispatch }}>
                {children}
            </SC998_S_Context.Provider>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }

};


