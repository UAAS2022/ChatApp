export type SC000_A_ScreenController = {
    type: string,
    payload: SC000_T_ScreenController,
}

export type SC000_T_BaseComponentContext = {
    screenControllerObj: SC000_T_ScreenController,
    dispatch_screenControllerObj: React.Dispatch<SC000_A_ScreenController>
    // test01Obj: SC000_T_test01,
    // test02Obj: SC000_T_test02,
    // testParam01: string,
    // testParam02: string,
    // testParam03: number,
}

export type SC000_T_ScreenController = {
    screenId: string,
    layoutPattern: number,
    infoObj: any,
}

export type SC000_T_test01 = {
    testParam01: string,
    testParam02: string,
    testParam03: string,
    testParam04: string,
    testParam05: string,
    testParam06: number,
    testParam07: number,
}


export type SC000_T_test02 = {
    testParam01: string,
    testParam02: string,
}

export type SC000_T_ScreenChangeBtnInfo = {
    buttonId: string | undefined,
    buttonName: string,
    nextScreenId: string,
    action: SC000_A_ScreenController
}