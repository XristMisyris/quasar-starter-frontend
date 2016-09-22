<template>
  <div>
    <div class="list striped multiple-lines">
      <div class="item" v-for="joke in jokes">
        <div class="item-content">
          <div>{{ joke.joke }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from '../auth'

  export default{
    data () {
      return {
        jokes: []
      }
    },

    methods: {
      fetchJokes () {
        this.$http({url: 'http://localhost:8000/api/v1/jokes', method: 'GET'}).then(function (response) {
          this.$set('jokes', response.json().data)
        })
      }
    },

    ready () {
      this.fetchJokes()
    },

    route: {
      canActivate () {
        return Auth.user.authenticated
      }
    }
  }
</script>
