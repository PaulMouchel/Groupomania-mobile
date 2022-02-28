import PostType from "./PostType";

type UserType = {
    id: number
    name: string
    email: string
    password: string
    description?: string
    imageUrl?: string
    isAdmin: boolean
    createdAt: Date
    posts: PostType[]
}

export default UserType