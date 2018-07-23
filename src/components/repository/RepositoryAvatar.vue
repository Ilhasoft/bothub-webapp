<template>
  <div class="avatar">
    <div class="avatar-updownvote">
      <button
        @click="onUp()"
        class="avatar-updownvote-btn">
        <b-icon icon="chevron-up" />
      </button>
      <div class="avatar-updownvote-value">{{ finalVotesSum || 0 }}</div>
      <button
        @click="onDown()"
        class="avatar-updownvote-btn">
        <b-icon icon="chevron-down" />
      </button>
    </div>
    <div class="avatar-img">
      <img src="@/assets/imgs/avatar.png" :alt="name" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RepositoryAvatar',
  props: {
    name: {
      type: String,
      default: '...',
    },
    ownerNickname: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    votesSum: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    votesSum() {
      this.finalVotesSum = this.votesSum;
    },
  },
  data() {
    return {
      finalVotesSum: this.votesSum,
    };
  },
  methods: {
    ...mapActions([
      'repositoryVoteUp',
      'repositoryVoteDown',
    ]),
    async voteHandler(fn) {
      const { ownerNickname, slug } = this;
      try {
        const response = await fn({
          ownerNickname,
          slug,
        });
        const { data: { votes_sum: votesSum } } = response;
        if (votesSum !== undefined) {
          this.finalVotesSum = votesSum;
        }
        return true;
      } catch (e) {
        const { data } = e.response || {};
        if (data && data.detail) {
          this.$toast.open({
            message: data.detail,
            type: 'is-danger',
          });
        } else {
          this.$toast.open({
            message: 'The vote was not registered.',
            type: 'is-danger',
          });
        }
      }
      return false;
    },
    async onUp() {
      const r = await this.voteHandler(this.repositoryVoteUp);
      return r;
    },
    async onDown() {
      const r = await this.voteHandler(this.repositoryVoteDown);
      return r;
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
      border-radius: 20px;
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
    margin: 0 0 0 -20px;
    overflow: hidden;
    border-radius: 100%;
    position: relative;
    z-index: 2;

    @media (max-width: $desktop) {
      width: 100px;
      height: 100px;
    }

    @media (max-width: $tablet) {
      display: none;
    }
  }
}
</style>
