import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// ↑特定の端末だとフォントや要素が大きすぎる/小さすぎるといった問題を解決できるライブラリ

export const SC998_Style = StyleSheet.create({
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
        backgroundColor: '#999',    //背景色
    },
    v01_MainScreen: {
        height: '100%',             //縦幅
        width: '100%',              //横幅
        marginTop: 0,               //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 0,              //余白(左)
        marginRight: 0,             //余白(右)
        backgroundColor: '#fff',    //背景色
    },
    v03_MenuBtn: {
        height: '100%',              //縦幅
        width: '25%',              //横幅
        alignItems: 'center',       //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginLeft: "0.1%",         //余白(左)
        marginRight: "0.1%",        //余白(右)
        // marginTop: "1%",
        // marginBottom: "1%",
        fontSize: 9,                //フォントサイズ
        backgroundColor: '#eee',    //背景色
    },
    v04_MenuBar: {
        height: '6%',               //縦幅
        width: '100%',              //横幅
        alignItems: 'flex-end',     //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginTop: 'auto',          //余白(上)
        marginBottom: 0,            //余白(下)
        marginLeft: 'auto',         //余白(左)
        marginRight: 'auto',        //余白(右)
        flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        backgroundColor: '#888',    //背景色
    },
    v00_nabebts: {
        height: '10%',             //縦幅
        width: '50%',              //横幅
        marginTop: 80,               //余白(上)
        marginBottom: 80,            //余白(下)
        marginLeft: 80,              //余白(左)
        marginRight: 80,             //余白(右)
        backgroundColor: '#999',    //背景色
    },


});
