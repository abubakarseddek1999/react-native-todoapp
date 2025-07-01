import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const TodoListHeader = ({ text, setText, editingTodoId, handleAddTodo }) => {
    return (
        <View>
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
        </View>
    )
}

export default TodoListHeader

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
})