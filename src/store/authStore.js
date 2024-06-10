import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from 'axios'

let timer

export const useAuthStore = defineStore("auth", () => {

    const userId = ref(null)
    const tokenID = ref(null)

    async function signup(payload) {

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE4d5A0T-lpGmWaYUGWFmncOBMahEZGoA', {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })


            if (response.status !== 200) {
                throw new Error(response.data.message || 'could not create')
            } else {

                const expiresIn = +response.data.expiresIn * 1000;
                const expirationDate = new Date().getTime + expiresIn;

                localStorage.setItem('userID', response.data.localId)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationToken', expirationDate)

                userId.value = response.data.localId
                tokenID.value = response.data.idToken

                timer = setTimeout(function () {
                    logout()
                }, expiresIn)

                return { code: response.status, msg: 'Success' }
            }
        } catch (e) {

            return { code: e.response.status, msg: e.response.data.error.message }
        }
    }

    async function login(payload) {
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAE4d5A0T-lpGmWaYUGWFmncOBMahEZGoA', {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })

            if (response.status !== 200) {
                console.log(response, '');
                const error = new Error(response.data.message || 'could not create')
            } else {

                const expiresIn = +response.data.expiresIn * 1000;
                const expirationDate = new Date().getTime + expiresIn;



                localStorage.setItem('userID', response.data.localId)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationToken', expirationDate)

                userId.value = response.data.localId
                tokenID.value = response.data.idToken

                timer = setTimeout(function () {
                    logout()
                }, expiresIn)

                return { code: response.status, msg: 'Success' }
            }

        } catch (e) {
            return { code: e.response.status, msg: e.response.data.error.message }
        }
    }
    async function tryLogin() {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('userID')
        const tokenExpiration = localStorage.getItem('expirationToken')

        const expiresIn = +tokenExpiration - new Date().getTime()

        if (expiresIn < 10000) {
            return
        }

        timer = setTimeout(function () {
            logout()
        }, expiresIn)

        if (token && id) {
            userId.value = id
            tokenID.value = token
        }
    }
    function logout() {
        userId.value = null
        tokenID.value = null

        clearTimeout(timer)


        localStorage.removeItem('userID')
        localStorage.removeItem('token')
        localStorage.removeItem('expirationToken')

    }
    const returnToken = computed(() => {
        return tokenID
    })
    return { userId, tokenID, signup, login, returnToken, logout, tryLogin }
})