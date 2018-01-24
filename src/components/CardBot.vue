<template>
  <div class="card-bot">
    <ul class="bot-card__summary">
      <li class="bot-summary__item">6547 issues <i class="material-icons">lightbulb_outline</i></li>
      <li class="bot-summary__item">547 copy <i class="material-icons">content_copy</i></li>
      <li class="bot-summary__item">321 stars <i class="material-icons">grade</i></li>
    </ul>
    <up-down-vote></up-down-vote>
    <div class="card-bot__image">
      <img src="../assets/images/avatar.png" alt="">
    </div>
    <div class="card-bot__content">
      <div class="card-bot__header">
        <span class="card-bot__title">{{ bot_title }}</span>
        <span class="card-bot__author">{{ bot_author }}</span>
      </div>
      <div class="card-bot__info">
        <div class="card-bot__updated">
          Updated 2 weeks ago by {{ bot_author_name }}
        </div>
        <ul class="card-bot__flags">
          <li class="flags-item"><img src="../assets/images/flags/EN.png" alt="Flag ES"></li>
          <li class="flags-item"><img src="../assets/images/flags/ES.png" alt="Flag ES"></li>
          <li class="flags-item"><img src="../assets/images/flags/PT.png" alt="Flag PT"></li>
          <li class="flags-item"><img src="../assets/images/flags/IT.png" alt="Flag IT"></li>
          <li class="flags-item"><img src="../assets/images/flags/NL.png" alt="Flag NL"></li>
          <li class="flags-item"><img src="../assets/images/flags/FR.png" alt="Flag FR"></li>
          <li class="flags-item"><img src="../assets/images/flags/DE.png" alt="Flag DE"></li>
        </ul>
      </div>
      <div class="card-bot__excerpt">
        {{ bot_text }}
      </div>
      <div class="card-bot__badge">
        <span class="badge">cheers</span>
        <span class="badge">bug</span>
        <span class="badge">precaution</span>
        <span class="badge">virus</span>
        <span class="badge">disease</span>
        <span class="badge">symptoms</span>
        <span class="badge">...</span>
      </div>
    </div>
    <div class="bot-action">
      <a href="#" class="btn btn-update">Update <i class="material-icons">refresh</i></a>
      <a href="#" class="btn btn-available-update">Available Update <i class="material-icons">refresh</i></a>
    </div>
  </div>
</template>

<script>
import UpDownVote from './UpDownVote.vue'

export default {
  name: 'CardBot',
  components: {
    UpDownVote
  },
  data () {
    return {
      bot_title: 'Bot-ZicaVirus',
      bot_author: 'david_gazques',
      bot_author_name: 'David Gazques',
      bot_text: 'A Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects calledlarvaceans. A Swimming hundreds of feet beneath the ocean’s surface in many parts of the architects called.'
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/_colors";
  .card-bot {
    display: flex;
    background-color: #FFF;
    border-radius: 20px;
    padding: 20px;
    flex-wrap: wrap;
    position: relative;
    transition: all .2s ease-in-out;
    align-items: center;
    margin-bottom: 30px;
    &:hover {
      box-shadow: 0 0 20px 5px rgba($dark-green,.2);
    }
  }
  .card-bot__title,
  .card-bot__author {
    font-weight: 500;
    font-size: 18px;
    display: inline-block;
    margin-bottom: 7px;
  }
  .card-bot__author {
    position: relative;
    padding-left: 8px;
    &::before {
      content: '/';
      display: block;
      width: 8px;
      height: 20px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .bot-card__summary {
    color: $dark-grey;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    top: 23px;
    right: 28px;
    display: flex;
    justify-content: flex-end;
    .bot-summary__item {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-left: 30px;
      .material-icons {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
  .card-bot__info {
    display: flex;
    align-items: center;
  }
  .card-bot__updated {
    font-size: 12px;
    color: $dark-grey;
    margin-right: 10px;
  }
  .card-bot__flags {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    .flags-item {
      width: 15px;
      margin: 0 3px;
      img {
        width: 100%;
      }
    }
  }
  .card-bot__image {
    width: 134px;
    height: 134px;
    margin: 0 30px 0 -10px;
    overflow: hidden;
    border-radius: 100%;
    img {
      width: 100%;
    }
  }
  .card-bot__excerpt {
    margin: 25px 0;
    font-size: 15px;
    line-height: 20px;
  }
  .card-bot__content {
    width: calc(100% - 264px);
  }
  .card-bot__badge {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .bot-action {
    position: absolute;
    bottom: 10px;
    right: 0;
    z-index: 2;
  }
</style>
