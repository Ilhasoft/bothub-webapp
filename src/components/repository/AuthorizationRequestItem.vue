<template>
  <div class="authorization-request-item">
    <div class="bh-grid bh-grid--space-between authorization-request-item__border-bottom">
      <div class="bh-grid__item bh-grid__item--grow-0">
        <user-avatar :profile="getProfile(user__nickname)" />
      </div>
      <div class="bh-grid__item">
        <p><strong>{{ getProfile(user__nickname).name || user__nickname }}</strong></p>
        <p><small>{{ text }}</small></p>
      </div>
      <div class="bh-grid__item bh-grid__item--grow-0">
        <div class="bh-grid">
          <div class="bh-grid__item">
            <bh-icon-button
              ref="approveBtn"
              primary
              value="check"
              size="small"
              @click="approve()" />
          </div>
          <div class="bh-grid__item">
            <bh-icon-button
              ref="rejectBtn"
              class="authorization-request-item__reject-button"
              value="close"
              size="small"
              @click="reject()" />
          </div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import UserAvatar from '@/components/user/UserAvatar';


const components = {
  UserAvatar,
};

export default {
  name: 'AuthorizationRequestItem',
  components,
  props: {
    id: {
      type: Number,
      required: true,
    },
    user__nickname: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rejectDialog: null,
    };
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
  },
  mounted() {
    this.updateUserProfile();
  },
  methods: {
    ...mapActions([
      'updateProfile',
      'repositoryUpdateAuthorizationRole',
      'approveRequestAuthorization',
      'rejectRequestAuthorization',
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
        await this.approveRequestAuthorization({ id: this.id });
        this.$emit('deleted');
      } catch (e) {
        this.handlerError(e);
      }
    },
    reject() {
      return new Promise((resolve, reject) => {
        this.rejectDialog = this.$dialog.confirm({
          message: 'Are you sure?',
          confirmText: 'Reject',
          type: 'is-danger',
          onConfirm: async () => {
            try {
              await this.rejectRequestAuthorization({ id: this.id });
              this.$emit('deleted');
            } catch (e) {
              this.handlerError(e);
            }
            resolve();
          },
          onCancel: () => {
            reject();
          },
        });
      });
    },
    handlerError(error) {
      const { response } = error;

      if (!response) {
        throw error;
      }

      const { data } = response;

      this.$toast.open({
        message: data.detail || 'Something wrong happened...',
        type: 'is-danger',
      });

      if (!data.detail) {
        throw error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.authorization-request-item {

  &__border-bottom {
    border-bottom: .1rem solid $color-lighter-grey
  }

  &__reject-button {
    color: $color-danger;
  }
}
</style>
