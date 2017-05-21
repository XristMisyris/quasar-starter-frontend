<template>
  <q-drawer ref="leftDrawer" :swipe-only="true">
    <div class="toolbar light">
      <q-toolbar-title :padding="1">
        Quasar Frontend
      </q-toolbar-title>
    </div>

    <div class="list no-border platform-delimiter">
      <div class="list item-inset-delimiter">
        <q-drawer-link icon="account_circle" to="/profile">
          Profile
        </q-drawer-link>
        <div class="item" v-go-back="'/'" @click="logout()">
          <i class="item-primary">exit_to_app</i>
          <div class="item-content">Logout</div>
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<style></style>

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
