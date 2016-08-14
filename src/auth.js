import Vue from 'vue'
import Router from './router'
import { Toast, LocalStorage } from 'quasar'

const API_URL = 'http://localhost:8000/api/v1/'
const LOGIN_URL = API_URL + 'authenticate'
const SIGNUP_URL = API_URL + 'register'
const USER_URL = API_URL + 'authenticate/user'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then((response) => {
      LocalStorage.set('id_token', response.json().token)

      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + LocalStorage.get.item('id_token')
      this.getAuthUser(context)

      if (redirect) {
        Router.go(redirect)
      }
    }, (response) => {
      Toast.create.negative(response.json().error)
    })
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds).then((response) => {
      LocalStorage.set('id_token', response.json().token)

      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + LocalStorage.get.item('id_token')
      this.getAuthUser(context)

      if (redirect) {
        Router.go(redirect)
      }
    }, (response) => {
      Toast.create.negative(response.json().error)
    })
  },

  logout () {
    LocalStorage.clear()
    this.user.authenticated = false
    window.location.replace('/')
  },

  checkAuth () {
    var jwt = LocalStorage.get.item('id_token')

    if (jwt) {
      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + jwt
    }
    else {
      this.user.authenticated = false
    }
  },

  getAuthUser (context) {
    context.$http.get(USER_URL).then((response) => {
      console.log(response.json())
      LocalStorage.set('user', response.json())
    }, (response) => {
      Toast.create.negative('Something went wrong!')
    })
  }
}
