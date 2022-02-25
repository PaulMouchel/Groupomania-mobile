import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile : FC = () => {
    return (
        <View style={styles.constainer}>
            <Text>Profile Screen</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})