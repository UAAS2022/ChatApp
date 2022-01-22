import type {
    S010_Context,
    SC010_A_UPDATE_COUNTER,
} from "./SC010_Types"
import { ActionType } from "./SC010_ActionType"

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: S010_Context, action: SC010_A_UPDATE_COUNTER) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // UPDATE_COUNTERの場合
        case ActionType.UPDATE_COUNTER:
            newState = { ...state, ...payload }
            break
        // UPDATE_USERの場合
        case ActionType.UPDATE_USER:
            newState = { ...state, ...payload }
            break
    }
    console.log("SC010_Reducer,reducer.action:", action,)
    console.log("SC010_Reducer,reducer.state:", state,)
    console.log("SC010_Reducer,reducer.newState:", newState)
    return newState
}