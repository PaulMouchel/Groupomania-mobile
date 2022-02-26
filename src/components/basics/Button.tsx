import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

const { height, width } = Dimensions.get('screen')

interface Props {
    title: string
    onPress: () => void
}

const Button : FC<Props> = ({title, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{ title }</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: '#d1515a',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        width: width / 1.1,
        marginVertical: 10
    },
    text: {
        color: '#FFF'
    }
})