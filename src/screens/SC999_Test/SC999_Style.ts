import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// ↑特定の端末だとフォントや要素が大きすぎる/小さすぎるといった問題を解決できるライブラリ

export const SC999_Style = StyleSheet.create({
    menuBtn: {
        height: '100%',              //縦幅
        width: '15%',              //横幅
        alignItems: 'center',       //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginLeft: "1%",         //余白(左)
        marginRight: "1%",        //余白(右)
        // marginTop: "1%",
        // marginBottom: "1%",
        fontSize: 9,                //フォントサイズ
    },
    menuBtnBar: {
        height: '5%',               //縦幅
        width: '100%',              //横幅
        alignItems: 'flex-end',     //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginTop: 'auto',          //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 'auto',         //余白(左)
        marginRight: 'auto',        //余白(右)
        flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        backgroundColor: '#fff',    //背景色
    },
});
