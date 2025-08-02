import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function CardDisplay() {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, content } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: '#00bcd4', fontSize: 16, marginBottom: 10,marginTop:hp('4%') }}>← Back</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Inknut-Bold',
            fontSize: 22,
            marginBottom: 15,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: 'white',
            fontFamily: 'Inknut-Regular',
            fontSize: 16,
            lineHeight: 26,
          }}
        >
          {content}
        </Text>
      </ScrollView>
    </View>
  );
}
