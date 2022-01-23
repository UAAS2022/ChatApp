
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    Text,
    Button,
    FlatList,
    Alert
} from 'react-native';

export const CC0010_ScreenTitle = (props: any) => {
    const { children } = props;
    const contentStyle = {
        color: "red",
        fontSize: 20
    };

    return (<Text style={contentStyle}>{children}</Text>)
}
