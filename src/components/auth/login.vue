<template>
  <quasar-layout>
    <div slot="header" class="toolbar">
      <quasar-toolbar-title :padding="1">
        <button v-link="{path: '/'}">
          <i>arrow_back</i>
        </button>
        Login
      </quasar-toolbar-title>
    </div>
    <div class="layout-view">
      <div class="list inner-delimiter bordered">
        <div class="list-header">Login</div>
        <div class="item floating-label">
          <div class="item-content">
            <input v-model="credentials.email" required>
            <label>Email</label>
          </div>
        </div>
        <div class="item floating-label">
          <div class="item-content">
            <input v-model="credentials.password" type="password" required>
            <label>Password</label>
          </div>
        </div>
      </div>
      <button class="primary" @click="submit()">Login</button>
    </div>
  </quasar-layout>
</template>

<script>
  import auth from '../../auth'

  export default {
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        }
      }
    },

    methods: {
      submit () {
        var credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }
        auth.login(this, credentials, 'jokes')
      }
    }
  }
</script>
