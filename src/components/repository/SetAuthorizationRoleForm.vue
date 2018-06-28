<template>
  <form @submit.prevent="onSubmit()">
    <div class="columns">
      <div class="column">
        <b-field label="User:">
          <select-user-input v-model="userProfile" />
        </b-field>
      </div>
      <div class="column is-4">
        <b-field label="Role:">
          <b-select
            expanded
            v-model="role">
            <option
              v-for="(label, value) in roles"
              :value="value"
              :key="value">
              {{ label }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-narrow">
        <div class="field">
          <label class="label">&nbsp;</label>
          <button
            :disabled="!userProfile || !role"
            class="button is-primary">Update</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

import { ROLES } from '@/utils';
import SelectUserInput from '@/components/inputs/SelectUserInput';


const components = {
  SelectUserInput,
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
      roles: ROLES,
      userProfile: null,
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
      try {
        await this.repositoryUpdateAuthorizationRole({
          repositoryUuid: this.repositoryUuid,
          userNickname: this.userProfile.nickname,
          newRole: this.role,
        });
        this.$emit('roleSetted');
        this.userProfile = null;
        this.role = null;
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
    },
    setData({ userProfile, role }) {
      this.userProfile = userProfile;
      this.role = role;
    },
  },
};
</script>
