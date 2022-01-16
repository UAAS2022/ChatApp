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
import { SC000_V00_BaseComponent } from './src/screens/SC000_BaseComponent/SC000_V00_BaseComponent'
import { SC000_Style } from "./src/screens/SC000_BaseComponent/SC000_Style"

export default function App() {
  return (
    <SafeAreaView>
      <SC000_V00_BaseComponent />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
