import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// ↑特定の端末だとフォントや要素が大きすぎる/小さすぎるといった問題を解決できるライブラリ

export const SC000_Style = StyleSheet.create({
    // ↓↓チャットアプリサイトのサンプル↓↓
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messagesContainer: {
        width: '100%',
        padding: 10
    },
    inputTextContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        height: 32,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10
    },
    // ↑↑チャットアプリサイトのサンプル↑↑

    // UAASスタイル
    v00_BaseComponent: {
        height: '100%',             //縦幅
        width: '100%',              //横幅
        marginTop: 0,               //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 0,              //余白(左)
        marginRight: 0,             //余白(右)
        backgroundColor: '#fff',    //背景色
    },
    v01_MainScreen_Full: {
        height: '100%',             //縦幅
        width: '100%',              //横幅
        marginTop: 0,               //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 0,              //余白(左)
        marginRight: 0,             //余白(右)
        backgroundColor: '#fff',    //背景色
    },
    v01_MainScreen_H: {
        height: '93%',             //縦幅
        width: '100%',              //横幅
        marginTop: 0,               //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 0,              //余白(左)
        marginRight: 0,             //余白(右)
        backgroundColor: '#fff',    //背景色
    },
    v01_MainScreen_F: {
        height: '92%',             //縦幅
        width: '100%',              //横幅
        marginTop: 0,               //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 0,              //余白(左)
        marginRight: 0,             //余白(右)
        backgroundColor: '#fff',    //背景色
    },
    v01_MainScreen_HF: {
        height: '85%',             //縦幅
        width: '100%',              //横幅
        marginTop: 0,               //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 0,              //余白(左)
        marginRight: 0,             //余白(右)
        backgroundColor: '#fff',    //背景色
    },
    v01_Hooter: {
        height: '8%',               //縦幅
        width: '100%',              //横幅
    },
    v01_Hooter_DisplayNone: {
        display: "none",            //表示・非表示
    },
    v03_MenuBtnView: {
        height: '90%',              //縦幅
        width: '25%',              //横幅
        alignItems: 'center',       //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginLeft: "0.1%",         //余白(左)
        marginRight: "0.1%",        //余白(右)
        // marginTop: "1%",
        // marginBottom: "1%",
        fontSize: 9,                //フォントサイズ
        // backgroundColor: '#fff',    //背景色
    },
    v03_MenuBtn: {
        height: '100%',              //縦幅
        width: '90%',              //横幅
        alignItems: 'center',       //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginLeft: "0.1%",         //余白(左)
        marginRight: "0.1%",        //余白(右)
        // marginTop: "1%",
        // marginBottom: "1%",
        fontSize: 9,                //フォントサイズ
        // backgroundColor: '#fff0f5',    //背景色
    },
    v04_MenuBar: {
        // height: '100%',               //縦幅
        // width: '100%',              //横幅
        alignItems: 'flex-end',     //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginTop: '1%',          //余白(上)
        marginBottom: "0%",            //余白(下)
        marginLeft: 'auto',         //余白(左)
        marginRight: 'auto',        //余白(右)
        flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        backgroundColor: '#fff',    //背景色
    },
    v00_HeaderArea: {
        height: '7%',               //縦幅
        width: '100%',              //横幅
        // alignItems: 'flex-end',     //配置（上下）
        justifyContent: 'center',  //配置（左右）
        marginTop: '0%',          //余白(上)
        marginBottom: '0%',            //余白(下)
        marginLeft: 'auto',         //余白(左)
        marginRight: 'auto',        //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        backgroundColor: '#fff',    //背景色
    },
    v99_BackBtn: {
        // height: '5%',               //縦幅
        width: '15%',              //横幅
        // alignItems: 'flex-end',     //配置（上下）
        alignSelf: 'flex-start',     //配置
        // justifyContent: 'center',   //配置（左右）???
        marginTop: '1%',          //余白(上)
        marginBottom: '1%',            //余白(下)
        marginLeft: '3%',         //余白(左)
        marginRight: '1%',      //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#888',    //背景色
    },
    v99_Header: {
        // height: '5%',               //縦幅
        // width: '15%',              //横幅
        alignItems: 'center',     //配置（上下）
        // alignSelf: 'flex-start',     //配置
        // justifyContent: 'center',   //配置（左右）???
        // marginTop: '1%',          //余白(上)
        // marginBottom: '1%',            //余白(下)
        // marginLeft: '3%',         //余白(左)
        // marginRight: '1%',      //余白(右)
        flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#888',    //背景色
    },
});
