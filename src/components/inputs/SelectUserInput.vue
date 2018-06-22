<template>
  <div>
    <b-autocomplete
      v-show="!selected"
      keep-first
      v-model="query"
      :data="data"
      field="name"
      @select="onSelected($event)">
      <template slot-scope="props">
        <div class="media">
          <div class="media-left"><user-avatar :profile="props.option" /></div>
          <div class="media-content">
            <div>{{ props.option.name }}</div>
            <div><small>
              <span>{{ props.option.nickname }}</span> /
              <span>{{ props.option.locale || 'No locale' }}</span>
            </small></div>
          </div>
        </div>
      </template>
    </b-autocomplete>
    <div v-if="selected">
      <div class="media">
        <div class="media-left">
          <user-avatar
            :profile="selected"
            class="selected-avatar" />
        </div>
        <div class="media-content">
          <div class="selected-name">{{ selected.name }}</div>
          <div class="selected-nickname">{{ selected.nickname }}</div>
        </div>
        <div class="media-right">
          <button
            @click="removeSelected()"
            type="button"
            class="delete selected-delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import UserAvatar from '@/components/shared/UserAvatar';


const components = {
  UserAvatar,
};

export default {
  name: 'SelectUserInput',
  components,
  props: {
    debounceTime: {
      type: Number,
      default: 750,
    },
  },
  watch: {
    query() {
      this.clearTimeout();
      this.setTimeoutId = setTimeout(
        () => { this.updateData(); },
        this.debounceTime);
    },
  },
  data() {
    return {
      query: '',
      setTimeoutId: null,
      data: [],
      selected: null,
    };
  },
  methods: {
    ...mapActions([
      'searchUser',
    ]),
    async updateData() {
      this.data = [];

      if (!this.query) return false;

      const response = await this.searchUser({
        search: this.query,
      });
      this.data = response.data;
      return this.data;
    },
    clearTimeout() {
      if (this.setTimeoutId) {
        clearTimeout(this.setTimeoutId);
        this.setTimeoutId = null;
      }
    },
    onSelected(profile) {
      this.selected = profile;
      this.$emit('input', profile);
    },
    removeSelected() {
      this.selected = null;
      this.query = '';
      this.$emit('input', null);
    },
  },
};
</script>

<style lang="scss" scoped>
.selected {
  &-avatar {
    display: block;
  }

  &-name {
    font-size: .8em;
    font-weight: bolder;
  }

  &-nickname {
    font-size: .6em;
  }

  &-delete {
    margin: 8px 0;
  }
}
</style>
