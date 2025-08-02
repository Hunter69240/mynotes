import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import axios from 'axios';

export default function AddNote({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [fontsLoaded] = useFonts({
    'Inknut-Regular': require('../assets/fonts/InknutAntiqua-Regular.ttf'),
    'Inknut-ExtraBold': require('../assets/fonts/InknutAntiqua-ExtraBold.ttf'),
  });

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      alert('Please enter a title or content');
      return;
    }

    try {
      const res = await axios.post('http://192.168.0.119:5000/api/notes', {
        title,
        content,
      });

      console.log('Note saved:', res.data);
      alert('Note saved successfully!');
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error saving note:', err);
      alert('Failed to save note');
    }
  };

  if (!fontsLoaded) {
    return null; // or some loading screen
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left" size={24} color="white" style={{ margin: 10 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.titleinput}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
          placeholderTextColor="#FFFFFF80"
        />

        <TextInput
          style={styles.descinput}
          onChangeText={setContent}
          value={content}
          placeholder="What's on your mind?"
          placeholderTextColor="#FFFFFF80"
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginTop: hp('5%'),
    marginLeft: wp('5%'),
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Inknut-ExtraBold',
  },
  saveButton: {
    backgroundColor: '#6D67CA',
    marginRight: wp('5%'),
    borderRadius: 10,
    height: hp('5%'),
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop: 17,
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp('6%'),
    backgroundColor: 'black',
    paddingBottom: hp('2%'),
  },
  titleinput: {
    height: hp('7%'),
    width: wp('90%'),
    backgroundColor: '#1D1B1B',
    borderRadius: 10,
    marginLeft: wp('5%'),
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Inknut-Regular',
    marginTop: hp('2%'),
    color: 'white',
  },
  descinput: {
    height: hp('20%'),
    width: wp('90%'),
    backgroundColor: '#1D1B1B',
    borderRadius: 10,
    marginLeft: wp('5%'),
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Inknut-Regular',
    marginTop: hp('10%'),
    color: 'white',
    textAlignVertical: 'top',
  },
});
