import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';

export default function Header({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Inknut-Regular': require('../assets/fonts/InknutAntiqua-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../Images/Logo.png')} style={styles.image} />
        <Text style={styles.text}>MY NOTES</Text>
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
});
