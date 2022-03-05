// Extern modules
import axios from 'axios';
import qs from 'qs';

// Globals variables
const prefixUrlApi = (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_BASE_URL_DEV : process.env.REACT_APP_BASE_URL_PROD;


// Types

// Register needed params
type RegisterProps = {
    username: string,
    email: string,
    password: string,
    image: string
};

// Login needed params
type LoginProps = {
    email: string,
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
        // Modifying body to be able to connect automatically with the email or username
        let body = {
            "email": props.email,
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

    async getAccessToken(code: string, state: string) {
        const applicationId = process.env.REACT_APP_GITLAB_APPLICATION_ID as string
        const redirectUri = ((process.env.NODE_ENV === 'development') ? process.env.REACT_APP_GITLAB_CALLBACK_DEV : process.env.REACT_APP_GITLAB_CALLBACK_PROD) as string;
        const secretKey = process.env.REACT_APP_GITLAB_SECRET as string
        
        const url = "https://gitlab.com/oauth/token"

        const credentials = {
            grant_type: 'authorization_code',
            client_id: applicationId,
            client_secret: secretKey,
            redirect_uri: redirectUri,
            code: code,
            scope: 'api',
        }

        return await axios.post(url + "?" + qs.stringify(credentials)).then((res) => {
            return res.data
        }).catch((err) => {
            throw err
        })
    }

    async getAreas() {
        // Configure options
        const url = prefixUrlApi + "user/areas/"
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

    async postToken(token: string) {
        // Configure options
        const url = prefixUrlApi + "oauth/"
        const headers = {
            withCredentials: true
        }
        const body = {
            "token": token
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

    async postUsername(username: string) {
        // Configure options
        const url = prefixUrlApi + "user/username/"
        const headers = {
            withCredentials: true
        }
        const body = {
            "username": username
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

    async deleteArea(id: number) {
        // Configure options
        const url = prefixUrlApi + "areas/delete/"
        const headers = {
            withCredentials: true
        }
        const body = {
            "id": id
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
    async deleteUsr() {
        // Configure options
        const url = prefixUrlApi + "user/"
        const headers = {
            withCredentials: true
        }
        // Execute request and return status + data
        return await axios.delete(url, headers).then((res) => {
            console.log(res)
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