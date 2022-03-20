import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// ↑特定の端末だとフォントや要素が大きすぎる/小さすぎるといった問題を解決できるライブラリ

export const SC120_Style = StyleSheet.create({
    v06_Profile: {
        height: '100%',               //縦幅
        width: '100%',              //横幅
        // alignItems: 'flex-end',     //配置（上下）
        alignSelf: 'flex-start',     //配置
        // justifyContent: 'center',   //配置（左右）???
        // marginTop: '1%',          //余白(上)
        // marginBottom: '1%',            //余白(下)
        // marginLeft: '3%',         //余白(左)
        // marginRight: '1%',      //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#888',    //背景色
    }
    // ------------------------------------------------------------------------------------
});
