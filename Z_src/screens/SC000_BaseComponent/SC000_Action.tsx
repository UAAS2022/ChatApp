// Actionを定義。typeとpayloadを指定する。

import React, { useState, useEffect, useContext } from 'react';
import type { SC000_ScreenController, SC000_A_ScreenController } from "./SC000_Types"
import { ActionType } from "./SC000_ActionType"

// export const GO_TO_SC010: SC000_A_ScreenController = {
//     type: 'GO_TO_SC010',  // ActionType
//     payload: { screenId: "SC010", layoutPattern: 1, infoObj: {} }       // payload
// }
// export const GO_TO_SC020: SC000_A_ScreenController = {
//     type: 'GO_TO_SC020',  // ActionType
//     payload: { screenId: "SC020", layoutPattern: 1, infoObj: {} }       // payload
// }

// export const GO_TO_SC021: SC000_A_ScreenController = {
//     type: 'GO_TO_SC021',  // ActionType
//     payload: { screenId: "SC021", layoutPattern: 2, infoObj: {} }       // payload
// }

export const CHANGE_SCREEN = (payload: SC000_ScreenController) => {
    return {
        type: ActionType.CHANGE_SCREEN,
        payload
    }
}