import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { useLayoutEffect } from 'react';


const AddTaskScreen = ({ navigation, route }) => {
  const existingTodo = route.params?.todo;

  const [text, setText] = useState(existingTodo?.text || '');
  const [description, setDescription] = useState(existingTodo?.description || '');
  const [priority, setPriority] = useState(existingTodo?.priority || 'Normal');
  const [todoList, setTodoList] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: existingTodo ? 'Update Task' : 'Add Task',
    });
  }, [navigation, existingTodo]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem('todos');
        if (stored) {
          setTodoList(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (text.trim() === '') {
      alert('Please enter your task');
      return;
    }

    const date = new Date();
    const formattedDate = format(date, 'dd MMMM yyyy');
    const formattedTime = format(date, 'hh:mm a');

    let updatedTodos;

    if (existingTodo) {
      updatedTodos = todoList.map(todo =>
        todo.id === existingTodo.id
          ? { ...todo, text, description, priority, date: formattedDate, time: formattedTime }
          : todo
      );
    } else {
      const newTodo = {
        id: Date.now().toString(),
        text,
        description,
        priority,
        date: formattedDate,
        time: formattedTime,
      };
      updatedTodos = [...todoList, newTodo];
    }

    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      Keyboard.dismiss();
      navigation.goBack();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write your task..."
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <TextInput
        placeholder="Write description..."
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <Text style={styles.label}>Priority:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Normal" value="Normal" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>
          {existingTodo ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden', // For rounded corners on Android
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
