import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const Home : FC = () => {
    return (
        <View style={styles.constainer}>
            <Text>Home Screen</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})