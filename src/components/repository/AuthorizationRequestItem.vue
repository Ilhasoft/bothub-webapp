<template>
  <div class="media">
    <div class="media-left is-hidden-mobile">
      <user-avatar :profile="getProfile(user__nickname)" />
    </div>
    <div class="media-content">
      <p><strong>{{ getProfile(user__nickname).name || user__nickname }}</strong></p>
      <p><small>{{ text }}</small></p>
    </div>
    <div
      ref="approveBtn"
      class="clickable-icon has-text-success"
      @click="approve()">
      <b-icon
        icon="check"
        size="is-small" />
    </div>
    <div class="media-right">
      <div
        ref="rejectBtn"
        class="clickable-icon has-text-danger"
        @click="reject()">
        <b-icon
          icon="close"
          size="is-small" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import UserAvatar from '@/components/shared/UserAvatar';


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
.clickable-icon {
  cursor: pointer;
  padding: .75rem;
}
</style>
