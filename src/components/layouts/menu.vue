<template>
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>

    <!-- Left Side Panel -->
    <div slot="left">
      <q-list-header>Menu</q-list-header>
      <q-list no-border link inset-separator>
        <q-side-link item to="/jokes">
          <q-item-side icon="list" />
          <q-item-main label="Jokes"/>
        </q-side-link>
        <q-side-link item to="/profile">
          <q-item-side icon="account_circle" />
          <q-item-main label="Profile" />
        </q-side-link>
        <hr>
        <q-item class="item" v-go-back="'/'" @click="logout()">
          <q-item-side>
            <q-item-tile icon="exit_to_app" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>Logout</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <router-view />

  </q-layout>
</template>

<style></style>

<script>
  import { GoBack, QLayout, QToolbar, QBtn, QIcon, QToolbarTitle, QList, QSideLink, QItemSide, QItemMain, QItem, QItemTile, QListHeader } from 'quasar'
  import Auth from '../../auth'

  export default{
    data () {
      return {
        title: ''
      }
    },

    watch: {
      '$route' () {
        this.title = this.$route.meta.title
      }
    },

    mounted () {
      this.title = this.$route.meta.title
    },

    methods: {
      logout () {
        Auth.logout()
      }
    },

    components: { QLayout, QToolbar, QBtn, QIcon, QToolbarTitle, QList, QSideLink, QItemSide, QItemMain, QItem, QItemTile, QListHeader },

    directives: { GoBack }
  }
</script>
