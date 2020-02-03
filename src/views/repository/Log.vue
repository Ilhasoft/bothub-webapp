<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div
      v-if="repository"
      class="repository-log">
      <div v-if="authenticated">
        <div class="repository-log__header">
          <h1> Log </h1>
          <p> These are phrases of actual user interaction with your data set.
          They can be useful for your training or testing. </p>
        </div>
        <div class="columns">
          <div class="column is-tree-fifths">
            <div class="control is-expanded has-icons-right">
              <input
                :class="['input', loading ? 'is-loading' : '']"
                v-model="query.name"
                type="text">
              <span class="icon is-small is-right">
                <b-icon
                  class="repository-log__icon"
                  icon="magnify"
                  @click.native="search()"/>
              </span>
            </div>
          </div>
          <div class="column is-narrow">
            <div class="control">
              <label>Filter by: </label>
              <div class="select">
                <select v-model="filterOption">
                  <option value="intent"> Intent </option>
                  <option value="language"> Language </option>
                  <option value="repository_version"> Version </option>
                </select>
              </div>
            </div>
          </div>
          <div class="column control">
            <input
              v-model="filterSearch"
              :placeholder="`Your ${filterName[filterOption] || 'filter'}`"
              class="input"
              type="text">
          </div>
        </div>

        <repository-log-list
          :per-page="perPage"
          :query="query" />
      </div>

      <div
        v-else>
        <b-notification
          :closable="false"
          class="is-warning">
          You cannot edit this repository
        </b-notification>
      </div>
    </div>

    <div
      v-else>
      <b-notification
        :closable="false"
        class="is-danger">
        Sign in to your account to edit this repository.
      </b-notification>
      <login-form hide-forgot-password />
    </div>


  </repository-view-base>

</template>

<script>
import RepositoryBase from './Base';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryLogList from '@/components/repository/repository-log/RepositoryLogList';
import LoginForm from '@/components/auth/LoginForm';

export default {
  name: 'RepositoryLog',
  components: {
    RepositoryViewBase,
    RepositoryLogList,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      perPage: 10,
      name: '',
      filterOption: null,
      query: {},
      filterSearch: '',
      loading: false,
      filterName: {
        repository_version: 'version',
        language: 'language',
        intent: 'intent',
      },
    };
  },
  computed: {
  },
  methods: {
    updateQuery() {
      const query = {};
      const name = this.name.trim();

      if (name) {
        query.name = name;
      }

      if (this.filterOption) {
        query[this.filterOption] = this.filterSearch;
      }

      this.query = query;
    },
  },
};
</script>

<style lang="scss" scoped>
  label {
    vertical-align: middle;
  }

  .repository-log {
    &__header {
      margin-bottom: 3.5rem;
    }

    &__icon {
      pointer-events: initial !important;
      cursor: pointer;
    }
  }
</style>
