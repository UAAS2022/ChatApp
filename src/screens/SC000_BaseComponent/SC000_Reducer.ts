import type {
    SC000_Context,
    SC000_Action,
} from "./SC000_Types"
import { SC000_ACTIONTYPE } from "./SC000_Action"

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: SC000_Context, action: SC000_Action) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // CHANGE_SCREENの場合
        case SC000_ACTIONTYPE.SC000.SC000_CHANGE_SCREEN:
            newState = { ...state, ...payload }
            break
        case SC000_ACTIONTYPE.SC000.SC000_UPDATE_LOGIN_USER:
            newState = { ...state, ...payload }
            break
        case SC000_ACTIONTYPE.SC000.SC000_UPDATE_LAYOUTPATTERN:
            newState = { ...state, ...payload }
            break
        case SC000_ACTIONTYPE.SC110.SC110_UPDATE_USERLIST:
            newState = { ...state, ...payload }
            break
        case SC000_ACTIONTYPE.SC210.SC210_UPDATE_TAlKUSER:
            newState = { ...state, ...payload }
            break
    }
    // //console.log("SC010_Reducer,reducer.action:", action,)
    // //console.log("SC010_Reducer,reducer.state:", state,)
    // //console.log("SC010_Reducer,reducer.newState:", newState)
    return newState
}