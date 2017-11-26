import Router from './router'
import { Toast, LocalStorage, Loading } from 'quasar'
import axios from 'axios'

const LOGIN_URL = 'authenticate'
const SIGNUP_URL = 'register'
const USER_URL = 'authenticate/user'
const REFRESH_TOKEN = 'refresh-token'

export default {

  user: {
    authenticated: false
  },

  login (creds, redirect) {
    axios.post(LOGIN_URL, creds)
      .then((response) => {
        LocalStorage.set('id_token', response.data.token)

        this.user.authenticated = true
        axios.defaults.headers.common['Authorization'] = 'Bearer : ' + LocalStorage.get.item('id_token')
        this.getAuthUser()

        if (redirect) {
          setTimeout(() => Router.replace(redirect), 700)
        }
      })
      .catch((error) => {
        Toast.create.negative(error.response.data.message)
      })
  },

  signup (creds, redirect) {
    axios.post(SIGNUP_URL, creds)
      .then((response) => {
        LocalStorage.set('id_token', response.data.token)

        this.user.authenticated = true
        axios.defaults.headers.common['Authorization'] = 'Bearer : ' + LocalStorage.get.item('id_token')
        this.getAuthUser()

        if (redirect) {
          setTimeout(() => Router.replace(redirect), 700)
        }
      })
      .catch((error) => {
        Toast.create.negative(error.response.data.message)
      })
  },

  logout () {
    LocalStorage.clear()
    this.user.authenticated = false
    Router.replace('/')
    Toast.create.positive('You\'ve been logged out successfully.')
  },

  checkAuth () {
    let jwt = LocalStorage.get.item('id_token')

    if (jwt) {
      this.user.authenticated = true
      axios.defaults.headers.common['Authorization'] = 'Bearer : ' + LocalStorage.get.item('id_token')
      this.refreshToken()
    }
    else {
      this.user.authenticated = false
    }
  },

  refreshToken () {
    var that = this

    axios.post(REFRESH_TOKEN)
      .then((response) => {
        // Store refreshed token
        axios.defaults.headers.common['Authorization'] = 'Bearer : ' + response.data.token
        LocalStorage.set('id_token', response.data.token)
        Toast.create.positive('You have successfully logged in.')
        that.getAuthUser()
      }, () => {
        Toast.create.negative('Something went wrong with your login!!')
        that.logout()
      })
  },

  getAuthUser () {
    axios.get(USER_URL)
      .then((response) => {
        LocalStorage.set('user', response.data)
      }, () => {
        Toast.create.negative('Something went wrong!')
      })
  },

  showLoading () {
    Loading.show({
      message: 'You got disconnected for security reasons.\n Reconnecting....'
    })
    setTimeout(() => {
      Loading.hide()
    }, 2000)
  }
}
