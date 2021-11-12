<template>
  <div class="authorization">
    <div class="authorization__left">
      <user-avatar :profile="getProfile(user__nickname)" />
      <div class="authorization__name">
        <strong>{{ getProfile(user__nickname).nickname || user__nickname }}</strong>
        <small>{{ text }}</small>
      </div>
    </div>
    <div class="authorization__icons">
      <b-icon
        ref="approveBtn"
        class="clickable"
        type="is-primary"
        icon="check"
        size="is-small"
        @click.native="approve()"
      />
      <b-icon
        ref="rejectBtn"
        class="clickable"
        type="is-danger"
        icon="close"
        size="is-small"
        @click.native="reject()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserAvatar from '@/components/user/UserAvatar';

const components = {
  UserAvatar
};

export default {
  name: 'AuthorizationRequestItem',
  components,
  props: {
    id: {
      type: Number,
      required: true
    },
    user__nickname: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rejectDialog: null
    };
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  mounted() {
    this.updateUserProfile();
  },
  methods: {
    ...mapActions([
      'updateProfile',
      'repositoryUpdateAuthorizationRole',
      'approveRequestAuthorization',
      'removeAuthorization'
    ]),
    async updateUserProfile() {
      try {
        await this.updateProfile({ nickname: this.user__nickname });
      } catch (e) {
        this.handlerError(e);
      }
    },
    async approve() {
      try {
        await this.approveRequestAuthorization({
          id: this.id,
          repositoryUuid: this.$store.state.Repository.selectedRepository.uuid
        });
        this.$emit('deleted');
      } catch (e) {
        this.handlerError(e);
      }
    },
    reject() {
      return new Promise((resolve, reject) => {
        this.rejectDialog = this.$buefy.dialog.confirm({
          message: 'Are you sure?',
          confirmText: 'Reject',
          type: 'is-danger',
          onConfirm: async () => {
            try {
              await this.removeAuthorization({
                id: this.id,
                repositoryUuid: this.$store.state.Repository.selectedRepository.uuid
              });
              this.$emit('deleted');
            } catch (e) {
              this.handlerError(e);
            }
            resolve();
          },
          onCancel: () => {
            reject();
          }
        });
      });
    },
    handlerError(error) {
      const { response } = error;

      if (!response) {
        throw error;
      }

      const { data } = response;

      this.$buefy.toast.open({
        message: data.detail || 'Something wrong happened...',
        type: 'is-danger'
      });

      if (!data.detail) {
        throw error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";

.authorization {
  border-bottom: 1px solid $color-grey;
  display: flex;

  &__left {
    display: flex;
    flex: 1;
  }
  &__name {
    margin-left: 1rem;
    margin-bottom: 0.4rem;
    display: flex;
    flex-direction: column;
  }

  &__icons {
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
