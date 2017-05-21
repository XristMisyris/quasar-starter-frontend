<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="$refs.menu.$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        Jokes
      </q-toolbar-title>
    </div>

    <q-menu ref="menu"></q-menu>

    <div class="layout-view">
      <div class="layout-padding">
        <div class="list striped multiple-lines">
          <div class="item" v-for="joke in jokes.data">
            <div class="item-content">
              <div>{{ joke.joke }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import { Toast } from 'quasar'
  import axios from 'axios'
  import menu from '../layouts/menu'

  export default{
    data () {
      return {
        jokes: []
      }
    },

    mounted () {
      this.fetchJokes()
    },

    methods: {
      fetchJokes () {
        axios.get('jokes').then((response) => {
          this.jokes = response.data
        }, () => {
          Toast.create.negative('Something went wrong!')
        })
      }
    },

    components: {
      'q-menu': menu
    }
  }
</script>
