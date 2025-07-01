import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const TodoListHeader = ({ text, setText, editingTodoId, handleAddTodo }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            {/* input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        isFocused && { borderColor: '#27ae60', borderWidth: 2 } // Focus হলে সবুজ highlight
                    ]}
                    placeholder={editingTodoId ? 'Edit your task...' : 'Write your task here...'}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {text.length > 0 && (
                    <TouchableOpacity onPress={() => setText('')} style={styles.clearButton}>
                        <Text style={{ fontSize: 20, color: '#999' }}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    }
    ,
    inputContainer: {
        position: 'relative',
        marginBottom: 0,
    },
    clearButton: {
        position: 'absolute',
        right: 15,
        top: 10,
    },

})