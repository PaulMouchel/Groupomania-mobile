import React, { FC, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./appStack";
import AuthStack from "./authstack";
import { useCurrentUser } from '../components/context/context'

const MainNav : FC = () => {
    const [ user, setUser ] = useState(null)
    const context = useCurrentUser()

    console.log(context)
    
    return (
        <NavigationContainer>
            { context?.currentUser ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}

export default MainNav