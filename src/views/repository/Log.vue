<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div class="repository-log">
      <div class="repository-log__header">
        <h1> Log </h1>
        <p> These are phrases of actual suer interaction with your data set.
        They can be useful for your training or testing. </p>
      </div>
    </div>
    <div class="field is-horizontal is-grouped">
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="name"
            class="input"
            type="text"
            placeholder="Search sentence">
        </div>

        <div class="control">
          <a class="button is-text">
            <b-icon icon="magnify" />
          </a>
        </div>
      </div>
      <div class="control">
        <span>Filter by: </span>
        <div class="select">
          <select v-model="filterOption">
            <option> Option1 </option>
            <option> Option2 </option>
          </select>
        </div>
      </div>
      <div class="control">
        <input
          v-model="filterSearch"
          :placeholder="`Your ${filterOption}`"
          class="input"
          type="text">
      </div>
    </div>

    <repository-log-list
      :per-page="perPage"
      :query="query" />

  </repository-view-base>

</template>

<script>
import RepositoryBase from './Base';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryLogList from '@/components/repository/repository-log/RepositoryLogList';

export default {
  name: 'RepositoryLog',
  components: {
    RepositoryViewBase,
    RepositoryLogList,
  },
  extends: RepositoryBase,
  data() {
    return {
      perPage: 10,
      query: {},
      filterOption: 'filter',
      name: '',
      filterSearch: '',
    };
  },
  computed: {
  },
  method: {
    updateQuery() {
      this.query = {
        name: this.name,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .repository-log {
    &__header {
      margin-bottom: 3.5rem;
    }
  }
</style>
