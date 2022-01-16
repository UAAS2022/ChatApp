import type { SC010_T_HomeContext, SC010_A_Counter } from "./SC010_Types"

export const reducer_counterObj = (state: SC010_T_HomeContext, action: SC010_A_Counter) => {
    let newState = { ...state }
    switch (action.type) {
        case "COUNTER_ADD":
            newState.counterObj.count = state.counterObj.count + action.payload
            console.log("SC010_S_HomeProvider.SC010_S_HomeProvider.SC010_ADD", state, newState, action)
            break
        case "COUNTER_REMOVE":
            newState.counterObj.count = state.counterObj.count - action.payload
            console.log("SC010_S_HomeProvider.SC010_S_HomeProvider.SC010_REMOVE", state, newState, action)
            break
    }
    return newState
}