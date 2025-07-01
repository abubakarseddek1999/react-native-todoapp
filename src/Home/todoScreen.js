import { FlatList, Dimensions, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fallback from '../components/Fallback';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoListHeader from '../components/todoListHeader/todoListHeader';
import { format } from 'date-fns';

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
        const date = new Date();
        const formattedDate = format(date, "dd MMMM yyyy");   // 👉 01 July 2025
        const formattedTime = format(date, "hh:mm a");        // 👉 04:17 PM
        if (editingTodoId) {
            // Update existing todo
            const updatedTodos = todoList.map(todo =>
                todo.id === editingTodoId ? { ...todo, text, date: formattedDate, time: formattedTime } : todo
            );
            setTodoList(updatedTodos);
            setEditingTodoId(null); // Clear editing state
        } else {
            // Add new todo
            setTodoList([...todoList, { id: Date.now().toString(), text, date: formattedDate, time: formattedTime }]);
        }

        setText(''); // Clear input
        // ছোট delay দিয়ে কীবোর্ড বন্ধ করুন (state update এর পর)
        setTimeout(() => {
            Keyboard.dismiss();
        }, 100);
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5}}>
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
                    
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, color: 'gray' }}>{item.date}</Text>
                        <Text style={{ fontSize: 11, color: 'gray' }}>{item.time}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
            <FlatList
                data={[...todoList].reverse()}
                keyExtractor={(item) => item.id}
                renderItem={renderTodos}
                ListHeaderComponent={
                    <>
                        <TodoListHeader text={text} setText={setText} editingTodoId={editingTodoId} handleAddTodo={handleAddTodo} />
                    </>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

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
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
})