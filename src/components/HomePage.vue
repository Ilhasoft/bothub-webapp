<template>
  <div class="main">
    <top-bar></top-bar>

    <div class="container">
      <search></search>
    </div>

    <div class="bot-category">
      <div class="container">
          <bot-category></bot-category>
      </div>
    </div>

    <section class="best-of-month">
      <div class="container">
        <h3 class="section-title">
          {{ best_of_month_title }}
        </h3>
        <card-bot></card-bot>
        <card-bot></card-bot>
        <card-bot></card-bot>
      </div>
    </section>

    <!--<div class="badge badge&#45;&#45;danger">Danger</div>-->

    <cta></cta>

    <section class="top-bots">
      <div class="container">
        <h3 class="section-title">
          {{ top_bots }}
        </h3>
        <card-bot></card-bot>
        <card-bot></card-bot>
        <card-bot></card-bot>
      </div>
    </section>

    <section class="top-authors">
      <h3 class="section-title">
        {{ top_authors_title }}
      </h3>
      <div class="container">
        <div class="authors-list">
          <card-author></card-author>
          <card-author></card-author>
          <card-author></card-author>
        </div>
      </div>
    </section>

    <home-footer></home-footer>
  </div>
</template>

<script>
import TopBar from './TopBar.vue'
import Search from './Search.vue'
import BotCategory from './BotCategory.vue'
import CardBot from './CardBot.vue'
import CardAuthor from './CardAuthor.vue'
import Cta from './Cta.vue'
import HomeFooter from './HomeFooter.vue'

export default {
  name: 'HomePage',
  components: {
    TopBar,
    Search,
    BotCategory,
    CardBot,
    CardAuthor,
    Cta,
    HomeFooter
  },
  data () {
    return {
      best_of_month_title: 'Best bots of the month',
      top_bots: 'Top Bots',
      top_authors_title: 'Top Authors'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/_variables';
  @import '../assets/scss/_colors';
  .best-of-month,
  .top-bots,
  .top-authors {
    padding: 40px 0;
  }
  .best-of-month,
  .top-authors,
  .top-bots {
    background-color: #F8F8F8;
  }

  .bot-category {
    padding: 50px 10px 0;
    background-color: #F8F8F8;
  }

  /*Authors List*/
  .authors-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
