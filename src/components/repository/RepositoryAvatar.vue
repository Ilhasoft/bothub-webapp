<template>
  <div class="avatar">
    <div class="avatar-updownvote">
      <button class="avatar-updownvote-btn">
        <b-icon icon="chevron-up" />
      </button>
      <div class="avatar-updownvote-value">0</div>
      <button class="avatar-updownvote-btn">
        <b-icon icon="chevron-down" />
      </button>
    </div>
    <div class="avatar-img">
      <img src="@/assets/imgs/avatar.png" :alt="name" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryAvatar',
  props: {
    name: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  &-updownvote {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    align-self: center;

    &-value {
      width: 100px;
      font-size: 20px;
      padding: 5px 10px;
      border-radius: 20px 0 0 20px;
      color: #AEAEAE;
      text-align: center;
      background-color: #F2F2F2;
      box-shadow: inset 0 2px 6px -2px #929292;

      &-active {
        background-color: #0f0;
        box-shadow: inset 0 2px 6px 0 #1b756a;
        color: #FFF;
      }
    }

    &-btn {
      color: #0a0;
      font-size: 30px;
      background-color: transparent;
      border: 0;
      outline: none;
      cursor: pointer;

      @media (max-width: $desktop) {
        width: 30px;
        height: 40px;
        text-align: center;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &-img {
    width: 134px;
    height: 134px;
    margin: 0 0 0 -10px;
    overflow: hidden;
    border-radius: 100%;
    position: relative;
    z-index: 2;

    @media (max-width: $desktop) {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
