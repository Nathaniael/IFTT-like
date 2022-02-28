import axios from 'axios'

const prefixUrlApi = "http://localhost:8080/"

const unexpectedError = {
    error: "Une erreur non expectée s'est produite - Contactez le support pour plus d'informations"
}

class RequestApi {
    async register(username, email, password) {
        const response = await axios.post(
            prefixUrlApi + "auth/register/",
            {
                "username" : username,
                "email": email,
                "password": password
            },
            {
                withCredentials: true
            }
        )
        return response.data
    }

    async login(usernameOrEmail, password) {
        let loginField = usernameOrEmail.includes("@") ? "email" : "username";

        const response = await axios.post(
            prefixUrlApi + "auth/login/",
            {
                [loginField]: usernameOrEmail,
                "password": password 
            },
            {
                withCredentials: true
            }
        )
        return response.data
    }

    async getProfile() {
        const response = await axios.get(
            prefixUrlApi + "user/profile/",
            {
                withCredentials: true
            }
        )
        return response.data
    }

    async getServices() {
        const response = await axios.get(
            prefixUrlApi + "services/",
            {
                withCredentials: true
            }
        )
        return response.data
    }
}

export default new RequestApi()