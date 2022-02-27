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
        let data = {};

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
        console.log(data)
        const response = await axios.post(prefixUrlApi + "auth/login", data)
        return response.data
    }
}

export default new RequestApi()