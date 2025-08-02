import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';


export default function DateB(){

    const [fontsLoaded] = useFonts({
        'Inknut-Regular': require('../assets/fonts/InknutAntiqua-Regular.ttf'),
      });

    const date= new Date();

    const tdate=(date.getDate());
    const tmonth=(date.getMonth()+1);
    const tyear=date.getFullYear();
    const tday=(date.getDay());

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const tdayName = days[tday];
    const tmonthName = months[tmonth - 1];


    return (
        <View style={styles.container}>

            <View style={styles.datemonth}>
                <Text style={[styles.date,styles.font]}>{tdate}</Text>
                <Text style={[styles.date,styles.font]}>{tmonthName}</Text>
            </View>

            <View style={styles.monthyear}>
                <Text style={[styles.date,styles.font]}>{tdayName}</Text>
                <Text style={[styles.date,styles.font]}>{tmonthName}  {tyear}</Text>
            </View>

           <View style={styles.calender}>
                <Icon name="calendar" size={30} color="white" />
            </View>

            
        </View>

    )
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: '#3E3B3B',
        marginTop: hp('2%'),
        marginHorizontal: wp('5%'),
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
    },
    font:{
        fontFamily: 'Inknut-Regular',
        color: 'white',
        fontSize: 15,
    },
    date:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 35,
    },
    datemonth:{
        backgroundColor:'#FC9181',
        width: wp('25%'),
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%'),
        borderRadius: 30,
    },
    monthyear:{
        justifyContent: 'center',
        marginRight: wp('4%'),
    },
    calender: {
        backgroundColor: '#6D67CA',
        borderRadius: 20,                  
        padding: 10,                       
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', 
        marginRight: wp('5%'),     
    },

});