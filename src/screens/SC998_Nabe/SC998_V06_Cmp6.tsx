import React from "react"
import { Center,VStack,Button, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn,View,StyleSheet,Pressable,Image,Text,Alert} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_Style } from './SC998_Style'

export const SC998_V06_Cmp6 = () => {  
      return (
      <>
      <View style={SC998_Style.v00_btnpozi2}>
          <Button size="md" variant="outline" style={SC998_Style.v00_glasspozi2}  >
              🔎
          </Button>
       </View>
      </>
      // </Stack>
      )
                  };