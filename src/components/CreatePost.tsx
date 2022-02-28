import { FC, useState, ChangeEvent } from "react"
import { Avatar } from 'react-native-elements'
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

    const handleTextChange = (text: string) => {
        setText(text)
    }

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

    const handleSubmit = async () => {
        // if (currentUser && text !== "") {
        //     const userId = currentUser.id
        //     const newPost = new FormData()
        //     newPost.append("userId", userId.toString())
        //     newPost.append("text", text)
        //     if (file) {
        //         newPost.append("image", file)
        //     }
        //     try {
        //         const response = await api.post('/posts', newPost, {
        //             headers: {
        //                 "authorization": localStorage.getItem("token") ||""
        //             }
        //         })
        //         const allPosts = [...posts, response.data]
        //         setPosts(allPosts)
        //         setText("")
        //         setFile(undefined)
        //         setImageUrl("")
        //         sendSnack("Le post a été publié avec succès", "success")
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
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                { currentUser ? <Avatar size={64} rounded source={{ uri: currentUser.imageUrl}} /> : <></> }
                <TextArea
                    placeholder="Quelque chose à dire ?"
                    onChangeText={handleTextChange}
                />
            </View>
            {/* { imageUrl && 
                 <View style={styles.image}>
                     <Image style={styles.image} source={imageUrl} layout="fill" objectFit="cover" /> 
                 </View>
            } */}
            <View style={styles.actions}>
                {/* <label htmlFor="icon-button-file">
                    <input className={styles['upload-button']} accept="image/*" id="icon-button-file" type="file" onChange={changeImage}/>
                    <IconButton color="primary" aria-label="upload picture" component="span" >
                        <PhotoCamera />
                    </IconButton>
                </label> */}
                <Button title="Publier" onPress={handleSubmit} ></Button>
            </View>
        </View>
    )
}

export default CreatePost

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderColor: '#BBB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    header: {
        marginBottom: 5,
        paddingBottom: 5,
        display: 'flex',
        flexDirection: "row",
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

