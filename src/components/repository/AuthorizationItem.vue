<template>
  <div class="media align-items-center">
    <div class="media-left is-hidden-mobile">
      <user-avatar :profile="getProfile(user__nickname)" />
    </div>
    <div class="media-content">
      <p><strong>{{ getProfile(user__nickname).name || user__nickname }}</strong></p>
      <p><small>{{ user__nickname }}</small></p>
    </div>
    <div class="media-right"><small>{{ role | roleVerbose }}</small></div>
    <div class="media-right">&nbsp;</div>
    <div class="media-right">
      <div
        ref="editBtn"
        @click="edit()"
        class="clickable-icon">
        <b-icon
          icon="pencil"
          size="is-small" />
      </div>
    </div>
    <div class="media-right">
      <div
        ref="removeBtn"
        @click="remove()"
        class="clickable-icon">
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
import { ROLE_NOT_SETTED } from '@/utils';


const components = {
  UserAvatar,
};

export default {
  name: 'AuthorizationItem',
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
  components,
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
  },
  methods: {
    ...mapActions([
      'repositoryUpdateAuthorizationRole',
    ]),
    edit() {
      this.$emit(
        'dispatchEvent',
        {
          event: 'edit',
          value: {
            userProfile: this.getProfile(this.user__nickname),
            role: this.role,
          },
        });
    },
    async remove() {
      try {
        await this.repositoryUpdateAuthorizationRole({
          repositoryUuid: this.repository,
          userNickname: this.user__nickname,
          newRole: ROLE_NOT_SETTED,
        });
        this.$emit('deleted');
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
  },
};
</script>

<style lang="scss" scoped>
.clickable-icon {
  cursor: pointer;
  padding: .75rem;
}
</style>
