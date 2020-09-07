import Requests from './requests.js'

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('HEJSAN')

    document.getElementById('switchToLogin').addEventListener('click', (e) => {
        document.getElementById('createForm').classList.add('hidden')
        document.getElementById('createSwitch').classList.add('hidden')
        document.getElementById('loginForm').classList.remove('hidden')
        document.getElementById('loginSwitch').classList.remove('hidden')
    })

    document.getElementById('switchToCreate').addEventListener('click', (e) => {
        document.getElementById('createForm').classList.remove('hidden')
        document.getElementById('createSwitch').classList.remove('hidden')
        document.getElementById('loginForm').classList.add('hidden')
        document.getElementById('loginSwitch').classList.add('hidden')
    })

    document.getElementById('createBtn').addEventListener('click', async (e) => {
        e.preventDefault()
        const username = document.getElementById('newUsername').value
        const password = document.getElementById('newPassword').value

        const result = await Requests.createAccount(username, password)
        document.getElementById('newPassword').value = ''
        document.getElementById('newUsername').value = ''
        console.log(result)
    })

    document.getElementById('loginBtn').addEventListener('click', async (e) => {
        e.preventDefault()

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const res = await Requests.loginUser(username, password)
        document.getElementById('newPassword').value = ''
        document.getElementById('newUsername').value = ''

        localStorage.setItem('token', res)
        const token = localStorage.getItem('token')
    })
})