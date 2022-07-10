import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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
import { NativeBaseProvider } from "native-base"
import { SC000_V00_BaseComponent } from './src/screens/SC000_BaseComponent/SC000_V00_BaseComponent'
import { AdsConsent } from 'react-native-google-mobile-ads';
import { AdsConsentStatus } from 'react-native-google-mobile-ads';
import { AdsConsentDebugGeography } from 'react-native-google-mobile-ads';

export default function App() {

  // トラッキング可否を保持する。これをContextなどに持たせて他の画面でも利用する
  // ※ trueでトラッキングしない。falseでトラッキングする
  // const [nonPersonalizedOnly, setNonPersonalizedOnly] = useState(true);

  // useEffect(() => {
  //   // ATTとGDPRの同意状態を取得
  //   AdsConsent.requestInfoUpdate({
  //     testDeviceIdentifiers: ["TEST-DEVICE-HASHED-ID"],
  //   }).then(async (consentInfo) => {
  //     let status = consentInfo.status;
  //     if (
  //       consentInfo.isConsentFormAvailable &&
  //       status === AdsConsentStatus.REQUIRED
  //     ) {
  //       // 同意状態が必要な場合はダイアログを表示する
  //       const result = await AdsConsent.showForm();
  //       status = result.status;
  //     }

  //     if (
  //       consentInfo.status === AdsConsentStatus.OBTAINED ||
  //       status === AdsConsentStatus.OBTAINED
  //     ) {
  //       // 同意が取得できた場合はNonPersonalizedOnlyをfalseにする(トラッキング取得する)
  //       setNonPersonalizedOnly(false);
  //     }
  //   });
  // }, []);
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <SC000_V00_BaseComponent />
      </SafeAreaView>
    </NativeBaseProvider>

  );
}

// export default function App() {
//   return (
//     <NativeBaseProvider>
//       <SafeAreaView>
//         <SC000_V00_BaseComponent />
//       </SafeAreaView>
//     </NativeBaseProvider>

//   );
// }