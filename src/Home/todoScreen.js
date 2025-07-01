import { FlatList, Dimensions, StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const TodoScreen = () => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [todoList, setTodoList] = useState([]);

    // Load data from AsyncStorage when screen focused
    useEffect(() => {
        const loadTodosFromStorage = async () => {
            try {
                const storedTodos = await AsyncStorage.getItem('todos');
                if (storedTodos) {
                    setTodoList(JSON.parse(storedTodos));
                }
            } catch (error) {
                console.error('Error loading todos from storage:', error);
            }
        };
        loadTodosFromStorage();
    }, [isFocused]);

    // Save data to AsyncStorage whenever todoList changes
    useEffect(() => {
        const saveTodosToStorage = async () => {
            try {
                await AsyncStorage.setItem('todos', JSON.stringify(todoList));
            } catch (error) {
                console.error('Error saving todos to storage:', error);
            }
        };
        saveTodosToStorage();
    }, [todoList]);

    // Delete Todo
    const handleDeleteTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    }

    // Render each todo item
    const renderTodos = ({ item }) => (
        <View style={styles.todoItem}>
            <Text style={styles.title}>{item.text}</Text>
            {item.description ? (
                <Text style={styles.description}>{item.description}</Text>
            ) : null}
            {item.priority ? (
                <Text style={styles.priority}>Priority: {item.priority}</Text>
            ) : null}

            <View style={styles.todoFooter}>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('AddTask', { todo: item })}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteTodo(item.id)}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dateGroup}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.dateText}>{item.time}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={[...todoList].reverse()}
                keyExtractor={(item) => item.id}
                renderItem={renderTodos}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Text style={{ fontSize: 30, color: '#fff' }}>＋</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    todoItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 5,
        paddingHorizontal: 10,
        marginHorizontal: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    priority: {
        fontSize: 12,
        color: '#e67e22',
        marginTop: 4,
        fontWeight: 'bold',
    },
    todoFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10,
    },
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
    dateGroup: {
        alignItems: 'flex-end',
    },
    dateText: {
        fontSize: 11,
        color: 'gray',
    },
    fab: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#27ae60',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
});
