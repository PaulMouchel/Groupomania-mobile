import React, { FC } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Profile } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator()

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home} />
            <Screen name="profile" component={Profile} />
        </Navigator>
    )
}

export default AppStack