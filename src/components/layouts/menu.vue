<template>
  <quasar-layout>
    <div slot="header" class="toolbar">
      <button class="left-drawer-opener">
        <i>menu</i>
      </button>
      <quasar-toolbar-title :padding="1">
        Quasar Layout
      </quasar-toolbar-title>
      <button class="right-drawer-opener">
        <i>assignment</i>
      </button>
    </div>

    <quasar-drawer>
      <div class="toolbar light">
        <quasar-toolbar-title :padding="1">
          Menu
        </quasar-toolbar-title>
      </div>

      <div class="list platform-delimiter">
        <quasar-drawer-link v-link="{path: '/jokes', exact: true}" icon="view_quilt">
          Jokes
        </quasar-drawer-link>
        <quasar-drawer-link v-link="{path: '/profile', exact: true}" icon="account_circle">
          Profile
        </quasar-drawer-link>
        <quasar-drawer-link @click="logout()" icon="exit_to_app">
          Logout
        </quasar-drawer-link>
      </div>
    </quasar-drawer>

    <router-view class="layout-view"></router-view>

    <quasar-drawer right-side swipe-only>
      <div class="toolbar light">
        <quasar-toolbar-title :padding="1">
          Right-side Drawer
        </quasar-toolbar-title>
      </div>

      <p style="padding: 25px;" class="text-grey-7">
        This is yet another Drawer that does not gets displayed alongside content on
        bigger screens.
      </p>
    </quasar-drawer>
  </quasar-layout>
</template>
<style>

</style>
<script>
  import Auth from '../../auth'

  export default{
    methods: {
      logout () {
        Auth.logout()
      }
    }
  }
</script>
