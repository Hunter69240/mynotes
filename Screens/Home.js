import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Header from '../components/Header';
export default function Home({ navigation }) {
    return (
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Header />
        </ScrollView>
        
    )
  
}

const styles = StyleSheet.create({
 container:{
    flex:1
 }
});
