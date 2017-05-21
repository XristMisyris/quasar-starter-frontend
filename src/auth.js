import Router from './router'
import { Toast, LocalStorage, Loading } from 'quasar'
import axios from 'axios'

const API_URL = 'http://quasar-back.dev/api/v1/'
const LOGIN_URL = API_URL + 'authenticate'
const SIGNUP_URL = API_URL + 'register'
const USER_URL = API_URL + 'authenticate/user'

export default {

  user: {
    authenticated: false
  },

  login (creds, redirect) {
    axios.post(LOGIN_URL, creds)
      .then((response) => {
        LocalStorage.set('id_token', response.data.token)

        this.user.authenticated = true
        axios.defaults.headers.common['Authorization'] = 'Bearer: ' + LocalStorage.get.item('id_token')
        this.getAuthUser()

        if (redirect) {
          setTimeout(() => Router.replace(redirect), 700)
        }
      })
      .catch(function (error) {
        Toast.create.negative(error.response.data.message)
      })
  },

  signup (creds, redirect) {
    axios.post(SIGNUP_URL, creds)
      .then((response) => {
        LocalStorage.set('id_token', response.data.token)

        this.user.authenticated = true
        axios.defaults.headers.common['Authorization'] = 'Bearer: ' + LocalStorage.get.item('id_token')
        this.getAuthUser()

        if (redirect) {
          setTimeout(() => Router.replace(redirect), 700)
        }
      })
      .catch(function (error) {
        Toast.create.negative(error.response.data.message)
      })
  },

  logout () {
    LocalStorage.clear()
    this.user.authenticated = false
    Router.replace('/')
  },

  checkAuth () {
    let jwt = LocalStorage.get.item('id_token')

    if (jwt) {
      this.user.authenticated = true
      axios.defaults.headers.common['Authorization'] = 'Bearer: ' + LocalStorage.get.item('id_token')
      this.refreshToken()
    }
    else {
      this.user.authenticated = false
    }
  },

  refreshToken () {
    var that = this

    axios.post(API_URL + 'refresh-token').then(function (response) {
      // Store refreshed token
      axios.defaults.headers.common['Authorization'] = 'Bearer: ' + response.data.token
      LocalStorage.set('id_token', response.data.token)
      Toast.create.positive('Successful login!!')
      that.getAuthUser()
    }, function () {
      Toast.create.negative('Something went wrong with your login!!')
      that.logout()
    })
  },

  getAuthUser () {
    axios.get(USER_URL).then((response) => {
      LocalStorage.set('user', response.data)
    }, () => {
      Toast.create.negative('Something went wrong!')
    })
  },

  showLoading () {
    Loading.show({
      message: 'Αποσυνδεθήκατε για λόγους ασφαλίας.\n Επανασύνδεση....'
    })
    setTimeout(() => {
      Loading.hide()
    }, 2000)
  }
}
