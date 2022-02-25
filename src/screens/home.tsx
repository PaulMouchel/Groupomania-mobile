import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import api from '../api/axios'
import PostType from '../types/PostType'
import UserType from '../types/UserType'
import { useCurrentUser } from '../components/context/context'
import Post from "../components/Post";

import CreatePost from "../components/CreatePost";

// import CreatePost from '../components/CreatePost'
// import Post from '../components/Post'
// import SnackMessage from "../components/SnackMessage"




const Home : FC = () => {

    const [ posts , setPosts ] = useState<PostType[]>([])
    // const [ currentUser , setCurrentUser ] = useLocalStorage<UserType | null>("user", null)
    const [ snackMessage, setSnackMessage ] = useState<string>('')
    const [ snackSeverity, setSnackSeverity ] = useState<"error" | "warning" | "info" | "success">("success")
    const context = useCurrentUser()

    useEffect(() => {
        const fetchPosts = () => {
            api.get('/posts', {
                headers: {
                    "authorization": context?.token || ""
                }
            })
            .then((response) => {
                setPosts(response.data)
            })
            .catch((error:unknown) => {
                console.log(error)
                // router.push('/login')
            })
        }
        fetchPosts()
    }, [])

    const sortPostsByDate = (a:PostType, b:PostType) => {
        if (a.createdAt > b.createdAt)
            return -1
        if (a.createdAt < b.createdAt)
            return 1
        return 0
    }

    const deletePost = (postId: Number) => {
        const newPosts = posts.filter(post => post.id !== postId)
        setPosts([...newPosts])
        sendSnack("Le post a bien été supprimé", "success")
    }

    const updatePost = (post:PostType) => {
        const newPosts:PostType[] = [...posts]
        const index:number = newPosts.findIndex(existingPost => existingPost.id === post.id)
        newPosts[index] = post
        setPosts([...newPosts])
    }

    const sendSnack = (message:string, severity:"error" | "warning" | "info" | "success") => {
        setSnackSeverity(severity)
        setSnackMessage(message)
    }

    console.log(posts)
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <View style={styles.main}>
                <View style={styles.content}>
                    {/* <CreatePost posts={posts} setPosts={setPosts} currentUser={context?.currentUser || null} sendSnack={sendSnack}/> */}
                    { posts.sort(sortPostsByDate).map((post, index) => 
                        <Post key={JSON.stringify(post)} data={post} currentUser={context?.currentUser || null} deletePost={deletePost} updatePost={updatePost} sendSnack={sendSnack}/>
                    )}
                </View>
            </View>
            {/* <SnackMessage message={snackMessage} setMessage={setSnackMessage} severity={snackSeverity}/> */}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {

    },
    content: {

    }
})






