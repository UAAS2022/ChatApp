// View

import React, { useContext } from 'react';
import {
    // View,
    Button,
} from "native-base"
import {
    View,
} from 'react-native';
import { CONST_SC000 } from "../../common/C000_Const"
import { getLayoutPattern } from "../SC000_BaseComponent/SC000_V03_MenuBtn"
import { SC410_S_Context } from "../SC410_Manage/SC410_Store"
import { SC410_Style } from "../SC410_Manage/SC410_Style"
import { CHANGE_SCREEN } from '../SC410_Manage/SC410_Action';



export const SC010_V10_InitHeader = (props: object) => {
    // B:スクリーンコンテキストで表示切り替え情報を管理した場合----------------------------------------------------------
    // スクリーンコンテキストを呼び出す
    const { state, dispatch } = useContext(SC410_S_Context)

    // CS410への遷移関数
    const onClickSwitch_SC410_SC = () => {
        // 取得したstateの値を更新する
        let newState = { ...state }
        // 取得したstateの値を更新する
        newState.screenControllerInfo.screenId = CONST_SC000.SCREENINFO.SC410.SCREENID
        newState.screenControllerInfo.layoutPattern = getLayoutPattern(CONST_SC000.SCREENINFO.SC410.SCREENID)
        dispatch(CHANGE_SCREEN(newState.screenControllerInfo))
    }
    // ---------------------------------------------------------------------------------------------------------

    return (
        <>
            <View style={SC410_Style.v08_ProfileHeader} >
                <Button style={SC410_Style.v05_BackBtn} size="sm" variant="outline" colorScheme="primary" onPress={onClickSwitch_SC410_SC}>
                    戻る
                </Button>
            </View>
        </>
    )
}
