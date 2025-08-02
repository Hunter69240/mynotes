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
import Card from '../components/Card';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';


export const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.log('Error fetching notes:', err);
    }
  };

  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const newNote = await res.json();
      setNotes((prev) => [newNote, ...prev]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.log('Error adding note:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.log('Error deleting note:', err);
    }
  };

  const updateNote = async (id, updatedTitle, updatedContent) => {
    try {
      const res = await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
      });
      const updatedNote = await res.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedNote : note))
      );
    } catch (err) {
      console.log('Error updating note:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
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

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
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

        <FlatList
          data={notes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card note={item} onDelete={deleteNote} onUpdate={updateNote} />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          scrollEnabled={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
