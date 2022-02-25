import { FC } from "react"
import {Image, StyleSheet } from "react-native";
import UserType from '../../types/UserType'

interface IAvatar {
    user: UserType,
    width?: number, 
    height?: number
}

const Avatar: FC<IAvatar> = ({ user, width=56, height=56 }) => {

    const styles = StyleSheet.create({
        avatar: {
            width: width, 
            height: height,
            borderRadius: 99
        },
    })

    return (
        <Image style={styles.avatar} source={{ uri: user.imageUrl }}/>     
    )
}

export default Avatar



