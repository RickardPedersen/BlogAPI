const url = 'http://localhost:7070'

class Requests {
    static async createAccount(username, password) {
        const data = {
            username,
            password
        }

        const response = await fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json()
    }

    static async loginUser(username, password) {
        const data = {
            username,
            password
        }

        const response = await fetch(`${url}/authentication/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json()
    }
}

export default Requests
