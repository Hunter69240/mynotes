import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreateNote({navigation}){

    const [fontsLoaded] = useFonts({
            'Inknut-Regular': require('../assets/fonts/InknutAntiqua-Regular.ttf'),
            'Inknut-ExtraBold': require('../assets/fonts/InknutAntiqua-ExtraBold.ttf'),
          });


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddNote')}>
                <View style={styles.buttonContent}>
                    <Icon name="plus" size={24} color="white" style={styles.icon}/>
                    <Text style={styles.buttonText}>Create Your First Note</Text>
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginTop: hp('4%'),
    },
    button: {
        backgroundColor: '#6B71D7',
        borderRadius: 20,
        padding:3,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: wp('4%'),
        fontFamily: 'Inknut-ExtraBold',
        paddingHorizontal: wp('5%'),
    },
    buttonContent:{
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    icon:{
        marginLeft: wp('2%'),
    }
   
});