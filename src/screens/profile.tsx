import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppStackParams } from "../navigation/appStack";
import { Icon, Avatar } from 'react-native-elements';
import { useCurrentUser } from '../components/context/context'
import UserType from '../types/UserType'
import api from '../api/axios'
import Navbar from "../components/Navbar";
import { Button } from '../components/basics'
import FullScreenModal from '../components/FullScreenModal'
import EditProfile from '../components/EditProfile'

type Props = NativeStackScreenProps<AppStackParams, 'profile'>

const Profile : FC<Props> = ({ route }) => {
    // const router = useRouter()
    // const { query, isReady } = router
    // const { id } = query
    // const userId = Number(id)
    const [ tab, setTab ] = useState<Number>(0)
    const [ user , setUser ] = useState<UserType | null>(null)
    const context = useCurrentUser()
    const [ isCurrentUser, setIsCurrentUser ] = useState<boolean>(false)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    // const descriptionRef = useRef<HTMLInputElement>(null)
    const [ snackMessage, setSnackMessage ] = useState<string>('')
    const [ snackSeverity, setSnackSeverity ] = useState<"error" | "warning" | "info" | "success">("success")

    useEffect(() => {
        // if(!isReady || modalOpen) {
        //     return
        // }
        const fetchUser = () => {
            api.get(`/users/${route.params.id}`, {
                headers: {
                    "authorization": context?.token || ""
                }
            })
            .then((response) => {
                setUser(response.data)
                // if (descriptionRef && descriptionRef.current) {
                //     descriptionRef.current.value = response.data.description
                // }
                
            })
            .catch((error:unknown) => {
                console.log(error)
                // router.push("/login")
            })
        }
        fetchUser()
    }, [modalOpen])

    useEffect(() => {
        if (user && context?.currentUser) {
            setIsCurrentUser(user.id === context?.currentUser.id)
        } else {
            setIsCurrentUser(false)
        }
    }, [user, context])

    const closeModal = () => {
        setModalOpen(false)
    }

    // const sendSnack = (message:string, severity:"error" | "warning" | "info" | "success") => {
    //     setSnackSeverity(severity)
    //     setSnackMessage(message)
    // }

    return (
        <>
            <Navbar/>
            <View style={styles.container}>
                { isCurrentUser && context?.currentUser && 
                    <FullScreenModal
                            visible={modalOpen}
                            onRequestClose={closeModal}
                        >
                        <EditProfile user={context?.currentUser} closeModal={closeModal} sendSnack={() => {}}/> 
                    </FullScreenModal>
                }
                <View style={styles.main}>
                    <View style={styles.main__content}>
                        <View style={styles.header}>
                            {/* { user && user.isAdmin && <Chip className={styles.admin} label="Admin" color="primary" /> } */}
                            <View style={styles.userpic}>
                                <Avatar source={{ uri: user ? user.imageUrl : "" }} size={56} rounded/>
                            </View>
                            <Text style={styles.username}>{user && user.name}</Text>
                        </View>
                        { user && 
                            <>
                                <View style={styles.description}>
                                    <Text>{user.description}</Text> 
                                </View>
                                { isCurrentUser && 
                                    <View style={styles.change}>
                                        <Button title="Modifier les informations" onPress={() => setModalOpen(true)} /> 
                                    </View>
                                }
                                {/* <div className={styles.tabs}>
                                    <div className={`${styles.tab} ${tab === 0 && styles.active}`} onClick={() => setTab(0)}>Activité</div>
                                    { context?.currentUser && ( context.currentUser.id === user.id || context.currentUser.isAdmin )  && <div className={`${styles.tab} ${tab === 1 && styles.active}`} onClick={() => setTab(1)}>Paramètres</div> }
                                </div>
                        
                                <div className={styles['tab-content']}>
                                    { context?.currentUser && tab === 0 && <UserActivities user={user} setUser={setUser} currentUser={context?.currentUser} sendSnack={sendSnack}/> }
                                    { tab === 1 && <UserSettings user={user}/> }
                                </div> */}
                            </>
                        }
                    </View>
                </View>
                {/* <SnackMessage message={snackMessage} setMessage={setSnackMessage} severity={snackSeverity}/> */}
            </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {

    },
    main__content: {

    },
    header: {

    },
    userpic: {

    },
    username: {

    },
    description: {

    },
    change: {

    }
})