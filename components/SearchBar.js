import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SearchBar(){
    return (
        <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Icon name="search" size={24} color="white"/>
                    <Text style={styles.text}>Search Your Thoughts</Text>
                </TouchableOpacity>
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'black',    
        marginTop: hp('2%'),
        marginHorizontal: wp('5%'),
       
    },
    text:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    button: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',  
    }
});