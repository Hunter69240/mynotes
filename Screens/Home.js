// Import necessary React and React Native hooks/components
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// Import custom Card component to display each note
import Card from '../components/Card';

// Import responsive width utility for font sizing
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Import Constants to access environment variables
import Constants from 'expo-constants';

// Read the API URL from environment config (defined in app.config.js or app.json)
export const API_URL = Constants.expoConfig?.extra?.API_URL;

// Main functional component
export default function Home() {
  // State for title and content input fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // State to hold list of all notes
  const [notes, setNotes] = useState([]);

  // Format today’s date in a human-readable string (e.g., Tuesday, 5 August 2025)
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Fetch all notes from the backend API
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/notes`);
      const data = await res.json();
      setNotes(data); // Update notes state
    } catch (err) {
      console.log('Error fetching notes:', err);
    }
  };

  // Add a new note to the backend
  const addNote = async () => {
    // Don't add if title or content is empty
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const newNote = await res.json();

      // Add new note to the top of the list
      setNotes((prev) => [newNote, ...prev]);

      // Clear input fields
      setTitle('');
      setContent('');
    } catch (err) {
      console.log('Error adding note:', err);
    }
  };

  // Delete a note by ID
  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'DELETE',
      });

      // Remove the deleted note from state
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.log('Error deleting note:', err);
    }
  };

  // Update a note's title and content
  const updateNote = async (id, updatedTitle, updatedContent) => {
    try {
      const res = await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
      });

      const updatedNote = await res.json();

      // Update the specific note in the state
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedNote : note))
      );
    } catch (err) {
      console.log('Error updating note:', err);
    }
  };

  // Fetch notes only once when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    // Adjust UI to avoid keyboard overlapping on iOS
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ScrollView allows vertical scrolling for all content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header section with app title and date */}
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: wp('7%'),
              fontFamily: 'Inknut-Bold',
              color: 'white',
            }}
          >
            My Notes
          </Text>
          <Text
            style={{
              fontSize: wp('4%'),
              fontFamily: 'Inknut-Regular',
              color: '#aaa',
              marginTop: 5,
            }}
          >
            {today}
          </Text>
        </View>

        {/* Input fields for creating a new note */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          {/* Title input */}
          <TextInput
            placeholder="Title"
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
            style={{
              backgroundColor: '#1e1e1e',
              color: 'white',
              fontFamily: 'Inknut-Regular',
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />

          {/* Content input (multiline) */}
          <TextInput
            placeholder="Content"
            placeholderTextColor="#aaa"
            value={content}
            onChangeText={setContent}
            multiline
            style={{
              backgroundColor: '#1e1e1e',
              color: 'white',
              fontFamily: 'Inknut-Regular',
              padding: 10,
              borderRadius: 10,
              height: 100,
              textAlignVertical: 'top',
              marginBottom: 10,
            }}
          />

          {/* Add Note button */}
          <TouchableOpacity
            onPress={addNote}
            style={{
              backgroundColor: '#6200ee',
              padding: 12,
              borderRadius: 10,
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inknut-Bold',
                fontSize: wp('4%'),
              }}
            >
              Add Note
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display list of notes using FlatList (scroll disabled because it's inside ScrollView) */}
        <FlatList
          data={notes}
          keyExtractor={(item) => item._id} // Unique key for each note
          renderItem={({ item }) => (
            <Card
              note={item}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          scrollEnabled={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
