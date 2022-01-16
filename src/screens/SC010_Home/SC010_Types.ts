
export type SC010_T_HomeContext = {
    counterObj: SC010_T_Counter,
    dispatch_counterObj: React.Dispatch<SC010_A_Counter>
}

export type SC010_T_Counter = {
    count: number,
}

export type SC010_T_test01 = {
    testParam01: string,
    testParam02: string,
    testParam03: string,
    testParam04: string,
    testParam05: string,
    testParam06: number,
    testParam07: number,
}


export type SC010_T_test02 = {
    testParam01: string,
    testParam02: string,
}

export type SC010_A_Counter = {
    type: string
    payload: number
}