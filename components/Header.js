import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';

export default function Header({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Inknut-Regular': require('../assets/fonts/InknutAntiqua-Regular.ttf'),
  });

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../Images/Logo.png')} style={styles.image} />
        <Text style={styles.text}>MY NOTES</Text>
      </View>

      <View style={styles.Add}>

      <Text style={styles.plus}>+</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: hp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
  },
  image: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: wp('6%'),
    fontFamily: 'Inknut-Regular',
    marginLeft: wp('4%'),
  },
  Add:{
    position: 'absolute',
    right: wp('4%'),
    top: hp('5%'),
    backgroundColor: '#6D67CA',
    width: wp('11%'),
    height: wp('10%'),
    borderRadius: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus:{
    color: 'black',
    fontSize: wp('6%'),
    fontFamily: 'Inknut-Regular',
    fontWeight: 'bold',
    lineHeight: wp('10%'),
  }
});
