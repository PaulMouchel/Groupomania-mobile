import { useState, useContext, createContext, Dispatch, SetStateAction } from "react"
import UserType from '../../types/UserType'

type currentUserContextProps = {
    children: React.ReactNode
}

type currentUserType = {
    currentUser: UserType | null
    setCurrentUser: Dispatch<SetStateAction<UserType | null>>
    token: string
    setToken: Dispatch<SetStateAction<string>>
}

type currentUserContextType = currentUserType | null

export const CurrentUserContext = createContext<currentUserContextType>(null)

export const useCurrentUser = () => {
    return useContext(CurrentUserContext)
}

export const CurrentUserContextProvider = ({ children }: currentUserContextProps) => {

    const [ currentUser, setCurrentUser ] = useState<UserType | null>(null)
    const [ token, setToken ] = useState<string>("")

    const value = {
        currentUser,
        setCurrentUser,
        token,
        setToken
    }

    return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}