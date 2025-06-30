import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Fallback = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/todo.png')} style={{ width: 200, height: 200 }} />
            {/* <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>No Todos Available</Text> */}
            <Text>Start Adding Your Task</Text>
        </View>
    )
}

export default Fallback

const styles = StyleSheet.create({})