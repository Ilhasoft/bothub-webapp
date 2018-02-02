<template>
  <div class="container">
    <!--<topbar></topbar>-->
    <h1>{{ mensagem }} <span>{{ subtitulo }}</span></h1>
    <div class="search">
      <search></search>
    </div>
    <div class="card-list">
      <h3 class="section-title">
        Best bots of the month
      </h3>
    </div>

    <div class="badge badge--danger">Danger</div>
    <card-bot></card-bot>

  <section class="top-authors">
    <h3 class="section-title">
      Top Authors
    </h3>
    <div class="authors-list">
      <div class="card-author">
        <div class="card-author__image">
          <img src="../assets/images/man.png" alt="">
        </div>
        <div class="card-author__info">
          <div class="author__name">Matthew Russell</div>
          <div class="author__info">
          <span class="author__location">
            Granada, Andalusia, Spain
          </span>
            <span class="author__joined">
            Joined 2 years ago · last seen 9 days ago
          </span>
          </div>
          <a href="#" class="auhor__url">http://davidgasquez.buthub.api/</a>
          <span class="author__bot-counts">60 bots</span>
        </div>
      </div>
      <div class="card-author">
        <div class="card-author__image">
          <img src="../assets/images/man.png" alt="">
        </div>
        <div class="card-author__info">
          <div class="author__name">Matthew Russell</div>
          <div class="author__info">
          <span class="author__location">
            Granada, Andalusia, Spain
          </span>
            <span class="author__joined">
            Joined 2 years ago · last seen 9 days ago
          </span>
          </div>
          <a href="#" class="auhor__url">http://davidgasquez.buthub.api/</a>
          <span class="author__bot-counts">60 bots</span>
        </div>
      </div>
      <div class="card-author">
        <div class="card-author__image">
          <img src="../assets/images/man.png" alt="">
        </div>
        <div class="card-author__info">
          <div class="author__name">Matthew Russell</div>
          <div class="author__info">
          <span class="author__location">
            Granada, Andalusia, Spain
          </span>
            <span class="author__joined">
            Joined 2 years ago · last seen 9 days ago
          </span>
          </div>
          <a href="#" class="auhor__url">http://davidgasquez.buthub.api/</a>
          <span class="author__bot-counts">60 bots</span>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import CardBot from './CardBot.vue'
import Search from './Search.vue'
import TopBar from './TopBar.vue'

export default {
  name: 'HomePage',
  components: {
    CardBot,
    Search,
    TopBar
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
/*Card Author */
  .authors-list {
    display: flex;
  }
  .card-author {
    background-color: #fff;
    border-radius: 10px;
    width: 33%;
    padding: 20px;
    display: flex;
    margin: 15px;
  }
  .card-author__image {
    width: 100px;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 10px;
    img {
      width: 100%;
    }
  }
  .card-author__info {
    width: calc(100% - 120px);
  }
</style>
