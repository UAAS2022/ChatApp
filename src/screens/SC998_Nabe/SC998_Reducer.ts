import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
import type {
    SC998_Context,
} from "./SC998_Types"
import { SC998_ACTIONTYPE } from "./SC998_Action"

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: SC998_Context, action: SC000_Action) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // UPDATE_COUNTERの場合
        case SC998_ACTIONTYPE.UPDATE_MURATA:
            newState = { ...state, ...payload }
            break
    }
    // console.log("SC998_Reducer,reducer.action:", action,)
    // console.log("SC998_Reducer,reducer.state:", state,)
    // console.log("SC998_Reducer,reducer.newState:", newState)
    return newState
}