import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Card({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const navigation = useNavigation();

  const handleUpdate = () => {
    if (!editedTitle.trim() || !editedContent.trim()) return;
    onUpdate(note._id, editedTitle, editedContent);
    setIsEditing(false);
  };

  const handleCardPress = () => {
    if (!isEditing) {
      navigation.navigate('CardDisplay', {
        title: note.title,
        content: note.content,
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#1e1e1e',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
      }}
    >
      {isEditing ? (
        <>
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            style={{
              color: 'white',
              fontFamily: 'Inknut-Bold',
              fontSize: 16,
              marginBottom: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#aaa',
              paddingBottom: 4,
            }}
          />
          <TextInput
            value={editedContent}
            onChangeText={setEditedContent}
            multiline
            style={{
              color: 'white',
              fontFamily: 'Inknut-Regular',
              fontSize: 14,
              marginBottom: 12,
              textAlignVertical: 'top',
              height: 80,
              borderWidth: 1,
              borderColor: '#444',
              padding: 8,
              borderRadius: 6,
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={handleUpdate}
              style={{
                backgroundColor: '#4caf50',
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: 'white', fontFamily: 'Inknut-Bold' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(false)}
              style={{
                backgroundColor: '#777',
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: 'white', fontFamily: 'Inknut-Bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity activeOpacity={0.9} onPress={handleCardPress}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Inknut-Bold',
              fontSize: 16,
              marginBottom: 6,
            }}
          >
            {note.title}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Inknut-Regular',
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            {note.content.length > 100 ? note.content.slice(0, 100) + '...' : note.content}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => onDelete(note._id)}
              style={{
                backgroundColor: '#e53935',
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: 'white', fontFamily: 'Inknut-Bold' }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={{
                backgroundColor: '#03a9f4',
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: 'white', fontFamily: 'Inknut-Bold' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
