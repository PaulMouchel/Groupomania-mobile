import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    onPress: () => void
}

const Link : FC<Props> = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            { children }
        </TouchableOpacity>
    )
}

export default Link

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
    }
})