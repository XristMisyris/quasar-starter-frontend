<template>
  <div>
    <div class="layout-view">
      <div class="text-center">
        <h4>Hello {{ user.data.name }}!!</h4>
      </div>
    </div>
  </div>
</template>

<script>
  import { LocalStorage } from 'quasar'
  import menu from '../layouts/menu'

  export default{
    data () {
      return {
        user: LocalStorage.get.item('user')
      }
    },

    components: { 'q-menu': menu }
  }
</script>
