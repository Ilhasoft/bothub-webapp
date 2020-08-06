<template>
  <div class="authorization-item columns is-vcentered">
    <div class="authorization-item__info column">
      <user-avatar
        :profile="getProfile(user__nickname)"
        :clickable="false"
        class="authorization-item__avatar" />
      <p><strong>
        {{ getProfile(user__nickname).name || user__nickname }} ({{ user__nickname }})
      </strong></p>
      <role-select
        :editable="editable"
        v-model="newRole"
        size="is-small" />
    </div>
    <div class="column is-2 authorization-item__icon__container">
      <b-icon
        v-show="!submitting"
        icon="delete"
        class="authorization-item__icon authorization-item__icon--button"
        @click.native="remove()"/>
      <b-icon
        v-show="!submitting"
        icon="pencil"
        class="authorization-item__icon authorization-item__icon--button"
        @click.native="editable = !editable"/>
      <b-icon
        v-show="submitting"
        class="authorization-item__icon icon-spin"
        icon="refresh" />
      <b-icon
        v-show="submitted"
        class="text-color-primary"
        icon="check" />
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
    is_organization: {
      type: Boolean,
      default: true,
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
      editable: false,
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
      'removeOrgAuthorization',
    ]),
    async remove() {
      return new Promise((resolve, reject) => {
        this.removeDialog = this.$buefy.dialog.confirm({
          message: this.$t('webapp.settings.remove_user_confirm', { user: this.user__nickname }),
          confirmText: this.$t('webapp.settings.remove'),
          cancelText: this.$t('webapp.settings.cancel'),
          type: 'is-danger',
          onConfirm: async () => {
            this.submitting = true;
            try {
              await this.removeOrgAuthorization({
                userNickname: this.user__nickname,
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
          orgNickname: this.organization__nickname,
          userNickname: this.user__nickname,
          newRole: this.newRole,
        });
        this.submitted = true;
        this.$emit('updateList');
      } catch (error) {
        this.newRole = this.role;
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
        message: data.detail || this.$t('webapp.settings.default_error'),
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

@import '~@/assets/scss/colors.scss';

.authorization-item {
    padding: 0 1rem;
    background-color: $color-white;
    border: 1px solid $color-border;
    margin: 0.625rem 0;
    border-radius: 5px;

    &__info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      > * {
        margin: 0.5rem 1rem 0.5rem 0;
      }
    }

    &__avatar {
        box-shadow: 0px 3px 6px #00000029;
    }

    &__icon {
      color: $color-grey-dark;

      &--button {
        cursor: pointer;
      }

      &__container {
        display: flex;
        flex-direction: row-reverse;

        > * {
            margin: 0 0 0.5rem 1rem;
        }
      }
    }
}
</style>
