<template>
  <form @submit.prevent="onSubmit()">
    <div class="columns">
      <div class="column is-three-fifths">
        <p><strong>{{ $t('webapp.settings.users') }}</strong></p>
        <select-users-input
          v-model="usersProfile"
          no-orgs />
      </div>
      <div class="column is-one-fifth">
        <p><strong>{{ $t('webapp.settings.role') }}</strong></p>
        <role-select v-model="role" />
      </div>
      <div class="column is-one-fifth">
        <p>&nbsp;</p>
        <b-button
          :disabled="usersProfile.length === 0 || !role"
          class="submit-button"
          type="is-primary"
          native-type="submit"
          primary>{{ $t('webapp.settings.invite') }}</b-button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

import SelectUsersInput from '@/components/inputs/SelectUsersInput';
import RoleSelect from '@/components/inputs/RoleSelect';


export default {
  name: 'OrgSetAuthorizationRoleForm',
  components: {
    SelectUsersInput,
    RoleSelect,
  },
  props: {
    orgNickname: {
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
      'orgUpdateAuthorizationRole',
    ]),
    async onSubmit() {
      this.errors = null;
      let roleSetted = false;

      await Promise.all(this.usersProfile.map(async (userProfile) => {
        try {
          await this.orgUpdateAuthorizationRole({
            orgNickname: this.orgNickname,
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

<style lang="scss" scoped>

  .submit-button {
    min-width: 100%;
  }
</style>
