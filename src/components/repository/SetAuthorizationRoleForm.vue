<template>
  <form @submit.prevent="onSubmit()">
    <div class="bh-grid">
      <div class="bh-grid__item bh-grid__item--grow-2">
        <p><strong>{{ this.$i18n.t('webapp.settings.users') }}</strong></p>
        <select-users-input v-model="usersProfile" />
      </div>
      <div class="bh-grid__item">
        <p><strong>{{ this.$i18n.t('webapp.settings.role') }}</strong></p>
        <role-select v-model="role" />
      </div>
      <div class="bh-grid__item bh-grid__item--grow-0">
        <p>&nbsp;</p>
        <bh-button
          :disabled="usersProfile.length === 0 || !role"
          type="submit"
          size="small"
          primary>Invite</bh-button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

import SelectUsersInput from '@/components/inputs/SelectUsersInput';
import RoleSelect from '@/components/inputs/RoleSelect';


export default {
  name: 'SetAuthorizationRoleForm',
  components: {
    SelectUsersInput,
    RoleSelect,
  },
  props: {
    repositoryUuid: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      usersProfile: [],
      role: null,
      errors: null,
    };
  },
  methods: {
    ...mapActions([
      'repositoryUpdateAuthorizationRole',
    ]),
    async onSubmit() {
      this.errors = null;
      let roleSetted = false;

      await Promise.all(this.usersProfile.map(async (userProfile) => {
        try {
          await this.repositoryUpdateAuthorizationRole({
            repositoryUuid: this.repositoryUuid,
            userNickname: userProfile.nickname,
            newRole: this.role,
          });
          roleSetted = true;
        } catch (error) {
          const { response } = error;
          const { data } = response;

          this.$bhToastNotification({
            message: data.detail || 'Something wrong happened...',
            type: 'danger',
          });

          if (!data.detail) {
            throw error;
          }
        }
      }));

      if (roleSetted) {
        this.$emit('roleSetted');
      }

      this.usersProfile = [];
      this.role = null;
    },
  },
};
</script>
