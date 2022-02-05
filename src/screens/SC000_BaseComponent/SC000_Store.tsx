import { createContext, useState, useReducer, useContext } from "react";
import type { SC000_Provider, SC000_Context } from "./SC000_Types"
import type { SC000_ScreenController } from "./SC000_Types"
import { reducer, } from "./SC000_Reducer"

// 1.コンテキスト（S999_S_Context）
export const SC000_S_Context = createContext<SC000_Provider>({} as SC000_Provider);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
const DefaultState: SC000_Context = {
    screenControllerInfo: {
        screenId: "SC010",
        layoutPattern: 1,
        infoObj: {}
    },
    errorInfo: {
        errorKbn: 0
    }
}

// 3.プロバイダ(SC010_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const SC000_S_Provider = (props: any) => {
    // JSXでchildrenを使うため、propsからchildrenを取得する
    const { children } = props;

    // useReducerを使ってstateとdispatchを取得する
    const [state, dispatch] = useReducer(reducer, DefaultState)

    // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
    return (
        <SC000_S_Context.Provider value={{ state, dispatch }}>
            {children}
        </SC000_S_Context.Provider>
    );
};
