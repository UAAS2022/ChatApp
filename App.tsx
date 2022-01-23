import { StatusBar } from 'expo-status-bar';
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

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <SC000_V00_BaseComponent />
      </SafeAreaView>
    </NativeBaseProvider>

  );
}