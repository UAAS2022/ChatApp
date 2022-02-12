import React from "react"
import { Button, Modal, HStack,VStack,Box, NativeBaseProvider } from "native-base"
import {
    Button as SimpleBtn,View,StyleSheet,Pressable,Image,Text,Alert} from 'react-native';
import { CC0010_ScreenTitle } from '../SC000_BaseComponent/SC000_V02_ScreenTitle'
import { SC998_Style } from './SC998_Style'

export function SC998_V05_Cmp5 () {
        return <View style={styles.container}>
            <View style={styles.topContainer}>
            <Image source={
                  require("../../static/img/aizen.jpeg")
                } style={styles.avatar} />
              <View style={styles.metaContainer}>
                <View>
                  <Text style={styles.timings}>Today @ 9PM</Text>
                  <Text style={styles.description}>あまり強い言葉を遣うなよ。</Text>
                </View>
                <Button size = "sm" variant ="outline" style={styles.button}
                        onPress={() => Alert.alert('一体いつから鏡花水月を遣っていないと錯覚していた？')}
                                    >
                <Text style={styles.buttonText}>鏡花水月</Text> 
                </Button>
                {/* <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Remind me</Text>
                </Pressable> */}
              </View>

            </View>
          </View>;
      }
      
      const styles = StyleSheet.create({
        container: {
          backgroundColor: '#0891b2',
          paddingVertical: 16,
          paddingHorizontal: 12,
          borderRadius: 5,
          alignSelf: 'center',
          width: 375,
          maxWidth: '100%'
        },
        timings: {
          color: '#fff',
        //   fontSize: '14px'
        },
        metaContainer: {
          justifyContent: 'space-between'
        },
        topContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between'
        },
        avatar: {
          height: 100,
          width: 100,
          borderRadius: 100
        },
        description: {
          color: 'white',
          marginTop: 5,
          fontSize: 20
        },
        button: {
          backgroundColor: '#22d3ee',
          alignSelf: 'flex-start',
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 2
        },
        buttonText: {
          fontWeight: 'bold',
          color: 'white',
          textTransform: 'uppercase',
          fontSize: 14
        }
      });