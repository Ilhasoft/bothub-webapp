<template>
  <form @submit.prevent="onSubmit()">
    <div class="columns">
      <div class="column">
        <b-field label="Users:">
          <select-users-input v-model="usersProfile" />
        </b-field>
      </div>
      <div class="column is-4">
        <b-field label="Role:">
          <role-select v-model="role" />
        </b-field>
      </div>
      <div class="column is-narrow">
        <div class="field">
          <label class="label">&nbsp;</label>
          <button
            :disabled="usersProfile.length === 0 || !role"
            class="button is-primary">Invite</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

import SelectUsersInput from '@/components/inputs/SelectUsersInput';
import RoleSelect from '@/components/inputs/RoleSelect';


const components = {
  SelectUsersInput,
  RoleSelect,
};

export default {
  name: 'SetAuthorizationRoleForm',
  components,
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

          this.$toast.open({
            message: data.detail || 'Something wrong happened...',
            type: 'is-danger',
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
