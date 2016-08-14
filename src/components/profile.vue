<template>
  <div class="layout-padding">
    <h2>Hello {{ user.name }}!!</h2>
  </div>
</template>

<script>
  import { LocalStorage } from 'quasar'
  import Auth from '../auth'

  export default{
    data () {
      return {
        user: LocalStorage.get.item('user')
      }
    },

    route: {
      canActivate () {
        return Auth.user.authenticated
      }
    }
  }
</script>
