<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Router from './router'
  export default {
    mounted () {
      Router.replace('/welcome')
    }
  }
</script>

<style></style>
