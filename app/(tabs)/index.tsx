import { StyleSheet } from 'react-native';

import LoginScreen from '@/src/Screens/LoginScreen';

export default function TabOneScreen() {
  return ( <LoginScreen /> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
