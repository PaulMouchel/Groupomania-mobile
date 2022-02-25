import React, { FC } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";

const { height, width } = Dimensions.get('screen')

interface Props {
    placeholder: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
}

const TextArea : FC<Props> = ({placeholder, onChangeText, secureTextEntry=false}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChangeText} />
        </View>
    )
}

export default TextArea

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginVertical: 10
    },
    input: {
        padding: 15
    }
})