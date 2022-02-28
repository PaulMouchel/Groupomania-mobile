import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppStackParams } from "../navigation/appStack";

type Props = NativeStackScreenProps<AppStackParams, 'profile'>

const Profile : FC<Props> = ({ route }) => {
    return (
        <View style={styles.container}>
            <Text>Profile Screen {route.params.id}</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})