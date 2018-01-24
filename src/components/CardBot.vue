<template>
  <div class="card-bot">
    <div class="card-bot__image">
      <img src="../assets/images/avatar.png" alt="">
    </div>
    <div class="card-bot__content">
      <div class="card-bot__info">
        <span class="card-bot__title">{{ bot_title }}</span>
        <span class="card-bot__author">{{ bot_author }}</span>
      </div>
      <div class="card-bot__text">
        {{ bot_text }}
      </div>
    </div>
    <div class="card-bot--tags">
      <span class="badge">chers</span>
      <span class="badge">bug</span>
      <span class="badge">precaition</span>
      <span class="badge">virus</span>
      <span class="badge">disease</span>
      <span class="badge">symptoms</span>
      <span class="badge">...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBot',
  data () {
    return {
      bot_title: 'Bot-ZicaVirus',
      bot_author: 'david_gazques',
      bot_text: 'ASwimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects'
    }
  }
}
</script>

<style scoped lang="scss">
  .card-bot {
    display: flex;
    background-color: #ccc;
    border-radius: 20px;
    padding: 20px;
  }
  .card-bot__image {
    width: 134px;
    img {
      width: 100%;
    }
  }
  .container {
    width: 80%;
    position: relative;
    margin: 0 auto;
    font-weight: normal;
  }
</style>
