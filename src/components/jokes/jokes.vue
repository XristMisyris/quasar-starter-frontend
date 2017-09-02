<template>
  <div>
    <div class="layout-view">
      <div class="layout-padding">
        <q-list striped-odd sparse no-border>
          <q-item v-for="joke in jokes.data" :key="joke.id">
            <q-item-main>
              <q-item-tile label>{{ joke.joke }}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast, QList, QItem, QItemMain, QItemTile } from 'quasar'
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
        axios.get('jokes')
          .then((response) => {
            this.jokes = response.data
          }, () => {
            Toast.create.negative('Something went wrong!')
          })
      }
    },

    components: { 'q-menu': menu, QList, QItem, QItemMain, QItemTile }
  }
</script>
