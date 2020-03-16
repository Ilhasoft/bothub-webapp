<template>
  <div class="debug">
    <div v-if="error">
      <p> {{ $t('webapp.inbox.debug_description') }} </p>
      <b-button @click="load()"> {{ $t('webapp.inbox.reload') }} </b-button>
    </div>
    <loading v-else-if="loading" />
    <div v-else>
      <div class="debug__text__container">
        <div
          v-for="(word, index) in wordsFromText"
          :key="index">
          <span
            :style="style(word)"
            class="debug__text"> {{ word }} </span>
        </div>
      </div>
      <div class="debug__table">
        <b-table
          :data="tableData"
          :mobile-cards="false"
          default-sort="relevance"
          default-sort-direction="desc">
          <template slot-scope="props">
            <b-table-column
              centered
              field="text"
              label="Word"
              width="40">
              {{ props.row.text }}
            </b-table-column>
            <b-table-column
              centered
              field="intent"
              label="Intent"
              width="40">
              {{ props.row.relevance.intent }}
            </b-table-column>
            <b-table-column
              centered
              field="relevance"
              label="Relevance"
              width="40"
              numeric>
              {{ props.row.relevance.relevance.toFixed(2) }}
            </b-table-column>
          </template>
        </b-table>

        <div class="debug__range" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Loading from '@/components/shared/Loading';
import { normalize } from '@/utils';

export default {
  name: 'RepositoryDebug',
  components: {
    Loading,
  },
  props: {
    repositoryUUID: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapState({
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
    wordsFromText() {
      if (!this.data) return [];
      return this.data.text.split(' ');
    },
    relevantData() {
      if (!this.data) return {};
      return Object.entries(this.data.words).reduce((relevance, entry) => {
        // eslint-disable-next-line no-param-reassign
        relevance[entry[0]] = entry[1]
          .find(object => object.intent);
        return relevance;
      }, {});
    },
    tableData() {
      if (!this.data) return [];
      return Object.entries(this.relevantData).map(entry => ({
        text: entry[0],
        relevance: entry[1],
      })).sort((a, b) => a.relevance.relevance < b.relevance.relevance);
    },
    maxRelevance() {
      return this.tableData[0].relevance.relevance;
    },
    minRelevance() {
      return this.tableData[this.tableData.length - 1].relevance.relevance;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions([
      'debugParse',
    ]),
    async load() {
      this.error = null;
      this.loading = true;
      try {
        const response = await this.debugParse({
          repositoryUUID: this.repositoryUUID,
          repositoryVersion: this.repositoryVersion,
          language: this.language,
          text: this.text,
        });
        this.data = response.data;
        this.loading = false;
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
    style(word) {
      const value = normalize(
        this.minRelevance,
        this.maxRelevance,
        this.relevantData[word].relevance,
      );

      return {
        'background-color': `hsl(172, ${100 - (value * 50)}%, ${65 - (value * 25)}%)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>

    tr, td, table, th, .table {
    border: 0;
    padding: 0.35rem;
  }

  .debug {
    margin: 0 auto;
    width: 30vw;
    min-width: 600px;
    border-radius: 10px;
    padding: 1rem;
    background-color: white;

    &__table {
      text-align:center;
      margin: 1rem;
      display: flex;
      justify-content: center;
    }

    &__range {
      margin: 3.5rem 0.6rem 0 1rem;
      width: 1.25rem;
      background: linear-gradient(180deg, #1B7E71 0%, #19DEC4 50%, #00FFDD 100%);
      border-radius: 3px;
    }

    &__text {
      padding: 0.25rem;
      font-weight: bold;
      font-size: 1.5rem;
      margin: 0.25rem;
      border-radius: 5px;

      &__container {
        margin: 1rem;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        border: 1px solid #CFD5D9;
      }
    }
  }
</style>
