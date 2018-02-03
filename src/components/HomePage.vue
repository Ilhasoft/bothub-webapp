<template>
  <div class="main">
    <top-bar></top-bar>

    <div class="container">
      <search></search>
    </div>

    <div class="bot-category">
      <div class="container">
        <ul class="bot-category__list">
          <li class="bot-category__item">
            <a class="bot-category__content bot-category__content--active" href="">All bots</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Business</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Communication</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Project</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Education</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Entertainment</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Finance</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Health</a>
          </li>
          <li class="bot-category__item">
            <a class="bot-category__content" href="">Identity</a>
          </li>
        </ul>
      </div>
    </div>

    <section class="best-of-month">
      <div class="container">
        <h3 class="section-title">
          {{ best_of_month_title }}
        </h3>
        <card-bot></card-bot>
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

    <section class="top-bots">
      <div class="container">
        <h3 class="section-title">
          {{ top_bots }}
        </h3>
        <card-bot></card-bot>
      </div>
    </section>

    <section class="top-authors">
      <h3 class="section-title">
        {{ top_authors_title }}
      </h3>
      <div class="container">
        <card-author></card-author>
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
  .top-bots,
  .bot-category {
    background-color: #F8F8F8;
  }
  .bot-category {
    padding: 50px 10px 0;
  }
  .bot-category__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .bot-category__item {
    padding: 3px;
    color: #000;
    font-size: 14px;
    .bot-category__content {
      border: 1px solid #EAE7E6;
      text-decoration: none;
      padding: 15px 24px;
      display: block;
      border-radius: 5px;
      color: #000;
      transition: all 0.2s ease-in-out;
      &:hover,
      &--active {
        border-color: $primary-color;
        background-color: $primary-color;
        color: #FFF;
      }
      &--active {
        font-weight: 500;
      }
    }
  }

</style>
