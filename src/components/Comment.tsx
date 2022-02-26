import { FC, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
// import {DateTime} from "luxon"
import { Avatar } from 'react-native-elements'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
// import MenuItem from '@mui/material/MenuItem'
// import DeleteIcon from '@mui/icons-material/Delete'
// import StyledMenu from "./StyledMenu"
// import EditIcon from '@mui/icons-material/Edit'
// import CommentType from "../types/CommentType"
import IComment from '../interfaces/IComment'
// import Modal from './Modal'
// import EditComment from './EditComment'

import api from '../api/axios'

const Comment: FC<IComment> = ({ data, currentUser, deleteSelf, updateSelf }) => {

    const { id, user, createdAt, text } = data
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    // const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    // const open = Boolean(anchorEl)
    // const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }

    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handleDelete = async () => {
    //     try {
    //         const response = await api.delete(`/comments/${id}`, {
    //             headers: {
    //                 "authorization": localStorage.getItem("token") || ""
    //             }
    //         })
    //         setAnchorEl(null)
    //         deleteSelf(id)
    //     } catch (error:unknown) {
    //         if (typeof error === "string") {
    //             console.log(`Error: ${error}`)
    //         } else if (error instanceof Error) {
    //             console.log(`Error: ${(error as Error).message}`)
    //         }
    //     }
    // }

    // const openModal = () => {
    //     setAnchorEl(null)
    //     setModalOpen(true)
    // }

    // const closeModal = () => {
    //     setModalOpen(false)
    // }

    return (
        <View style={styles.container}>
            {/* { modalOpen && 
                <Modal closeModal={closeModal}>
                    <EditComment comment={data} closeModal={closeModal} updateSelf={updateSelf}/> 
                </Modal>
            } */}
            <View style={styles.main}>
                <Avatar size={40} rounded source={{ uri: user.imageUrl}}/>
                <View style={styles.comment}>
                    <View style={styles.infos}>
                        <Text style={styles.sender}>{user.name}</Text>
                        <Text style={styles.when}>{createdAt}</Text>
                    </View>
                    <Text style={styles.text}>
                        { text }
                    </Text>
                </View>
            </View>
            {/* { ( currentUser.id === user.id || currentUser.isAdmin ) && 
                <>
                    <View onClick={handleClick} className={styles.more}>
                        <MoreVertIcon/>
                    </View>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem  onClick={openModal} disableRipple>
                            <EditIcon/>
                            Modifier
                        </MenuItem>
                        <MenuItem onClick={handleDelete} disableRipple>
                            <DeleteIcon />
                            Supprimer
                        </MenuItem>
                    </StyledMenu>
                </>
            }  */}
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#eee',
        borderRadius: 10
    },
    main: {
        display: 'flex',
        flexDirection: 'row'
    },
    comment: {

    },
    infos: {

    },
    sender: {
        fontSize: 16,
        fontWeight: '700'
    },
    when: {

    },
    text: {
        fontSize: 16
    }
})

