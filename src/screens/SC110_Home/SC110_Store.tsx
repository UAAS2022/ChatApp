import { createContext, useState, useReducer } from "react";
import type { SC110_Provider, SC110_Context, SC110_ScreenController, SC110_PreInfo_SC120, SC110_InfinityScrollInfo } from "./SC110_Types"
import { CONST_SC000, CONST_SC110 } from "../../common/C000_Const"
import { reducer } from "./SC110_Reducer"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"


// SC999_Store.tsxではコンテキスト（グローバルステートのこと。複数コンポーネントで利用可能な変数だと思えばOK）を定義する。
// ここでは以下の3つを用意する。
// 　1.コンテキスト（S999_S_Context）
// 　2.コンテキストの初期値(DefaultState)
// 　3.プロバイダ(SC110_S_Provider)

// 1.コンテキスト（S999_S_Context）
export const Context_SC110 = createContext<SC110_Provider>({} as SC110_Provider);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
const DefaultState: SC110_Context = {
    screenControllerInfo: {
        componentId: CONST_SC110.COMPONENT_ID.V03,
    } as SC110_ScreenController,
    userInfoList_ScreenDisp: [[]],
    preInfo_SC120: {} as SC110_PreInfo_SC120,
    infinityScrollInfo: {
        cursorTimestamp: new Date()
    } as SC110_InfinityScrollInfo
}

// 3.プロバイダ(SC110_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const Provider_SC110 = (props: any) => {
    try {
        // JSXでchildrenを使うため、propsからchildrenを取得する
        const { children } = props;

        // useReducerを使ってstateとdispatchを取得する
        const [state, dispatch] = useReducer(reducer, DefaultState)

        // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
        return (
            <Context_SC110.Provider value={{ state, dispatch }}>
                {children}
            </Context_SC110.Provider>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }

};


