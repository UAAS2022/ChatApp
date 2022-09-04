import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// ↑特定の端末だとフォントや要素が大きすぎる/小さすぎるといった問題を解決できるライブラリ

export const SC220_Style = StyleSheet.create({
    menuBtn: {
        height: '100%',              //縦幅
        width: '18%',              //横幅
        alignItems: 'center',       //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginLeft: "1%",         //余白(左)
        marginRight: "1%",        //余白(右)
        // marginTop: "1%",
        // marginBottom: "1%",
        fontSize: 9,                //フォントサイズ
    },
    menuBtnBar: {
        height: '13%',               //縦幅
        width: '100%',              //横幅
        alignItems: 'flex-end',     //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginTop: '3%',          //余白(上)
        marginBottom: '0%',            //余白(下)
        marginLeft: '0%',         //余白(左)
        marginRight: '0%',        //余白(右)
        flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        backgroundColor: '#fff',    //背景色
    },
    testMainScreen: {
        height: '65%',               //縦幅
        width: '100%',              //横幅
    },
    regularBtn: {
        height: '7%',              //縦幅
        width: '30%',              //横幅
        alignItems: 'center',       //配置（上下）
        justifyContent: 'center',   //配置（左右）
        marginLeft: "auto",         //余白(左)
        marginRight: "auto",        //余白(右)
        // marginTop: "1%",
        // marginBottom: "1%",
        fontSize: 9,                //フォントサイズ
    },
    userInfoArea: {
        // height: '10%',               //縦幅
        // width: '100%',              //横幅
        // alignItems: 'center',     //配置（上下）
        justifyContent: 'center',   //配置（左右）
        // marginTop: 0,          //余白(上)
        // marginBottom: 0,       //余白(下)
        // marginLeft: 0,         //余白(左)
        // marginRight: 0,        //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#888',    //背景色
    },
    userInfoBox: {
        // height: '3%',               //縦幅
        // width: '100%',              //横幅
        // alignItems: 'flex-start',     //配置（上下）
        // justifyContent: 'center',   //配置（左右）
        marginTop: '1%',          //余白(上)
        marginBottom: '1%',            //余白(下)
        marginLeft: '1%',         //余白(左)
        marginRight: '1%',        //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#999',    //背景色
    },

    talkInfoBox: {
        // height: '70%',               //縦幅
        width: '94%',              //横幅
        // alignItems: 'flex-start',     //配置（上下）
        // justifyContent: 'center',   //配置（左右）
        marginTop: '1%',          //余白(上)
        marginBottom: '1%',            //余白(下)
        marginLeft: '3%',         //余白(左)
        marginRight: '3%',        //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#999',    //背景色
    },

    chatMessageInfoBox: {
        // height: '70%',               //縦幅
        width: '94%',              //横幅
        // alignItems: 'flex-start',     //配置（上下）
        // justifyContent: 'center',   //配置（左右）
        marginTop: '1%',          //余白(上)
        marginBottom: '1%',            //余白(下)
        marginLeft: '3%',         //余白(左)
        marginRight: '3%',        //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#999',    //背景色
    },

    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputTextContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        color: '#000',
        borderWidth: 1,
        borderColor: '#999',
        height: 32,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10
    },

    // SC999_V20---------------------------------------------------------------------------
    v20_ScrollView: {
        // color: "#fff",
        // height: '100%',               //縦幅
        // width: '25%',              //横幅
        // alignItems: 'flex-end',     //配置（上下）
        // alignSelf: 'center',     //配置
        // justifyContent: 'center',   //配置（左右）???
        // marginTop: '25%',          //余白(上)
        // marginBottom: '0%',            //余白(下)
        marginLeft: '2%',         //余白(左)
        marginRight: '2%',      //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#000',    //背景色
    },
    v20_MessageSender_Me: {
        alignSelf: 'flex-end',
    },
    v20_MessageSender_You: {
        alignSelf: 'flex-start',
    },
    v20_UserName: {
        fontSize: 10
    },
    v20_MessageItem_Me: {
        alignSelf: 'flex-end',
        backgroundColor: '#9900ff',
        padding: 5,
        borderRadius: 5,
        borderTopRightRadius: 0,
        marginBottom: 5
    },
    v20_MessageItem_You: {
        alignSelf: 'flex-start',
        backgroundColor: '#ecc6e8',
        padding: 5,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        marginBottom: 5
    },
    v20_InputTextContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    v20_InputText: {
        color: '#000',
        borderWidth: 1,
        borderColor: '#999',
        height: 32,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10
    },
    v20_SendBtn: {
        height: '90%',              //縦幅
        width: '15%',              //横幅
        // alignItems: 'center',       //配置（上下）
        // alignSelf: 'center',     //配置
        // justifyContent: 'center',   //配置（左右）
        marginLeft: "2%",         //余白(左)
        marginRight: "2%",        //余白(右)
        marginTop: "0%",
        marginBottom: "0%",
        // fontSize: 9,                //フォントサイズ
    },
    // ------------------------------------------------------------------------------------

    // SC999_V21---------------------------------------------------------------------------
    v21_LoginUserChangeBtn: {
        // height: '5%',               //縦幅
        width: '22%',              //横幅
        // alignItems: 'flex-end',     //配置（上下）
        alignSelf: 'center',     //配置
        // justifyContent: 'center',   //配置（左右）???
        marginTop: '15%',          //余白(上)
        marginBottom: '25%',            //余白(下)
        marginLeft: '3%',         //余白(左)
        marginRight: '3%',      //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#888',    //背景色
    },
    v21_MainArea: {
        height: '100%',               //縦幅
        // width: '25%',              //横幅
        // alignItems: 'flex-end',     //配置（上下）
        // alignSelf: 'center',     //配置
        // justifyContent: 'center',   //配置（左右）???
        // marginTop: '1%',          //余白(上)
        // marginBottom: '1%',            //余白(下)
        // marginLeft: '3%',         //余白(左)
        // marginRight: '1%',      //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        backgroundColor: '#000',    //背景色
    },
    v21_Font: {
        color: "#fff",
        // height: '100%',               //縦幅
        // width: '25%',              //横幅
        // alignItems: 'flex-end',     //配置（上下）
        alignSelf: 'center',     //配置
        // justifyContent: 'center',   //配置（左右）???
        marginTop: '25%',          //余白(上)
        marginBottom: '0%',            //余白(下)
        marginLeft: '0%',         //余白(左)
        marginRight: '0%',      //余白(右)
        // flexDirection: 'row',       //主軸の方向（row,row-reverse,column,column-reverse)
        // backgroundColor: '#000',    //背景色
    },
    // ------------------------------------------------------------------------------------
});
