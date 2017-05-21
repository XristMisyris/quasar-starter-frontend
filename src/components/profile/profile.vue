<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="$refs.menu.$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        Profile
      </q-toolbar-title>
    </div>

    <q-menu ref="menu"></q-menu>

    <div class="layout-view">
      <div class="text-center">
        <h4>Hello {{ user.data.name }}</h4>
      </div>
    </div>
  </q-layout>
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

    components: {
      'q-menu': menu
    }
  }
</script>
