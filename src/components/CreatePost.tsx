import { FC, useState, ChangeEvent } from "react"

// import Image from 'next/image'
// import Avatar from '@mui/material/Avatar'

import { Button, TextArea } from './basics'
import { View, Image, Text, StyleSheet } from "react-native";
import api from '../api/axios'
import ICreatePost from "../interfaces/ICreatePost"
// import PhotoCamera from '@mui/icons-material/PhotoCamera'
// import IconButton from '@mui/material/IconButton'

const CreatePost: FC<ICreatePost> = ({ posts, setPosts, currentUser, sendSnack }) => {

    const [ text , setText ] = useState<string>("")
    const [ file, setFile ] = useState<File>()
    const [ imageUrl, setImageUrl ] = useState<string>("")

    // const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
    //     setText(e.target.value)
    // }

    // const changeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     try {
    //         const files = Array.from(e.target.files!)
    //         const selectedFile = files[0]
    //         const url = URL.createObjectURL(selectedFile);
    //         setImageUrl(url)
    //         setFile(selectedFile)
    //     } catch (error) {
    //         setImageUrl("")
    //     }
    // }

    // const handleSubmit = async () => {
    //     if (currentUser && text !== "") {
    //         const userId = currentUser.id
    //         const newPost = new FormData()
    //         newPost.append("userId", userId.toString())
    //         newPost.append("text", text)
    //         if (file) {
    //             newPost.append("image", file)
    //         }
    //         try {
    //             const response = await api.post('/posts', newPost, {
    //                 headers: {
    //                     "authorization": localStorage.getItem("token") ||""
    //                 }
    //             })
    //             const allPosts = [...posts, response.data]
    //             setPosts(allPosts)
    //             setText("")
    //             setFile(undefined)
    //             setImageUrl("")
    //             sendSnack("Le post a été publié avec succès", "success")
    //         } catch (error:unknown) {
    //             if (typeof error === "string") {
    //                 console.log(`Error: ${error}`)
    //                 sendSnack(`Error: ${error}`, "error")
    //             } else if (error instanceof Error) {
    //                 console.log(`Error: ${(error as Error).message}`)
    //                 sendSnack(`Error: ${(error as Error).message}`, "error")
    //             }
    //         }
    //     }
    // }

    return (
        <View style={styles.container}>
            {/* <View style={styles.text}> */}
                {/* <Image style={styles.avatar} alt={currentUser?.name} source={currentUser ? currentUser.imageUrl : ""}/> */}
                {/* <TextArea
                    id="create-post"
                    label="Quelque chose à dire ?"
                    placeholder="Salut à tous !"
                    multiline
                    variant="standard"
                    fullWidth
                    onChange={handleTextChange}
                    value={text}
                /> */}
            {/* </View> */}
            { imageUrl && 
                <View style={styles.image}>
                    {/* <Image style={styles.image} source={imageUrl} layout="fill" objectFit="cover" />  */}
                </View>
            }
            <View style={styles.actions}>
                {/* <label htmlFor="icon-button-file">
                    <input className={styles['upload-button']} accept="image/*" id="icon-button-file" type="file" onChange={changeImage}/>
                    <IconButton color="primary" aria-label="upload picture" component="span" >
                        <PhotoCamera />
                    </IconButton>
                </label>
                <Button title="Publier" onPress={handleSubmit} ></Button> */}
            </View>
        </View>
    )
}

export default CreatePost

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

