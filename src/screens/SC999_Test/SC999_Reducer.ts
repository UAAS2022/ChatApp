import type {
    SC999_Context,
    SC999_Action,
} from "./SC999_Types"
import { SC999_ACTIONTYPE } from "./SC999_Const"

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: SC999_Context, action: SC999_Action) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // CHANGE_SCREENの場合
        case SC999_ACTIONTYPE.CHANGE_SCREEN:
            newState = { ...state, ...payload }
            break
        case SC999_ACTIONTYPE.UPDATE_V08:
            newState = { ...state, ...payload }
            break
        case SC999_ACTIONTYPE.UPDATE_V14:
            newState = { ...state, ...payload }
            break
        case SC999_ACTIONTYPE.UPDATE_V19:
            newState = { ...state, ...payload }
            break
    }

    // console.log("SC010_Reducer,reducer.action:", action,)
    // console.log("SC010_Reducer,reducer.state:", state,)
    // console.log("SC010_Reducer,reducer.newState:", newState)
    return newState
}