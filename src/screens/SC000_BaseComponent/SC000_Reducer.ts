import type {
    S000_Context,
    SC000_Action,
    SC000_A_ScreenController,
} from "./SC000_Types"
import { SC000_ACTIONTYPE } from "./SC000_Const"

// export const reducer_screenControllerObj = (state: S000_Context, action: SC000_A_ScreenController) => {
//     const newState = { ...state }
//     switch (action.type) {
//         case "GO_TO_SC010":
//             newState.screenControllerInfo.screenId = action.payload.screenId
//             newState.screenControllerInfo.layoutPattern = action.payload.layoutPattern
//             console.log(new Date().toLocaleString(), "SC000.reducer.GO_TO_SC010:", state, action)
//             break
//         case "GO_TO_SC020":
//             newState.screenControllerInfo.screenId = action.payload.screenId
//             newState.screenControllerInfo.layoutPattern = action.payload.layoutPattern
//             console.log(new Date().toLocaleString(), "SC000.reducer.GO_TO_SC020:", state, action)
//             break
//         case "GO_TO_SC021":
//             newState.screenControllerInfo.screenId = action.payload.screenId
//             newState.screenControllerInfo.layoutPattern = action.payload.layoutPattern
//             console.log(new Date().toLocaleString(), "SC000.reducer.GO_TO_SC021:", state, action)
//             break
//         default:
//             console.log(new Date().toLocaleString(), "SC000.reducer.default:", state, action)
//             break
//     }
//     return newState
// }

// SC999_Reducer.tsには、基本的に「reducerメソッド」のみを定義する。
// reducerメソッドの中にアクションごとの処理を記載する。

// Actionから渡された更新情報を使って、新しいstate情報を作るためのメソッド
export const reducer = (state: S000_Context, action: SC000_Action) => {
    // 更新後state情報を宣言する（初期値として更新前state情報を設定する）
    let newState = { ...state }
    // actionオブジェクトからtypeとpayloadを取得する
    const { type, payload } = action
    // ActionTypeごとに処理を分岐する
    switch (type) {
        // CHANGE_SCREENの場合
        case SC000_ACTIONTYPE.CHANGE_SCREEN:
            newState = { ...state, ...payload }
            break
    }
    console.log("SC010_Reducer,reducer.action:", action,)
    console.log("SC010_Reducer,reducer.state:", state,)
    console.log("SC010_Reducer,reducer.newState:", newState)
    return newState
}