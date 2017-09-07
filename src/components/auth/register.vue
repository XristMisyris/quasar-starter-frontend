<template>
  <div>
    <q-toolbar>
      <q-btn flat v-go-back=" '/' ">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Register
      </q-toolbar-title>
    </q-toolbar>
    <div class="layout-view layout-padding">
      <q-field icon="face">
        <q-input v-model="credentials.name" placeholder="Your name" class="full-width" />
      </q-field>
      <q-field icon="mail">
        <q-input v-model="credentials.email" placeholder="Your email address" class="full-width" />
      </q-field>
      <q-field icon="vpn_key">
        <q-input v-model="credentials.password" type="password" placeholder="Your password" class="full-width" />
      </q-field>
      <q-btn color="primary" class="full-width" @click="submit()">Register</q-btn>
    </div>
  </div>
</template>

<script>
  import { GoBack, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput } from 'quasar'
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
    },

    components: { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput },

    directives: { GoBack }
  }
</script>
