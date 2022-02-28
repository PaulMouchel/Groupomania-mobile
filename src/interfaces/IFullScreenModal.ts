import { ReactNode } from "react"

export default interface IFullScreenModal {
    children: ReactNode
    visible: boolean
    onRequestClose: () => void
}