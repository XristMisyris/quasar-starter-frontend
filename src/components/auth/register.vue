<template>
  <quasar-layout>
    <div slot="header" class="toolbar">
      <quasar-toolbar-title :padding="1">
        <button v-link="{path: '/'}">
          <i>arrow_back</i>
        </button>
        Register
      </quasar-toolbar-title>
    </div>
    <div class="layout-view">
      <div class="list inner-delimiter bordered">
        <div class="list-header">Register</div>
        <div class="item floating-label">
          <div class="item-content">
            <input v-model="credentials.name" required>
            <label>Name</label>
          </div>
        </div>
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
      <button class="primary" @click="submit()">Register</button>
    </div>
  </quasar-layout>
</template>

<script>
  import auth from '../../auth'

  export default {
    data () {
      return {
        credentials: {
          name: '',
          email: '',
          password: ''
        }
      }
    },

    methods: {
      submit () {
        var credentials = {
          name: this.credentials.name,
          email: this.credentials.email,
          password: this.credentials.password
        }
        auth.signup(this, credentials, 'jokes')
      }
    }
  }
</script>
