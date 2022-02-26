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


const Navbar: FC = () => {

    // const router = useRouter()
    // const context = useCurrentUser()

    // useEffect(() => {
    //     const currentUserStr = localStorage.getItem("user")
    //     if (currentUserStr) {
    //         const currentUser = JSON.parse(currentUserStr)
    //         context?.setCurrentUser(currentUser)
    //     } else {
    //         router.push("/login")
    //     } 
    // }, [])

    // const handleLogout = () => {
    //     localStorage.clear()
    //     context?.setCurrentUser(null)
    //     router.push("/login")
    // }

    return (
        <View style={styles.navbar}>
            <Text>Navbar</Text>
            {/* <div className={styles.actions}>
                <Link href="/">
                    <a>
                        <div className={styles.home}>
                            <FaSolidHome/>
                        </div>
                    </a>
                </Link>
                { context && context.currentUser && 
                    <Link href={`/users/${context.currentUser.id}`}>
                        <a>
                            <div className={styles.profile}>
                                <Avatar alt={context.currentUser.name} src={context.currentUser.imageUrl} sx={{ width: 35, height: 35 }} />
                            </div>
                        </a>
                    </Link>
                }
                <div className={styles.logout} onClick={handleLogout}>
                    <PowerSettingsNewIcon/>
                </div>
                
            </div> */}
            
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#122441',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 75,
        

        // padding: 1rem;
        // position: fixed;
        // width: 100%;
        // z-index: 1000;

        // width: width, 
        // height: height,
        // borderRadius: 99
    },
})