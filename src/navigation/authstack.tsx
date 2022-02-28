import React, { FC } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignUp, Login } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator()

const AuthStack : FC = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='login'>
            <Screen name="login" component={Login} />
            <Screen name="signup" component={SignUp} />
        </Navigator>
    )
}

export default AuthStack