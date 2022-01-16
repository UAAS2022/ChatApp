import React, { useState, useEffect, useContext } from 'react';
import type { SC010_A_Counter } from "./SC010_Types"


export const COUNTER_ADD: SC010_A_Counter = {
    type: 'COUNTER_ADD',  // ActionType
    payload: 1       // payload
}
export const COUNTER_REMOVE: SC010_A_Counter = {
    type: 'COUNTER_REMOVE',  // ActionType
    payload: 1       // payload
}