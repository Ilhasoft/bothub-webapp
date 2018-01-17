<template>
  <div>
    <h1>{{ mensagem }} <span>{{ subtitulo }}</span></h1>
    <card-bot></card-bot>
  </div>
</template>

<script>
import CardBot from './CardBot.vue'

export default {
  name: 'HomePage',
  components: {
    CardBot
  },
  data () {
    return {
      mensagem: 'Título da página',
      subtitulo: 'Aqui entra o subtitulo'
    }
  }
}
</script>

<style scoped lang="scss">
  h1 {
    width: 80%;
    position: relative;
    margin: 0 auto;
    font-weight: normal;
    background-color: #42b983;
    span {
      color: #FFF;
      display: block;
      font-size: 16px;
    }
  }
</style>
