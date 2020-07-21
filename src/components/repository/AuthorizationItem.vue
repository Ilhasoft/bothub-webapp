<template>
  <div class="columns is-vcentered">
    <div class="column is-1">
      <user-avatar :profile="getProfile(user__nickname)" />
    </div>
    <div class="column is-one-fifth">
      <p><strong>{{ getProfile(user__nickname).name || user__nickname }}</strong></p>
      <p><small>{{ user__nickname }}</small></p>
    </div>
    <div class="column">
      <div
        v-if="submitted || submitted || true"
        class="columns is-vcentered">
        <div class="column is-3 is-offset-3">
          <role-select
            v-model="newRole"
            size="is-small" />
        </div>
        <div class="column is-2">
          <b-icon
            v-if="submitting"
            icon="refresh" />
        </div>
        <div class="column is-2">
          <b-icon
            v-if="submitted"
            size="is-small"
            class="text-color-primary"
            icon="check" />
        </div>
        <div class="column is-2">
          <b-icon
            icon="close"
            class="icon-button"
            size="is-small"
            @click.native="remove()"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

import UserAvatar from '@/components/user/UserAvatar';
import RoleSelect from '@/components/inputs/RoleSelect';


export default {
  name: 'AuthorizationItem',
  components: {
    UserAvatar,
    RoleSelect,
  },
  props: {
    id_request_authorizations: {
      type: Number,
      required: true,
    },
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
      'approveRequestAuthorization',
      'removeAuthorization',
    ]),
    async remove() {
      return new Promise((resolve, reject) => {
        this.removeDialog = this.$buefy.dialog.confirm({
          message: 'Are you sure?',
          confirmText: 'Remove',
          type: 'is-danger',
          onConfirm: async () => {
            this.submitting = true;
            try {
              await this.removeAuthorization({
                id: this.id_request_authorizations,
                repositoryUuid: this.$store.state.Repository.selectedRepository.uuid,
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
        this.$emit('updateList');
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

      this.$buefy.toast.open({
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
    .icon-button {
        cursor: pointer;
    }
</style>
