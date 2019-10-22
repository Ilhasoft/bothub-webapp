<template>
  <div class="bh-grid authorization-request-item">
    <div class="bh-grid__item bh-grid__item--grow-0">
      <user-avatar :profile="getProfile(user__nickname)" />
    </div>
    <div class="bh-grid__item bh-grid__item--grow-1">
      <div><strong>{{ getProfile(user__nickname).nickname || user__nickname }}</strong></div>
      <div><small>{{ text }}</small></div>
    </div>
    <div class="bh-grid__item bh-grid__item--grow-0">
      <bh-icon-button
        ref="approveBtn"
        primary
        value="check"
        size="small"
        @click="approve()" />
    </div>
    <div class="bh-grid__item bh-grid__item--grow-0">
      <bh-icon-button
        ref="rejectBtn"
        class="text-color-danger"
        value="close"
        size="small"
        @click="reject()" />
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
        await this.approveRequestAuthorization({
          id: this.id,
          repositoryUuid: this.$store.state.Repository.selectedRepository.uuid,
        });
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

      this.$bhToastNotification({
        message: data.detail || 'Something wrong happened...',
        type: 'danger',
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
  border-bottom: 1px solid $color-grey;
}
</style>
