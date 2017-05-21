// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import auth from 'auth'
import axios from 'axios'

Vue.use(Quasar) // Install Quasar Framework

// Check if user is logged in or not + refresh token
auth.checkAuth(this)

// Loading indicator for ajax request + refresh token if token is expired
axios.interceptors.request.use(function (config) {
  Quasar.Loading.show()
  return config
}, function (error) {
  Quasar.Loading.hide()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  Quasar.Loading.hide()
  if (response.status === 401 && response.body.error === 'token_expired') {
    auth.refreshToken()
    auth.showLoading()
  }
  return response
}, function (error) {
  Quasar.Loading.hide()
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
