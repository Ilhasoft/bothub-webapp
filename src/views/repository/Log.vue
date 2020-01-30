<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div class="repository-log">
      <h1> Logs </h1>
      <p> Search, etc </p>
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
          <select>
            <option> Option1 </option>
            <option> Option2 </option>
          </select>
        </div>
      </div>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Your intent">
      </div>
      <div class="control">
        <b-field label="Confidence level: 0.3 to 0.7">
          <b-slider
            v-model="numbers"
            :min="0.3"
            :max="0.7"
            :step="0.1"
            rounded/>
        </b-field>
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
import LogAccordion from '@/components/shared/accordion/LogAccordion';

export default {
  name: 'RepositoryLog',
  components: {
    RepositoryViewBase,
    LogAccordion,
  },
  extends: RepositoryBase,
  data() {
    return {
      perPage: 10,
      query: {},
    };
  },
  computed: {
    numbers() {
      return [0.3, 0.4, 0.5, 0.6, 0.7];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
