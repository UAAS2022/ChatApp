import { createContext, useState, useReducer } from "react";
import type { S010_Context, SC010_P_UPDATE_COUNTER } from "./SC010_Types"
import { reducer } from "./SC010_Reducer"

// SC999_Store.tsxではコンテキスト（グローバルステートのこと。複数コンポーネントで利用可能な変数だと思えばOK）を定義する。
// ここでは以下の3つを用意する。
// 　1.コンテキスト（S999_S_Context）
// 　2.コンテキストの初期値(DefaultState)
// 　3.プロバイダ(SC010_S_Provider)

// 1.コンテキスト（S999_S_Context）
export const S010_S_Context = createContext<any>({} as SC010_P_UPDATE_COUNTER);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
const DefaultState: S010_Context = {
    counterInfo: { count: 0 },
    userInfo: { userId: "", userName: "" },
}

// 3.プロバイダ(SC010_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const SC010_S_Provider = (props: any) => {
    // JSXでchildrenを使うため、propsからchildrenを取得する
    const { children } = props;

    // useReducerを使ってstateとdispatchを取得する
    const [state, dispatch] = useReducer(reducer, DefaultState)

    // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
    return (
        <S010_S_Context.Provider value={{ state, dispatch }}>
            {children}
        </S010_S_Context.Provider>
    );
};


