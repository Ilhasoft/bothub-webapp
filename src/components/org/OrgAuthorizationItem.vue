<template>
  <div class="bh-grid">
    <div class="bh-grid__item bh-grid__item--grow-0">
      <user-avatar :profile="getProfile(user__nickname)" />
    </div>
    <div class="bh-grid__item bh-grid__item--grow-1">
      <p><strong>{{ getProfile(user__nickname).name || user__nickname }}</strong></p>
      <p><small>{{ user__nickname }}</small></p>
    </div>
    <div class="bh-grid__item bh-grid__item--grow-0">
      <div
        v-if="submitted || submitted || true"
        class="bh-grid">
        <div class="bh-grid__item">
          <role-select
            v-model="newRole"
            size="is-small" />
        </div>
        <div class="bh-grid__item">
          <bh-icon
            v-if="submitting"
            value="refresh" />
        </div>
        <div class="bh-grid__item">
          <bh-icon-button
            v-if="submitted"
            size="small"
            class="text-color-primary"
            value="check" />
        </div>
        <div class="bh-grid__item">
          <bh-icon-button
            value="close"
            size="small"
            @click="remove()"/>
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
  name: 'OrgAuthorizationItem',
  components: {
    UserAvatar,
    RoleSelect,
  },
  props: {
    id_request_authorizations: {
      type: Number,
      //   required: true,
      default: 0,
    },
    uuid: {
      type: String,
      required: true,
    },
    user__nickname: {
      type: String,
      required: true,
    },
    organization__nickname: {
      type: String,
      required: true,
    },
    organization: {
      type: Number,
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
      'orgUpdateAuthorizationRole',
      'approveOrgRequestAuthorization',
      'removeOrgAuthorization',
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
              await this.removeOrgAuthorization({
                id: this.id_request_authorizations,
                orgNickname: this.organization__nickname,
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
        await this.orgUpdateAuthorizationRole({
          org: this.organization,
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
