import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from 'auth'
import { LocalStorage } from 'quasar'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('index/index'), beforeEnter: checkAuth }, // Default
    { path: '/login', component: load('auth/login') }, // Login
    { path: '/register', component: load('auth/register') }, // Register
    { path: '/profile', component: load('profile/profile'), beforeEnter: checkAuth }, // Profile
    { path: '/jokes', component: load('jokes/jokes'), beforeEnter: checkAuth } // Profile
  ]
})

function checkAuth (to, from, next) {
  if (to.path === '/' && auth.user.authenticated) {
    next('/profile')
  }
  else if (!LocalStorage.get.item('id_token') && to.path !== '/') {
    console.log('not logged')
    next('/login')
  }
  else {
    next()
  }
}
