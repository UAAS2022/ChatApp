import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
import type {
    SC020_Context,
} from "./SC020_Types"
// import { SC020_ACTIONTYPE } from "./SC020_Const"
import { SC020_ACTIONTYPE } from "./SC020_Action"

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: SC020_Context, action: SC000_Action) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // UPDATE_COUNTERの場合
        case SC020_ACTIONTYPE.UPDATE_COUNTER:
            newState = { ...state, ...payload }
            break
        // UPDATE_USERの場合
        case SC020_ACTIONTYPE.UPDATE_USERLIST:
            newState = { ...state, ...payload }
            break
    }
    return newState
}