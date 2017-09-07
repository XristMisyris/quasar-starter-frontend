// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, { Loading } from 'quasar'
import router from './router'
import auth from 'auth'
import axios from 'axios'

// Icons
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}

Vue.use(Quasar) // Install Quasar Framework

axios.defaults.baseURL = 'http://localhost:8080/api/v1'
// Check if user is logged in or not + refresh token
auth.checkAuth(this)

// Loading indicator for ajax requests + refresh token if token is expired
axios.interceptors.request.use(function (config) {
  Loading.show()
  return config
}, function (error) {
  Loading.hide()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  Loading.hide()
  // Refresh Token if token is expired
  if (response.status === 401 && response.body.error === 'token_expired') {
    auth.refreshToken()
    auth.showLoading()
  }
  return response
}, function (error) {
  Loading.hide()
  return Promise.reject(error)
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
