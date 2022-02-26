import { FC, useState } from "react"
// import { DateTime } from "luxon"
import api from '../api/axios'
import { Avatar } from './material'
import { Link } from "@react-navigation/native"
import Comment from "./Comment"
import EditPost from "./EditPost"
import Modal from './Modal'
import StyledMenu from "./StyledMenu"
import WriteComment from "./WriteComment"
import IPost from "../interfaces/IPost"
import PostType from "../types/PostType"
import CommentType from "../types/CommentType"
import { View, Text, Image, StyleSheet } from 'react-native'
// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'

// import Chip from '@mui/material/Chip'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import MenuItem from '@mui/material/MenuItem'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
// import ThumbDownIcon from '@mui/icons-material/ThumbDown'
// import ThumbUpIcon from '@mui/icons-material/ThumbUp'


const Post: FC<IPost> = ({ data, currentUser, deletePost, updatePost, sendSnack }) => {

    const { id, text, imageUrl, user, comments, reactions, createdAt } = data
    const quantityOfLikes = reactions.filter(reaction => reaction.type === 'like').length
    const quantityOfDislikes = reactions.filter(reaction => reaction.type === 'dislike').length
    const currentUserReaction = currentUser ? reactions.filter(reaction => reaction.userId === currentUser.id)[0]?.type : null
    // const when = DateTime.fromISO(createdAt).setLocale('fr').toRelative()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const open = Boolean(anchorEl)

    // const reactToPost = async (reactionType:string) => {
    //     if (currentUser) {
    //         const newReaction = { userId:currentUser.id, type:reactionType, postId:id }
    //         try {
    //             const response = await api.post(`/reactions`, newReaction, {
    //                 headers: {
    //                     "authorization": localStorage.getItem("token") || ""
    //                 }
    //             })
    //             const updatedPost:PostType = {...data}
    //             updatedPost.reactions = [...reactions, response.data]
    //             updatePost(updatedPost)
    //         } catch (error:unknown) {
    //             if (typeof error === "string") {
    //                 console.log(`Error: ${error}`)
    //             } else if (error instanceof Error) {
    //                 console.log(`Error: ${(error as Error).message}`)
    //             }
    //         }
    //     }
    // }

    // const cancelReaction = async () => {
    //     if (currentUser) {
    //         const reactionId = reactions.filter(reaction => reaction.userId === currentUser.id)[0]?.id
    //         try {
    //             const response = await api.delete(`/reactions/${reactionId}`, {
    //                 headers: {
    //                     "authorization": localStorage.getItem("token") || ""
    //                 }
    //             })
    //             const allReactions = reactions.filter(reaction => reaction.userId !== currentUser.id)
    //             const updatedPost:PostType = {...data}
    //             updatedPost.reactions = [...allReactions]
    //             updatePost(updatedPost)
    //         } catch (error:unknown) {
    //             if (typeof error === "string") {
    //                 console.log(`Error: ${error}`)
    //             } else if (error instanceof Error) {
    //                 console.log(`Error: ${(error as Error).message}`)
    //             }
    //         }
    //     }
    // }

    // const changeReaction = async (reactionType:string) => {
    //     if (currentUser) {
    //         const reactionId = reactions.filter(reaction => reaction.userId === currentUser.id)[0]?.id
    //         const newReaction = { type:reactionType }
    //         try {
    //             const response = await api.patch(`/reactions/${reactionId}`, newReaction, {
    //                 headers: {
    //                     "authorization": localStorage.getItem("token") || ""
    //                 }
    //             })
    //             let allReactions = [...reactions]
    //             const index = allReactions.findIndex(reaction => reaction.userId === currentUser.id)
    //             allReactions[index].type = reactionType
    //             const updatedPost:PostType = {...data}
    //             updatedPost.reactions = [...allReactions]
    //             updatePost(updatedPost)
    //         } catch (error:unknown) {
    //             if (typeof error === "string") {
    //                 console.log(`Error: ${error}`)
    //             } else if (error instanceof Error) {
    //                 console.log(`Error: ${(error as Error).message}`)
    //             }
    //         }
    //     }
    // }

    // const handleReact = (reactionType:string) => {
    //     if (currentUser) {

    //         if (!currentUserReaction) {
    //             reactToPost(reactionType)
    //         } else if (currentUserReaction === reactionType) {
    //             cancelReaction()
    //         } else {
    //             changeReaction(reactionType)
    //         }
    //     }
    // }

    // const deleteComment = (commentId: Number) => {
    //     const newComments = comments.filter(comment => comment.id !== commentId)
    //     const updatedPost:PostType = {...data}
    //     updatedPost.comments = [...newComments]
    //     updatePost(updatedPost)
    //     sendSnack("Le commentaire a bien été supprimé", "success")
    // }

    // const writeComment = (comment:CommentType) => {
    //     const newComments = [...comments, comment]
    //     const updatedPost:PostType = {...data}
    //     updatedPost.comments = [...newComments]
    //     updatePost(updatedPost)
    //     sendSnack("Le commentaire a bien été publié", "success")
    // }

    // const updateComment = (updatedComment:CommentType) => {
    //     const index:number = comments.findIndex(comment => comment.id === updatedComment.id)
    //     const newComments = [...comments]
    //     newComments[index] = updatedComment 
    //     const updatedPost:PostType = {...data}
    //     updatedPost.comments = [...newComments]
    //     updatePost(updatedPost)
    //     sendSnack("Le commentaire a bien été modifié", "success")
    // }

    // const handleDotsMenuClose = () => {
    //     setAnchorEl(null)
    // }

    // const handleDotsMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handleDelete = async () => {
    //     try {
    //         const response = await api.delete(`/posts/${id}`, {
    //             headers: {
    //                 "authorization": localStorage.getItem("token") || ""
    //             }
    //         })
    //         setAnchorEl(null)
    //         deletePost(id)
    //     } catch (error:unknown) {
    //         if (typeof error === "string") {
    //             console.log(`Error: ${error}`)
    //             sendSnack(`Error: ${error}`, "error")
    //         } else if (error instanceof Error) {
    //             console.log(`Error: ${(error as Error).message}`)
    //             sendSnack(`Error: ${(error as Error).message}`, "error")
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
                    <EditPost post={data} closeModal={closeModal} updateSelf={updatePost}/>
                </Modal>
            } */}
            <View style={styles.header}>
            <Avatar user={user} />
            <Text>{user.name}</Text>
            <Text>{createdAt}</Text>
                {/* <View style={styles.main}> */}
                
                    {/* <Link href={`/users/${user.id}`}>
                        <a>
                            <Avatar user={user} />
                        </a>
                    </Link>
                    <div>
                        <Link href={`/users/${user.id}`}>
                            <a>
                                <div style={styles.sender}>
                                    { user.name } { user.isAdmin && <Chip style={styles.admin} label="Admin" color="primary" /> }
                                </div>
                            </a>
                        </Link>
                        <div style={styles.when}>{when}</div>
                    </div> */}
                {/* </View> */}
                {/* { currentUser && ( currentUser.id === user.id || currentUser.isAdmin ) && 
                    <>
                        <div onClick={handleDotsMenuClick} style={styles.more}>
                            <MoreVertIcon/>
                        </div>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleDotsMenuClose}
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
                } */}
            </View>
            <View style={styles.text}>
                <Text>
                    { text }
                </Text>
            </View>
            {/* { imageUrl && 
                <View style={styles.image}>
                    <Image src={imageUrl} layout="fill" objectFit="cover" /> 
                </View>
            } */}
            {/* <View style={styles.action}>
                <View style={`${styles.reaction} ${currentUserReaction === 'like' && styles.active}`} onClick={() => handleReact("like")}>
                    <ThumbUpIcon/>{ quantityOfLikes > 0 && <span style={styles.quantity}>{ quantityOfLikes }</span>}
                </View>
                <View style={`${styles.reaction} ${currentUserReaction === 'dislike' && styles.active}`} onClick={() => handleReact("dislike")}>
                    <ThumbDownIcon/>{ quantityOfDislikes > 0 && <span style={styles.quantity}>{ quantityOfDislikes }</span>}
                </View>
            </View> */}
            {/* { comments.length ? 
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Text>{ comments.length } commentaire{comments.length > 1 && "s"}</Text>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={styles.comments}>
                            { currentUser && comments.map((comment, index) => 
                                <Comment key={index} data={comment} currentUser={currentUser} deleteSelf={deleteComment} updateSelf={updateComment}/>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion> : <></>
            } */}
            {/* { currentUser &&
                <WriteComment postId={id} writeComment={writeComment} currentUser={currentUser}/>
            } */}
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {

    },
    text: {

    },
    image: {

    }
})
