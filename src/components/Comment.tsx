import { FC, useState } from "react"
import { StyleSheet } from "react-native"
// import {DateTime} from "luxon"
import { Avatar } from "./material"
// import MoreVertIcon from '@mui/icons-material/MoreVert'
// import MenuItem from '@mui/material/MenuItem'
// import DeleteIcon from '@mui/icons-material/Delete'
import StyledMenu from "./StyledMenu"
// import EditIcon from '@mui/icons-material/Edit'
import CommentType from "../types/CommentType"
import IComment from '../interfaces/IComment'
import Modal from './Modal'
import EditComment from './EditComment'

import api from '../api/axios'

const Comment: FC<IComment> = ({ data, currentUser, deleteSelf, updateSelf }) => {

    const { id, user, createdAt, text } = data
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const open = Boolean(anchorEl)
    // const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/comments/${id}`, {
                headers: {
                    "authorization": localStorage.getItem("token") || ""
                }
            })
            setAnchorEl(null)
            deleteSelf(id)
        } catch (error:unknown) {
            if (typeof error === "string") {
                console.log(`Error: ${error}`)
            } else if (error instanceof Error) {
                console.log(`Error: ${(error as Error).message}`)
            }
        }
    }

    const openModal = () => {
        setAnchorEl(null)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div style={styles.container}>
            { modalOpen && 
                <Modal closeModal={closeModal}>
                    <EditComment comment={data} closeModal={closeModal} updateSelf={updateSelf}/> 
                </Modal>
            }
            <div style={styles.main}>
                <Link href={`/users/${user.id}`}>
                    <a>
                        <Avatar user={user} />
                    </a>
                </Link>
                <div style={styles.comment}>
                    <div style={styles.infos}>
                        <Link href={`/users/${user.id}`}>
                            <a>
                                <div style={styles.sender}>{user.name}</div>
                            </a>
                        </Link>
                        <div style={styles.when}>{when}</div>
                    </div>
                    <p style={styles.text}>
                        { text }
                    </p>
                </div>
            </div>
            { ( currentUser.id === user.id || currentUser.isAdmin ) && 
                <>
                    <div onClick={handleClick} className={styles.more}>
                        <MoreVertIcon/>
                    </div>
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
            } 
        </div>
    )
}

export default Comment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 56, 
        height: 56
    },
    image: {

    },
    actions: {

    }
})

