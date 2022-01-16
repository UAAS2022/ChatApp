// //useReducerをimport
// import React, {useReducer} from 'react'
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

// //counterの初期値を0に設定
// //2つのcountStateを扱う。それぞれのinitialStateを設定
// const initialState ={
//   firstCounter: 0,
//   secondCounter: 100
// }
// //reducer関数を作成
// //countStateとactionを渡して、新しいcountStateを返すように実装する
// const reducerFunc = (countState, action)=> {
// //reducer関数にincrement、increment、reset処理を書く
// //どの処理を渡すかはactionを渡すことによって判断する
// //switch文のactionをaction.typeに変更
// //firstCounter、secondCounter用にcaseを設定
// //複数のcounterStateを持っている場合は、更新前のcounterStateを展開し、オブジェクトのマージを行う
//   switch (action.type){
//     case 'increment1':
//       return {...countState, firstCounter: countState.firstCounter + action.value}
//     case 'decrement1':
//       return {...countState, firstCounter: countState.firstCounter - action.value}
//     case 'increment2':
//       return {...countState, secondCounter: countState.secondCounter + action.value}
//     case 'decrement2':
//       return {...countState, secondCounter: countState.secondCounter - action.value}
//     case 'reset1':
//       return {...countState, firstCounter: initialState.firstCounter}
//     case 'reset2':
//       return {...countState, secondCounter: initialState.secondCounter}
//     default:
//       return countState
//   }
// }
// const Counter2 = () => {
// //作成したreducerFunc関数とcountStateをuseReducerに渡す
// //useReducerはcountStateとdispatchをペアで返すので、それぞれを分割代入
//   const [count, dispatch] = useReducer(reducerFunc, initialState)
// //カウント数とそれぞれのactionを実行する<Button/>を設置する
// //dispatchで渡しているactionをオブジェクトに変更して、typeとvalueを設定
//   return 
// }

// export default Counter2

import type { SC000_T_BaseComponentContext, SC000_A_ScreenController } from "./SC950_Types"

export const reducer = (state: SC000_T_BaseComponentContext, action: SC000_A_ScreenController) => {
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