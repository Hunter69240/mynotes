import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';


import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DateB from '../components/DateB';
import CreateNote from '../components/CreateNote';


export default function Home({ navigation }) {

    const [fontsLoaded] = useFonts({
        'Inknut-Regular': require('../assets/fonts/InknutAntiqua-Regular.ttf'),
        'Inknut-ExtraBold': require('../assets/fonts/InknutAntiqua-ExtraBold.ttf'),
      });


    return (
         <ScrollView contentContainerStyle={{ flexGrow: 1,backgroundColor: 'black' }}>
            <View style={styles.container}>
                <Header navigation={navigation}/>
                <SearchBar style={styles.searchbar}/>

                <View style={styles.line}/>

                <DateB />

                <View style={styles.centerimage}>

                    <Image
                    source={require('../Images/CenterImage.png')}
                    style={styles.image}
                    />

                </View>

                <View style={styles.centertext}>
                    <Text style={styles.maintxt}>Start Your Journey</Text>

                    <Text style={styles.txt}>Capture your thoughts, ideas, and inspirations in beautiful notes.</Text>
                </View>
                
                <CreateNote navigation={navigation} />
            </View>
        </ScrollView>
        
    )
  
}

const styles = StyleSheet.create({
 container:{
    flexDirection: 'column',
 },
 line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop: 10,
    
    width: '100%',
 },
 centerimage:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp,
 },
 image:{
    resizeMode: 'cover', 
    marginTop: hp('7%'), 
 },
 centertext:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
    paddingHorizontal: wp('5%'),
 },
 maintxt:{
    color: 'white',
    fontSize: wp('5%'),
    fontFamily: 'Inknut-ExtraBold',
 },
 txt:{
    color: 'white',
    fontFamily: 'Inknut-Regular',
    textAlign: 'center',
    marginTop: hp('2%'),
    opacity: 0.7,
 },
 
});
