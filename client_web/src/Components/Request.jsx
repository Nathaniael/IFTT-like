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
            }
        )
        return response.data
    }

    async login(usernameOrEmail, password) {
        let data;

        if (usernameOrEmail.includes("@")) {
            data = {
                "email": usernameOrEmail,
                "password": password
            }
        } else {
            data = {
                "username": usernameOrEmail,
                "password": password
            }
        }
        
        const response = await axios.post(prefixUrlApi + "auth/login/", data)
        console.log(response)
        return response.data
    }

    async getProfile() {
        const response = await axios.get(prefixUrlApi + "user/profile/")
        return response.data
    }

    async getServices(access_token) {
        const response = await axios.get(prefixUrlApi + "services/",
        {
            headers: {
                access_token: access_token
            }
        })
        return response.data  
    }
}

export default new RequestApi()