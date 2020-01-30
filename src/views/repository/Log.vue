<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div class="repository-log">
      <h1> Log </h1>
      <p> These are phrases of actual suer interaction with your data set. They can be useful for your training or testing. </p>
    </div>
    <div class="field is-horizontal is-grouped">
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Search sentence">
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
          class="input"
          type="text"
          :placeholder="`Your ${filterOption}`">
      </div>
    </div>

    <repository-log-list
      :perPage="perPage"
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
    };
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>

</style>
