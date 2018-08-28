<template>
  <div class="media align-items-center">
    <div class="media-left is-hidden-mobile">
      <user-avatar :profile="getProfile(user__nickname)" />
    </div>
    <div class="media-content">
      <p><strong>{{ getProfile(user__nickname).name || user__nickname }}</strong></p>
      <p><small>{{ user__nickname }}</small></p>
    </div>
    <div class="media-right">
      <role-select
        v-model="newRole"
        size="is-small" />
    </div>
    <div
      v-if="submitted || submitted || true"
      class="media-right">
      <b-icon
        v-if="submitting"
        icon="refresh"
        custom-class="icon-spin" />
      <b-icon
        v-if="submitted"
        icon="check"
        custom-class="has-text-success" />
    </div>
    <div class="media-right">
      <div
        ref="removeBtn"
        class="clickable-icon"
        @click="remove()">
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
import RoleSelect from '@/components/inputs/RoleSelect';
import { ROLE_NOT_SETTED } from '@/utils';


const components = {
  UserAvatar,
  RoleSelect,
};

export default {
  name: 'AuthorizationItem',
  components,
  props: {
    uuid: {
      type: String,
      required: true,
    },
    user__nickname: {
      type: String,
      required: true,
    },
    repository: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    can_read: {
      type: Boolean,
      required: true,
    },
    can_contribute: {
      type: Boolean,
      required: true,
    },
    can_write: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newRole: this.role,
      submitting: false,
      submitted: false,
      removeDialog: null,
    };
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
  },
  watch: {
    newRole() {
      this.updateRole();
    },
  },
  mounted() {
    this.updateUserProfile();
  },
  methods: {
    ...mapActions([
      'updateProfile',
      'repositoryUpdateAuthorizationRole',
    ]),
    async remove() {
      return new Promise((resolve, reject) => {
        this.removeDialog = this.$dialog.confirm({
          message: 'Are you sure?',
          confirmText: 'Remove',
          type: 'is-danger',
          onConfirm: async () => {
            this.submitting = true;
            try {
              await this.repositoryUpdateAuthorizationRole({
                repositoryUuid: this.repository,
                userNickname: this.user__nickname,
                newRole: ROLE_NOT_SETTED,
              });
              this.$emit('deleted');
            } catch (error) {
              this.handlerError(error);
            }
            this.submitting = false;
            resolve();
          },
          onCancel: () => {
            reject();
          },
        });
      });
    },
    updateUserProfile() {
      this.updateProfile({ nickname: this.user__nickname });
    },
    async updateRole() {
      this.submitting = true;
      this.submitted = false;
      try {
        await this.repositoryUpdateAuthorizationRole({
          repositoryUuid: this.repository,
          userNickname: this.user__nickname,
          newRole: this.newRole,
        });
        this.submitted = true;
        this.$emit('roleChanged');
      } catch (error) {
        this.handlerError(error);
      }
      this.submitting = false;
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
