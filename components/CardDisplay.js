// Import necessary dependencies
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

// Navigation hooks to access navigation and route parameters
import { useNavigation, useRoute } from '@react-navigation/native';

// Responsive design helpers
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Component to display the full note details
export default function CardDisplay() {
  // Get navigation object to go back
  const navigation = useNavigation();

  // Get route object to access the passed parameters (note title and content)
  const route = useRoute();
  const { title, content } = route.params;

  return (
    // Root container with dark background and padding
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
      
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          style={{
            color: '#00bcd4',
            fontSize: 16,
            marginBottom: 10,
            marginTop: hp('4%'),
          }}
        >
          ← Back
        </Text>
      </TouchableOpacity>

      {/* Scrollable content area */}
      <ScrollView>
        {/* Note title */}
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

        {/* Full note content */}
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
