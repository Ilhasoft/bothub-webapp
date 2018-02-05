<template>
    <div class="card-author">
      <div class="card-author__image">
        <img src="../assets/images/man.png" alt="">
      </div>
      <div class="card-author__info">
        <div class="author__name">{{ author_name }}</div>
        <div class="author__info">
        <span class="author__location">
          {{ author_location }}
        </span>
          <span class="author__joined">
          Joined {{ author_joined }} · last seen {{ author_last_seen }}
        </span>
        </div>
        <a href="#" class="author__url">{{ author_url }}</a>
        <span class="author__bot-counts">{{ author_bot_counts }} bots</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CardAuthor',
  data () {
    return {
      author_name: 'Matthew Russell',
      author_location: 'Granada, Andalusia, Spain',
      author_joined: '2 years ago',
      author_last_seen: '9 days ago',
      author_url: 'http://davidgasquez.buthub.api/',
      author_bot_counts: '60'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/_colors';
  .card-author {
    background-color: #fff;
    border-radius: 10px;
    width: calc(33.33% - 30px);
    padding: 20px;
    display: flex;
    margin: 15px;

    @media (max-width: 992px) {
      width: calc(50% - 30px);
    }

    @media (max-width: 768px) {
      width: 100%;
      margin: 10px 0;
    }
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
    font-size: 10px;
    line-height: 16px;
  }
  .author__name {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .author__location {
    display: block;
  }
  .author__joined {
    display: block;
  }
  .author__url {
    display: block;
    color: #000;
    text-decoration: none;
    &:hover {
      color: $primary-color;
    }
  }
  .author__bot-counts {
    display: block;
    margin-top: 10px;
  }
</style>
