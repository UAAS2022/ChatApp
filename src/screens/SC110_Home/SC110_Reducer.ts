import type { SC000_Action } from "../SC000_BaseComponent/SC000_Types"
import type {
    SC110_Context,
} from "./SC110_Types"
// import { SC110_ACTIONTYPE } from "./SC110_Const"
import { SC110_ACTIONTYPE } from "./SC110_Action"
import { SC110_InfinityScrollInfo } from "./SC110_Types"

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: SC110_Context, action: SC000_Action) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // UPDATE_COUNTERの場合
        case SC110_ACTIONTYPE.CHANGE_SCREEN:
            newState = { ...state, ...payload }
            break
        // UPDATE_USERの場合
        case SC110_ACTIONTYPE.UPDATE_USERLIST:
            newState = { ...state, ...payload }
            break
        // UPDATE_USERの場合
        case SC110_ACTIONTYPE.UPDATE_INFINITY_SCROLL_INFO:
            // const infinityScrollInfo = { infinityScrollInfo: payload as SC110_InfinityScrollInfo }
            // newState = { ...state, ...infinityScrollInfo }
            newState = { ...state, ...payload }
            break
    }
    return newState
}