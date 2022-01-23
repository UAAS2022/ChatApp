import { createContext, useState, useReducer, useContext } from "react";
import type { S000_Context } from "./SC000_Types"
import type { SC000_ScreenController } from "./SC000_Types"
import type { SC000_T_test01 } from "./SC000_Types"
import type { SC000_T_test02 } from "./SC000_Types"
import { reducer, reducer_screenControllerObj, } from "./SC000_Reducer"

// //コンテキストの初期値を定義
// const DefaultState: S000_Context = {
//     screenControllerObj: {
//         screenId: "SC010",
//         layoutPattern: 1,
//         infoObj: {}
//     },
// }
// //コンテキスト定義
// export const SC000_S_Context = createContext<any>({} as S000_Context);

// // export const SC000_S_BaseComponentContext_Reducer = createContext({} as SC000_T_BaseComponentContext);

// export const SC000_S_Provider = (props: any) => {
//     const { children } = props;

//     //コンテキスト呼び出し、ディスパッチャ作成
//     // const { state, dispatch } = useContext(SC000_S_BaseComponentContext)
//     const [state, dispatch] = useReducer(reducer, DefaultState)
//     //初期値の仮dispatchを、本dispatchで上書きする
//     state.dispatch_screenControllerObj = dispatch_SC000_A_ScreenController
//     // contextの中にproviderがあるのでそれでchildrenを囲む
//     // valueの中にグローバルに扱う実際の値を設定
//     return (
//         <SC000_S_Context.Provider value={state}>
//             {children}
//         </SC000_S_Context.Provider>
//     );
// };

// 1.コンテキスト（S999_S_Context）
export const SC000_S_Context = createContext<any>({} as S000_Context);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
const DefaultState: S000_Context = {
    screenControllerInfo: {
        screenId: "SC010",
        layoutPattern: 1,
        infoObj: {}
    },
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
