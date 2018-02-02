<template>
  <div class="main">
    <top-bar></top-bar>

    <div class="container">
      <div class="search">
        <search></search>
      </div>
    </div>

    <section class="best-of-month">
      <div class="container">
        <div class="card-list">
          <h3 class="section-title">
            {{ best_of_month_title }}
          </h3>
          <card-bot></card-bot>
        </div>
      </div>
    </section>

    <!--<div class="badge badge&#45;&#45;danger">Danger</div>-->

    <section class="cta">
      <div class="cta-content">
        <p>
          Bothub is a project created for and by developers.
          for and by developers. Are you a developers
          Would you like to collaborate.
        </p>
        <a href="#" class="btn">Start your Bot</a>
      </div>
    </section>

    <section class="top-authors">
      <h3 class="section-title">
        {{ top_authors_title }}
      </h3>
      <div class="container">
        <div class="authors-list">
          <card-author></card-author>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import CardBot from './CardBot.vue'
import CardAuthor from './CardAuthor.vue'
import Search from './Search.vue'
import TopBar from './TopBar.vue'

export default {
  name: 'HomePage',
  components: {
    CardBot,
    CardAuthor,
    Search,
    TopBar
  },
  data () {
    return {
      best_of_month_title: 'Best bots of the month',
      top_authors_title: 'Top Authors'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/_variables';
  @import '../assets/scss/_colors';
</style>
