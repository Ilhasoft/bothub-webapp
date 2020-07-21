<template>
  <div class="activity-item">
    <user-avatar
      :profile="profile"
      :clickable="false"
      size="large"
      class="activity-item__avatar"/>
    <div>
      <p>
        <strong> {{ userNickname }} </strong>
        {{ activity }}
      </p>
      <p
        class="activity-item__activity"
        v-html="$t('webapp.my_profile.activities.activity_complement', {org, intelligence}) "/>
      <p class="activity-item__stamp"> {{ createdAt }} </p>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar';

export default {
  components: {
    UserAvatar,
  },
  props: {
    userNickname: {
      type: String,
      default: '',
    },
    activity: {
      type: String,
      default: '',
    },
    createdAt: {
      type: String,
      default: null,
    },
    org: {
      type: String,
      default: '',
    },
    intelligence: {
      type: String,
      default: '',
    },
  },
  computed: {
    profile() {
      return {
        nickname: this.userNickname,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
    .activity-item {
        display: flex;
        align-items: center;
        > * {
            margin-right: 0.6rem;

            &:last-child {
                margin-right: 0;
            }
        }

        &__avatar {
            background-color: white;
            box-shadow: 0px 3px 6px #00000029;
        }

        /deep/ &__activity {
            font-size: 0.875rem;
        }

        &__stamp {
            font-size: 0.625rem;
        }
    }
</style>
