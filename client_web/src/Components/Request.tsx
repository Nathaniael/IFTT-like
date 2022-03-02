// Extern modules
import axios from 'axios'

// Globals variables
const prefixUrlApi = (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_BASE_URL_DEV : process.env.REACT_APP_BASE_URL_PROD;


// Types

// Register needed params
type RegisterProps = {
    username: string,
    email: string,
    password: string
};

// Login needed params
type LoginProps = {
    usernameOrEmail: string,
    password: string
};

// Create Area params
type createAreaProps = {
    action_id: number,
    reaction_id: number,
    action_params: object,
    reaction_params: object
}

// Component
class RequestApi {
    async register(props: RegisterProps) {
        // Configure options
        const url = prefixUrlApi + "auth/register/"
        const body = props
        const headers = {
            withCredentials: true
        }

        // Execute request and return status + data
        return await axios.post(url, body, headers).then((res) => {
            return res.data
        }).catch((err) => {
            // If there is a custom error message
            if (err?.response?.data?.message) {
                throw err.response.data.message
            }
            // Default message
            throw err.message
        })
    }

    async login(props: LoginProps) {
        // Configure options
        let url = prefixUrlApi + "auth/login/"
        let loginField = props.usernameOrEmail.includes("@") ? "email" : "username";
        // Modifying body to be able to connect automatically with the email or username
        let body = {
            [loginField]: props.usernameOrEmail,
            "password": props.password
        }
        let headers = {
            withCredentials: true
        }

        // Execute request and return status + data
        return await axios.post(url, body, headers).then((res) => {
            return res.data
        }).catch((err) => {
            // If there is a custom error message
            if (err?.response?.data?.message) {
                throw err.response.data.message
            }
            // Default message
            throw err.message
        })
    }

    async getProfile() {
        // Configure options
        const url = prefixUrlApi + "user/profile/"
        const headers = {
            withCredentials: true
        }

        // Execute request and return status + data
        return await axios.get(url, headers).then((res) => {
            return res.data
        }).catch((err) => {
            // If there is a custom error message
            if (err?.response?.data?.message) {
                throw err.response.data.message
            }
            // Default message
            throw err.message
        })
    }

    async getServices() {
        // Configure options
        const url = prefixUrlApi + "services/"
        const headers = {
            withCredentials: true
        }

        // Execute request and return status + data
        return await axios.get(url, headers).then((res) => {
            return res.data
        }).catch((err) => {
            // If there is a custom error message
            if (err?.response?.data?.message) {
                throw err.response.data.message
            }
            // Default message
            throw err.message
        })
    }

    async createArea(props: createAreaProps) {
        // Configure options
        const url = prefixUrlApi + "areas/create/"
        const body = props
        const headers = {
            withCredentials: true
        }
        console.log(body)
        // Execute request and return status + data
        return await axios.post(url, body, headers).then((res) => {
            return res.data
        }).catch((err) => {
            // If there is a custom error message
            if (err?.response?.data?.message) {
                throw err.response.data.message
            }
            // Default message
            throw err.message
        })
    }
}

export default new RequestApi()