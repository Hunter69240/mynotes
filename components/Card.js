// Import required dependencies and hooks
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // to navigate to another screen

// Reusable Card component for each note
export default function Card({ note, onDelete, onUpdate }) {
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold edited input fields
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  // Navigation hook from React Navigation
  const navigation = useNavigation();

  // Handle saving the updated note
  const handleUpdate = () => {
    if (!editedTitle.trim() || !editedContent.trim()) return;

    onUpdate(note._id, editedTitle, editedContent); // Call update function
    setIsEditing(false); // Exit edit mode
  };

  // Navigate to CardDisplay screen with note data
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
      {/* If the note is in edit mode */}
      {isEditing ? (
        <>
          {/* Title input */}
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

          {/* Content input (multiline) */}
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

          {/* Save and Cancel buttons */}
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
              onPress={() => setIsEditing(false)} // Cancel editing
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
        // If not editing, show note content and action buttons
        <TouchableOpacity activeOpacity={0.9} onPress={handleCardPress}>
          {/* Display note title */}
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

          {/* Display note content (trimmed if long) */}
          <Text
            style={{
              color: 'white',
              fontFamily: 'Inknut-Regular',
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            {note.content.length > 100
              ? note.content.slice(0, 100) + '...'
              : note.content}
          </Text>

          {/* Delete and Edit buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => onDelete(note._id)} // Call delete function
              style={{
                backgroundColor: '#e53935',
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: 'white', fontFamily: 'Inknut-Bold' }}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsEditing(true)} // Switch to edit mode
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
