import React, { FC, useState } from "react";
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Input, Button } from "../components/basics";
import { useCurrentUser } from '../components/context/context'
import api from '../api/axios'
import icon from '../../public/images/icon-left-font-monochrome-black.png';

const { height, width } = Dimensions.get('screen')

type RootStackParamList = {

    Pdp: undefined; //current screen
 
    // PdpComments: {slug: string}; // a screen that we are 
 // navigating to, in the current screen,
 // that we should pass a prop named `slug` to it
 
    // Sellers: {data: Array<string>};
 
    signup: undefined; // a screen that we are navigating to 
 // in the current screen, that we don't pass any props to it
 home: undefined
 };

 interface IPdpPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Pdp'>;
 }


const Login : FC<IPdpPageProps> = ({ navigation }) => {
    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ emailError, setEmailError ] = useState<boolean>(false)
    const [ emailHelper, setEmailHelper ] = useState<string>("")
    const [ error, setError ] = useState<string>("")
    const context = useCurrentUser()

    const isValidEmail = (value:string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    const controlEmail = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const email = e.currentTarget.value
        if (isValidEmail(email) || email === "") {
            setEmailError(false)
            setEmailHelper("")
        } else {
            setEmailError(true)
            setEmailHelper("Format d'adresse email non valide")
        }
    }

    const handleSubmit = () => {
        setError("")
        if (isValidEmail(email)) {
            logUser(email, password)
        }
    }

    const logUser = async (email:string, password:string) => {
        const user = { email, password }
        try {
            const response = await api.post('/auth/login', user)
            if (!response.data.error) {
                // localStorage.setItem("token", `Bearer ${response.data.token}`)
                // localStorage.setItem("user", response.data.user)
                context?.setToken(`Bearer ${response.data.token}`)
                // console.log("data.user :",JSON.parse(response.data.user))
                context?.setCurrentUser(JSON.parse(response.data.user))
                // router.push("/")
                // navigation.navigate('home')
            } else {
                console.log(response.data.error)
                setError(response.data.message)
            }
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
                setError(error)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
                setError(error.message)
            }
        }
    }


    return (
        <View style={styles.container}>
            <Image source={icon as any} style={styles.logo} />
            <Text style={styles.title}>Se connecter</Text>
            <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <Input placeholder="Mot de passe" secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Button title="CONNEXION" onPress={handleSubmit}/>
            <View style={styles.goToSignUp}>
                <Text>Pas encre de compte ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={styles.link}>Inscrivez-vous !</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    logo: {
        width: width / 1.1,
        height: 150,
        resizeMode: "contain",
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    goToSignUp: {
        display: "flex",
        flexDirection: "row"
    },
    link: {
        marginLeft: 5,
        color: '#0645AD'
    }
})