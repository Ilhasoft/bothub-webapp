<template>
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
</template>

<script>
export default {
  name: 'BotCategory'
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/_colors';
  .bot-category {
    padding: 50px 10px 0;
    background-color: #F8F8F8;
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
