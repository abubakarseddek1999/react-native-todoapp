import { FlatList, Dimensions, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fallback from '../src/components/Fallback';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = () => {
    const { height: screenHeight } = Dimensions.get('window');
    const [text, setText] = useState('');
    console.log(text)
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [todoList, setTodoList] = useState([]);
    console.log(todoList)

    // Load data from AsyncStorage
    useEffect(() => {
        const LoadTodosFromStorage = async () => {
            try {
                const storedTodos = await AsyncStorage.getItem('todos');
                if (storedTodos) {
                    setTodoList(JSON.parse(storedTodos));
                }
            } catch (error) {
                console.error('Error loading todos from storage:', error);
            }
        };
        LoadTodosFromStorage();


    }, []); // Load data on component mount

    useEffect(() => {
        const SaveTodosToStorage = async () => {
            try {
                await AsyncStorage.setItem('todos', JSON.stringify(todoList));
            } catch (error) {
                console.error('Error saving todos to storage:', error);
            }
        };
        SaveTodosToStorage();
    }, [todoList]); // Save whenever todoList changes



    // Handle Add Todo
    const handleAddTodo = () => {
        if (text.trim() === '') {
            alert('Please enter Your task');
            return;
        }

        if (editingTodoId) {
            // Update existing todo
            const updatedTodos = todoList.map(todo =>
                todo.id === editingTodoId ? { ...todo, text } : todo
            );
            setTodoList(updatedTodos);
            setEditingTodoId(null); // Clear editing state
        } else {
            // Add new todo
            setTodoList([...todoList, { id: Date.now().toString(), text }]);
        }

        setText(''); // Clear input
    };

    // Handle Delete Todo
    const handleDeleteTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id));

    }

    // render todos
    const renderTodos = ({ item, index }) => {
        return (
            <View style={styles.todoItem}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.text}</Text>

                {/* edit button and delete button */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, }}>
                    <TouchableOpacity style={styles.editButton}
                        onPress={() => {
                            setText(item.text);
                            setEditingTodoId(item.id);
                        }}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteTodo(item.id)} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>📝 Your Todo List</Text>

            {/* input */}
            <TextInput
                style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10
                }}

                placeholder="Enter your task here"
                value={text}
                onChangeText={(text) => setText(text)}
            />
            {/* add button */}
            <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
                <Text style={styles.addButtonText}>
                    {editingTodoId ? 'Update' : 'Add'}
                </Text>
            </TouchableOpacity>
            {/* Dynamic height: screenHeight - 100 */}

            <View style={{ height: screenHeight - 180 }}>
                {todoList.length > 0 ? (
                    <FlatList
                        data={todoList}
                        renderItem={renderTodos}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                ) : <Fallback />}
            </View>

        </View>
    )
}

export default TodoScreen

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#27ae60',
        borderRadius: 10,
        marginVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
    },
    todoItem: {
        backgroundColor: '#fff',
        padding: 15,
        gap: 10,
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 5,
      }
    ,
    editButton: {
        backgroundColor: '#3498db',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
})