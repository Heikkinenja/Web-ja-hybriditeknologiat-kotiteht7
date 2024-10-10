import React, { useReducer, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: Date.now(), task: action.payload }];
        case 'REMOVE_TASK':
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
};

const simpletodo = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task.trim()) {
            dispatch({ type: 'ADD_TASK', payload: task });
            setTask('');
        }
    };

    const removeTask = (id) => {
        dispatch({ type: 'REMOVE_TASK', payload: id });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>My Todo List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a new task"
                    value={task}
                    onChangeText={setTask}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.addButton} onPress={addTask}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={state}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => removeTask(item.id)} style={styles.taskContainer}>
                        <Text style={styles.task}>{item.task}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FF69B4', // Pink color for the title text
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Adds a shadow for iOS
        shadowRadius: 5,
    },
    addButton: {
        backgroundColor: '#FF69B4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Adds a shadow for iOS
        shadowRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskContainer: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Adds a shadow for iOS
        shadowRadius: 5,
    },
    task: {
        fontSize: 18,
    },
});

export default simpletodo;

