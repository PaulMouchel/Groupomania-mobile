import React, { FC } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Profile } from "../screens";

export type AppStackParams = {
    home: undefined;
    profile: {
        id: number
    };
}

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>()

const AppStack : FC = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home} />
            <Screen name="profile" component={Profile} />
        </Navigator>
    )
}

export default AppStack