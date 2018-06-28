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
        @click="onEdit()"
        class="clickable-icon">
        <b-icon
          icon="pencil"
          size="is-small" />
      </div>
    </div>
    <div class="media-right">
      <div class="clickable-icon">
        <b-icon
          icon="close"
          size="is-small" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import UserAvatar from '@/components/shared/UserAvatar';


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
    onEdit() {
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
  },
};
</script>

<style lang="scss" scoped>
.clickable-icon {
  cursor: pointer;
  padding: .75rem;
}
</style>
