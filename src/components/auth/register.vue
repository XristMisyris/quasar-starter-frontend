<template>
  <div>
    <div slot="header" class="toolbar">
      <button v-go-back="'/'">
        <i>arrow_back</i>
      </button>
      <q-toolbar-title :padding="1">
        Register
      </q-toolbar-title>
    </div>
    <div class="layout-view layout-padding">
      <div class="list">
        <div class="item three-lines">
          <i class="item-primary">face</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.name" required placeholder="Your name" class="full-width">
              <label>Name</label>
            </div>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <i class="item-primary">mail</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.email" required placeholder="Your email address" class="full-width">
              <label>Email</label>
            </div>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <i class="item-primary">vpn_key</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.password" type="password" required placeholder="Your password" class="full-width">
              <label>Password</label>
            </div>
          </div>
        </div>
      </div>
      <button class="primary full-width" @click="submit()">Register</button>
    </div>
  </div>
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
        auth.signup(this.credentials, 'profile')
      }
    }
  }
</script>
