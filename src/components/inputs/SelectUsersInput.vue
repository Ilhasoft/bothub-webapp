<template>
  <b-taginput
    ref="taginput"
    v-model="newValue"
    :data="data"
    :placeholder="$t('webapp.settings.search_user')"
    autocomplete
    field="name"
    @typing="updateData($event)">
    <template slot-scope="props">
      <div class="media">
        <div class="media-left"><user-avatar :profile="props.option" /></div>
        <div class="media-content">
          <div>{{ props.option.name }}</div>
          <div><small>
            <span>{{ props.option.nickname }}</span> /
            <span>{{ props.option.locale || $t('webapp.settings.no_locale') }}</span>
          </small></div>
        </div>
      </div>
    </template>
  </b-taginput>
</template>

<script>
import { mapActions } from 'vuex';

import UserAvatar from '@/components/user/UserAvatar';


const components = {
  UserAvatar,
};

export default {
  name: 'SelectUsersInput',
  components,
  props: {
    value: {
      type: Array,
      default: () => ([]),
    },
    debounceTime: {
      type: Number,
      default: 750,
    },
  },
  data() {
    return {
      setTimeoutId: null,
      data: [],
      newValue: this.value,
    };
  },
  watch: {
    value: {
      handler() {
        this.newValue = this.value;
      },
      deep: true,
    },
    newValue: {
      handler() {
        this.$emit('input', this.newValue);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions([
      'searchUser',
    ]),
    clearTimeout() {
      if (this.setTimeoutId) {
        clearTimeout(this.setTimeoutId);
        this.setTimeoutId = null;
      }
    },
    updateData(value) {
      this.clearTimeout();
      this.setTimeoutId = setTimeout(
        async () => {
          this.data = [];

          if (!value) return false;

          const response = await this.searchUser({
            search: value,
          });
          const { data } = response;
          const results = data.filter((user) => {
            const existsOnNewValue = this.newValue.reduce((previus, u) => {
              if (previus) return previus;
              return user.nickname === u.nickname;
            }, false);
            return !existsOnNewValue;
          });
          this.data = results;
          return results;
        },
        this.debounceTime,
      );
    },
  },
};
</script>
