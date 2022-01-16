import { createContext, useState, useReducer, useContext } from "react";
import type { SC000_T_BaseComponentContext } from "./SC950_Types"
import type { SC000_T_ScreenController } from "./SC950_Types"
import type { SC000_T_test01 } from "./SC950_Types"
import type { SC000_T_test02 } from "./SC950_Types"
import { reducer } from "./SC950_Reducer"

//コンテキストの初期値を定義
const defaultState: SC000_T_BaseComponentContext = {
    screenControllerObj: {
        screenId: "SC010",
        layoutPattern: 1,
        infoObj: {}
    },
    dispatch: () => { }
}

//コンテキスト定義
export const SC000_S_BaseComponentContext = createContext(defaultState);

// export const SC000_S_BaseComponentContext_Reducer = createContext({} as SC000_T_BaseComponentContext);

export const SC000_S_BaseComponentProvider = (props: any) => {
    const { children } = props;

    //コンテキスト呼び出し、ディスパッチャ作成
    // const { state, dispatch } = useContext(SC000_S_BaseComponentContext)
    const [state, dispatch] = useReducer(reducer, defaultState)
    //初期値の仮dispatchを、本dispatchで上書きする
    state.dispatch = dispatch
    // contextの中にproviderがあるのでそれでchildrenを囲む
    // valueの中にグローバルに扱う実際の値を設定
    return (
        <SC000_S_BaseComponentContext.Provider value={state}>
            {children}
        </SC000_S_BaseComponentContext.Provider>
    );
};
