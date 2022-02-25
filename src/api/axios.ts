import axios from 'axios'
import { AXIOS_BASE_URL } from '@env'

const api = axios.create({
    baseURL: AXIOS_BASE_URL
})

export default api 