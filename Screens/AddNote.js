import {React,useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
export default function AddNote({navigation }) {
  const [note, setNote] = useState('');

  return (
    <View >
      <Text>Note page</Text>
      <Button title="Home Page" onPress={()=>navigation.navigate('Home')}></Button>
    
    </View>
  );
}