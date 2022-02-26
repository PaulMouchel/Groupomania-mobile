import React, { FC, useState } from "react";
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input, Button } from "../components/basics";
import { useCurrentUser } from '../components/context/context'
import api from '../api/axios'
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import icon from '../../public/images/icon-left-font-monochrome-black.png';

const { height, width } = Dimensions.get('screen')

type RootStackParamList = {

    Pdp: undefined; //current screen
 
    // PdpComments: {slug: string}; // a screen that we are 
 // navigating to, in the current screen,
 // that we should pass a prop named `slug` to it
 
    // Sellers: {data: Array<string>};
 
    login: undefined; // a screen that we are navigating to 
 // in the current screen, that we don't pass any props to it
 home: undefined
 };

interface IPdpPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Pdp'>;
 }

const SignUp : FC<IPdpPageProps> = ({ navigation }) => {
    const [ name, setName ] = useState<string>("")
    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>("")
    const [ nameError, setNameError ] = useState<boolean>(false)
    const [ emailError, setEmailError ] = useState<boolean>(false)
    const [ passwordError, setPasswordError ] = useState<boolean>(false)
    const [ passwordConfirmationError, setPasswordConfirmationError ] = useState<boolean>(false)
    const [ nameHelper, setNameHelper ] = useState<string>("")
    const [ emailHelper, setEmailHelper ] = useState<string>("")
    const [ passwordHelper, setPasswordHelper ] = useState<string>("")
    const [ passwordConfirmationHelper, setPasswordConfirmationHelper ] = useState<string>("")
    const [ error, setError ] = useState<string>("")
    const context = useCurrentUser()

    const isValidName = (value:string) => {
        return value.length >= 3 && value.length < 100
    }

    const isValidEmail = (value:string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    const isValidPassword = (value:string) => {
        return value.length >= 8
    }

    const controlName = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.value
        if (isValidName(name) || name === "") {
            setNameError(false)
            setNameHelper("")
        } else {
            setNameError(true)
            setNameHelper("La longueur du nom doit être comprise entre 3 et 99 caractères")
        }
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

    const controlPassword = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const password = e.currentTarget.value
        if (isValidPassword(password) || password === "") {
            setPasswordError(false)
            setPasswordHelper("")
        } else {
            setPasswordError(true)
            setPasswordHelper("Le mot de passe doit contenir au moins 8 caratères")
        }
    }

    const controlPasswordConfirmation = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (password === passwordConfirmation || passwordConfirmation === "") {
            setPasswordConfirmationError(false)
            setPasswordConfirmationHelper("")
        } else {
            setPasswordConfirmationError(true)
            setPasswordConfirmationHelper("Les mots de passe ne sont pas identiques")
        }
    }

    const areValidData = (name:string, email:string, password:string, passwordConfirmation:string) => {
        const nameOk = isValidName(name)
        const emailOk = isValidEmail(email)
        const passwordOk = isValidPassword(password)
        const passwordConfirmationOk = password === passwordConfirmation
        return nameOk && emailOk && passwordOk && passwordConfirmationOk
    }

    const handleSubmit = () => {
        const validData = areValidData(name, email, password, passwordConfirmation)
        if (validData) {
            createUser(name, email, password)
        }
    }

    const logUser = async (email:string, password:string) => {
        const user = { email, password }
        try {
            const response = await api.post('/auth/login', user)
            if (!response.data.error) {
                // localStorage.setItem("token", `Bearer ${response.data.token}`)
                // localStorage.setItem("user", response.data.user)
                context?.setToken(response.data.token)
                context?.setCurrentUser(response.data.user)
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

    const createUser = async (name:string, email:string, password:string) => {
        const newUser = { name, email, password }
        try {
            const response = await api.post('/auth/signup', newUser)
            if (!response.data.error) {
                logUser(email, password)
            } else {
                console.log(response.data.error)
                setError(response.data.error)
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
            <Text style={styles.title}>S'inscrire</Text>
            <Input placeholder="Nom d'utilisateur" onChangeText={(text) => setName(text)} />
            <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <Input placeholder="Mot de passe" secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Input placeholder="Confirmez le mot de passe" secureTextEntry onChangeText={(text) => setPasswordConfirmation(text)} />
            <Button title="INSCRIPTION" onPress={handleSubmit}/>
            <View style={styles.goToLogin}>
                <Text>Vous avez déjà un compte ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.link}>Connectez-vous !</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp

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
    goToLogin: {
        display: "flex",
        flexDirection: "row"
    },
    link: {
        marginLeft: 5,
        color: '#0645AD'
    }
})