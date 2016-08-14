import Vue from 'vue'
import VueTouch from 'vue-touch'
// import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Quasar from 'quasar'
import Router from './router'
import Auth from './auth'

Vue.use(VueTouch) // Touch events
// Vue.use(Vuex) // State Management
Vue.use(VueResource) // Ajax Requests
Vue.use(Quasar) // Install Quasar Framework

// Check the user's auth status when the app starts
Auth.checkAuth()

/*
  If overriding Quasar style, leave uncommented
  just the first line.

  If NOT overriding Quasar style, leave uncommented
  just the second line. This option make compiling faster.

  WARNING!
  Leave just one of the two require() calls below
  uncommented.
 */
// require('./themes/app.' + __THEME + '.styl')
require('quasar/dist/quasar.' + __THEME + '.css')

Quasar.start(() => {
  Router.start(Vue.extend({}), '#quasar-app')
})
