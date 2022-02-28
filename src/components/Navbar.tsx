// import { useRouter } from "next/router"
import { FC, useState, useEffect } from "react"

// import Image from 'next/image'
// import icon from '../public/images/logos/icon-left-font-monochrome-white.svg'
// import FaSolidHome from './icons/FaSolidHome'
// import Link from 'next/link'
// import Avatar from '@mui/material/Avatar'
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
// import { useCurrentUser } from './context/context'
import { Text, View, StyleSheet } from "react-native"
import { Icon, Avatar } from 'react-native-elements';
import { useCurrentUser } from "./context/context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../navigation/appStack";

const Navbar: FC = () => {

    const context = useCurrentUser()
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>()
    
    // useEffect(() => {
    //     const currentUserStr = localStorage.getItem("user")
    //     if (currentUserStr) {
    //         const currentUser = JSON.parse(currentUserStr)
    //         context?.setCurrentUser(currentUser)
    //     } else {
    //         router.push("/login")
    //     } 
    // }, [])



    const handleLogout = ():void => {
    //     localStorage.clear()
        context?.setCurrentUser(null)
    //     router.push("/login")
    }

    const goToUserPage = (id:number):void => {
        navigation.navigate('profile', { id })
    }

    return (
        <View style={styles.navbar}>
            <Icon
            name='home'
            type='font-awesome'
            color='#fff'
            size={34}
            onPress={() => navigation.navigate('home')} />

            { context?.currentUser ?
                context.currentUser.imageUrl ? 
                    <Avatar 
                    size={64} 
                    rounded 
                    source={{ uri: context.currentUser.imageUrl}} /> 
                : 
                    <Icon
                    name='user-circle'
                    type='font-awesome'
                    color='#fff'
                    size={34}
                    onPress={() => goToUserPage(context?.currentUser?.id || 1)} />
            :
                <></>
            }

            <Icon
            name='power-off'
            type='font-awesome'
            color='#fff'
            size={34}
            onPress={handleLogout} />            
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#122441',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75,
        flexDirection: "row"

        // padding: 1rem;
        // position: fixed;
        // width: 100%;
        // z-index: 1000;

        // width: width, 
        // height: height,
        // borderRadius: 99
    },
})