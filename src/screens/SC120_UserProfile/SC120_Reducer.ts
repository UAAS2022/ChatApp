import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
import type {
    SC120_Context,
} from "./SC120_Types"
// import { SC120_ACTIONTYPE } from "./SC120_Const"
import { SC120_ACTIONTYPE } from "./SC120_Action"

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: SC120_Context, action: SC000_Action) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // UPDATE_USERPROFILEの場合
        case SC120_ACTIONTYPE.UPDATE_USERPROFILE:
            newState = { ...state, ...payload }
            break
    }
    return newState
}