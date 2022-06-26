import React, { useState, useMemo, useContext } from 'react';
import {
    Select,
    Box,
    Center,
    CheckIcon
} from "native-base"

import {
    StyleSheet,
} from 'react-native'

export const SC030_V01_SignUpseibetu = () => {
    let [service, setService] = React.useState("");
    return <Center>
        <Box w="3/4" maxW="300">
            <Select selectedValue={service} minWidth="200" accessibilityLabel="♂ or ♀" placeholder="♂ or ♀"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                <Select.Item label="♂" value="Man" />
                <Select.Item label="♀" value="Woman" />
            </Select>
        </Box>
    </Center>;
};