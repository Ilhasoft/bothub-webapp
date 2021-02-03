<template>
  <form @submit.prevent="onSubmit()">
    <div class="authorization">
      <div class="authorization__user-field">
        <p><strong>{{ $t('webapp.settings.users') }}</strong></p>
        <select-users-input v-model="usersProfile" />
      </div>
      <div class="authorization__user-role">
        <p><strong>{{ $t('webapp.settings.role') }}</strong></p>
        <role-select v-model="role" />
      </div>
        <b-button
          :disabled="usersProfile.length === 0 || !role"
          type="is-primary"
          native-type="submit"
          class="authorization__send-authorization">{{ $t('webapp.settings.invite') }}</b-button>
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

          this.$buefy.toast.open({
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

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';

.authorization {

  display: flex;
  justify-content: space-between;
  align-items: center;
    @media screen and (max-width: $mobile-width) {
      flex-direction: column;
    }
  &__user-field {
    width: 50%;
    @media screen and (max-width: $mobile-width) {
      width: 100%;
    }
  }

  &__user-role {
    width: 30%;
    @media screen and (max-width: $mobile-width) {
      width: 100%;
    }
  }

  &__send-authorization {
    margin-top: 1.3rem;
  }
}

</style>
