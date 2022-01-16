import { createContext, useState, useReducer } from "react";
import type { SC010_T_HomeContext } from "./SC010_Types"
import { reducer_counterObj } from "./SC010_Reducer"

export const SC010_S_HomeContext = createContext({} as SC010_T_HomeContext);

// export const actionCreater_SC010 = (actionId: string, param: Object): SC010_A_Counter => {
//     console.log("SC010_S_HomeProvider.actionCreater_SC010", actionId)
//     switch (actionId) {
//         case "0":
//             return { type: "SC010_ADD", payload: 1 }
//         case "1":
//             return { type: "SC010_REMOVE", payload: 1 }
//         default:
//             return { type: "SC010_ADD", payload: 1 }
//     }
// }

//コンテキストの初期値を定義
const defaultState: SC010_T_HomeContext = {
    counterObj: { count: 0 },
    dispatch_counterObj: () => { }
}

export const SC010_S_HomeProvider = (props: any) => {
    // childrenを受け取る
    const { children } = props;
    // const [count, dispatch] = useReducer(reducer,'初期値')

    const [state, dispatch_counterObj] = useReducer(reducer_counterObj, defaultState)
    state.dispatch_counterObj = dispatch_counterObj

    // contextの中にproviderがあるのでそれでchildrenを囲む
    // valueの中にグローバルに扱う実際の値を設定
    return (
        <SC010_S_HomeContext.Provider value={state}>
            {children}
        </SC010_S_HomeContext.Provider>
    );
};


