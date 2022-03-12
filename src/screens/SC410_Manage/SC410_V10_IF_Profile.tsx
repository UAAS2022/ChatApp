// View

import React, { useState, useEffect, useConText } from 'react';
import {
    Box,
    Center,
    Divider,
} from "native-base"
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    // Button,
    FlatList,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import { SC410_V05_ManageHeader } from './SC410_V05_ManageHeader';
import { SC410_Style } from './SC410_Style';

export const SC410_V10_IF_Profile = (props: object) => {
    return (
        <>
            <SC410_V05_ManageHeader />

            <Center w="100%" h="50%"  >
                <Image source={require("../../static/img" + "/murata_unko.jpeg")} style={SC410_Style.v06_Profile} />

            </Center>
            <View>
                <Text>村田基</Text>
                <Text>性別取得</Text>
                <Text>地域取得</Text>
                <Text>最終ログイン時間取得</Text>
                <Text>自己紹介取得</Text>

            </View>
        </>
    )
}
