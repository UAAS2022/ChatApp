import { createContext, useState, useReducer, useContext } from "react";
import type { SC999_Context, SC999_Provider } from "./SC999_Types"
import type { SC999_ScreenController } from "./SC999_Types"
import { reducer, } from "./SC999_Reducer"

// 1.コンテキスト（S999_S_Context）
export const SC999_S_Context = createContext<SC999_Provider>({} as SC999_Provider);
// export const SC999_S_Context = createContext<SC999_Context>({} as SC999_Context);


// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
const DefaultState: SC999_Context = {
    screenControllerInfo: {
        componentId: "SC999_V02",
        layoutPattern: 1,
        infoObj: {}
    },
}

// 3.プロバイダ(SC010_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const SC999_S_Provider = (props: any) => {
    // JSXでchildrenを使うため、propsからchildrenを取得する
    const { children } = props;

    // useReducerを使ってstateとdispatchを取得する
    const [state, dispatch] = useReducer(reducer, DefaultState)

    // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
    return (
        // <SC999_S_Context.Provider value={state}> */
        <SC999_S_Context.Provider value={{ state, dispatch }}>
            {children}
        </SC999_S_Context.Provider >
    );
};
