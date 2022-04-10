import { createContext, useState, useReducer } from "react";
import type { SC410_Provider, SC410_Context, } from "./SC410_Types"
import { reducer } from "./SC410_Reducer"
import { SC950_V00_Error, sc950_V00_commonErr } from "../SC950_Error/SC950_V00_Error"


// SC999_Store.tsxではコンテキスト（グローバルステートのこと。複数コンポーネントで利用可能な変数だと思えばOK）を定義する。
// ここでは以下の3つを用意する。
// 　1.コンテキスト（S999_S_Context）
// 　2.コンテキストの初期値(DefaultState)
// 　3.プロバイダ(SC410_S_Provider)

// 1.コンテキスト（S999_S_Context）
export const SC410_S_Context = createContext<SC410_Provider>({} as SC410_Provider);

// 2.コンテキストの初期値(DefaultState)
// コンテキストに値を追加する場合、ここに初期値も追加する必要がある。
// ==========================================================================================
// 各要素の初期値を定義
const DEfAULT_ScreenControllerInfo = {
    screenId: "SC410",
    layoutPattern: 1,
    infoObj: {}
}

const DEFAULT_userProfileInfo = {
    userId: "",
    userName: "",
    comment: "",
    latestLoginDatatime: "",
    profileImagePath: "",
    genderCd: "",
    age: 2,
    areaCd: "",
    hashtag: "",
}
const DEFAULT_screenInfo_SC420 =
{
    userProfileInfo: DEFAULT_userProfileInfo
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// コンテキストに↑で定義した初期値を設定し、デフォルトステートを作成
const DEFAULT_State: SC410_Context = {
    screenControllerInfo: DEfAULT_ScreenControllerInfo,
    screenInfo_SC420: DEFAULT_screenInfo_SC420
}
// ==========================================================================================

// 3.プロバイダ(SC410_S_Provider)
//　詳しい説明はげぇじ本P183を参照
export const SC410_S_Provider = (props: any) => {
    try {
        // JSXでchildrenを使うため、propsからchildrenを取得する
        const { children } = props;

        // useReducerを使ってstateとdispatchを取得する
        const [state, dispatch] = useReducer(reducer, DEFAULT_State)

        // valueの中に{state, dispatch}を設定し、childrenコンポーネントで使えるようにする
        return (
            <SC410_S_Context.Provider value={{ state, dispatch }}>
                {children}
            </SC410_S_Context.Provider>
        );
    } catch (error) {
        if (error instanceof Error) {
            sc950_V00_commonErr(error)
        }
        return (<SC950_V00_Error />)
    }

};


