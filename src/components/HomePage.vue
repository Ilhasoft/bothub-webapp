<template>
  <div class="container">
    <h1>{{ mensagem }} <span>{{ subtitulo }}</span></h1>
    <div class="search">
      <search></search>
    </div>
    <div class="card-list">
      <h3 class="card-list__title">
        Best bots of the month
      </h3>
    </div>

    <div class="badge badge--danger">Danger</div>
    <card-bot></card-bot>
  </div>
</template>

<script>
import CardBot from './CardBot.vue'
import Search from './Search.vue'

export default {
  name: 'HomePage',
  components: {
    CardBot,
    Search
  },
  data () {
    return {
      mensagem: 'Robot Society',
      subtitulo: 'TRAIN YOURS'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/_variables';
  h1 {
    font-family: $font-secondary;
    width: 100%;
    position: relative;
    margin: 0 auto;
    font-weight: normal;
    background-color: #42b983;
    text-align: center;
    span {
      color: #FFF;
      display: block;
      font-size: 16px;
      font-weight: 300;
    }
  }
</style>
