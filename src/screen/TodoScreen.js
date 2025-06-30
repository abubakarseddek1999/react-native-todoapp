import { FlatList,Dimensions, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const TodoScreen = () => {
    const { height: screenHeight } = Dimensions.get('window');
    const [todos, setTodos] = useState([
        { id: '1', text: 'Learn React Native Learn React Native Learn React Native Learn React Native Learn React Native' },
        { id: '2', text: 'Build a Todo App Learn React Native Learn React Natives Learn React Native Learn React Native Learn React Native ' },
        { id: '3', text: 'Create a UI Learn React Native Learn React Native Learn React Native Learn React Native Learn React Native' },
        { id: '4', text: 'Learn Redux Learn React Native' },
        { id: '5', text: 'Learn Firebase Learn React Native Learn React Native' },
    ])
    const renderTodos = ({ item, index }) => {
        return (
            <View style={styles.todoItem}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.text}</Text>

                {/* edit button and delete button */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, }}>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
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
            />
            {/* add button */}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            {/* Dynamic height: screenHeight - 100 */}
            <View style={{ height: screenHeight - 180 }}>
                <FlatList
                    data={todos}
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
        elevation: 2,
        padding: 10,
        shadowOpacity: 0.2,
        borderRadius: 10,
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