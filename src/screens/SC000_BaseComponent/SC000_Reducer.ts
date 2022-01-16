// Reducerでは、actionタイプごとの処理を書く？

import type { SC000_T_BaseComponentContext, SC000_A_ScreenController } from "./SC000_Types"

export const reducer_screenControllerObj = (state: SC000_T_BaseComponentContext, action: SC000_A_ScreenController) => {
    const newState = { ...state }
    switch (action.type) {
        case "GO_TO_SC010":
            newState.screenControllerObj.screenId = action.payload.screenId
            newState.screenControllerObj.layoutPattern = action.payload.layoutPattern
            console.log(new Date().toLocaleString(), "SC000.reducer.GO_TO_SC010:", state, action)
            break
        case "GO_TO_SC020":
            newState.screenControllerObj.screenId = action.payload.screenId
            newState.screenControllerObj.layoutPattern = action.payload.layoutPattern
            console.log(new Date().toLocaleString(), "SC000.reducer.GO_TO_SC020:", state, action)
            break
        case "GO_TO_SC021":
            newState.screenControllerObj.screenId = action.payload.screenId
            newState.screenControllerObj.layoutPattern = action.payload.layoutPattern
            console.log(new Date().toLocaleString(), "SC000.reducer.GO_TO_SC021:", state, action)
            break
        default:
            console.log(new Date().toLocaleString(), "SC000.reducer.default:", state, action)
            break
    }
    return newState
}