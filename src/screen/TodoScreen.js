import { FlatList, Dimensions, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const TodoScreen = () => {
    const { height: screenHeight } = Dimensions.get('window');
    const [text, setText] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [todos, setTodos] = useState([
        { id: '1', text: 'Learn React Native Learn React Native Learn React Native Learn React Native Learn React Native' },
        { id: '2', text: 'Build a Todo App Learn React Native Learn React Natives Learn React Native Learn React Native Learn React Native ' },
        { id: '3', text: 'Create a UI Learn React Native Learn React Native Learn React Native Learn React Native Learn React Native' },
        { id: '4', text: 'Learn Redux Learn React Native' },
        { id: '5', text: 'Learn Firebase Learn React Native Learn React Native' },
    ])
    // Handle Add Todo
    const handleAddTodo = () => {
        // structure of a single todo item
        // {
        //     id:
        //     title:

        // }
        if (text.trim() === '') {
            alert('Please enter a todo');
            return;
        }
        setTodoList([...todoList, {id:Date.now().toString(), text: text}]);
        setText(''); // clear the input field after adding the todo

    }
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
                    <TouchableOpacity style={styles.editButton}>
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

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>📝 Todo List</Text>

            {/* input */}
            <TextInput
                style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10
                }}

                placeholder="Enter your todo"
                value={text}
                onChangeText={(text) => setText(text)}
            />
            {/* add button */}
            <TouchableOpacity onPress={() => handleAddTodo()} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            {/* Dynamic height: screenHeight - 100 */}
            <View style={{ height: screenHeight - 180 }}>
                <FlatList
                    data={todoList}
                    renderItem={renderTodos}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
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
    }
    ,
    addButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
    }
    ,
    todoItem: {
        flexDirection: 'column',
        gap: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        elevation: 5,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 2,
        marginVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
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