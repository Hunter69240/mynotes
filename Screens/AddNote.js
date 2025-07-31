import {React,useState} from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';


export default function AddNote({navigation }) {

  const [note, setNote] = useState('');

  const [fontsLoaded] = useFonts({
        'Inknut-Regular': require('../assets/fonts/InknutAntiqua-Regular.ttf'),
        'Inknut-ExtraBold': require('../assets/fonts/InknutAntiqua-ExtraBold.ttf'),
      });

  return (
    <View style={styles.container}>

      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" size={24} color="white" style={{ margin: 10 }} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.saveButton}>

            <Text style={styles.text}>Save</Text>

          </TouchableOpacity>
      </View>

      <View style={styles.line}/>
      
      
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginTop: hp('5%'),
    marginLeft: wp('5%'),
  },
  text:{
    color: 'white',
    textAlign: 'center',
    fontSize:15,
    fontFamily: 'Inknut-ExtraBold',
    
  },
  saveButton: {
    backgroundColor:'#6D67CA',
    marginRight: wp('5%'),
    borderRadius: 10,
    height: hp('5%'),
    width: wp('20%'),
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop: 17,
    
    width: '100%',
 },
});