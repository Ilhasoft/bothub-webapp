<template>
  <div class="debug">
    <div v-if="error">
      <p> {{ $t('webapp.debug.debug_description') }} </p>
      <b-button @click="load()"> {{ $t('webapp.debug.reload') }} </b-button>
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
          v-if="tableData.length > 0"
          :data="tableData"
          :mobile-cards="false"
          default-sort="relevance"
          default-sort-direction="desc">
          <template slot-scope="props">
            <b-table-column
              :label="$t('webapp.debug.word')"
              centered
              field="text"
              width="40">
              {{ props.row.text }}
            </b-table-column>
            <b-table-column
              :label="$t('webapp.debug.intent')"
              centered
              field="intent"
              width="40">
              {{ props.row.relevance.intent }}
            </b-table-column>
            <b-table-column
              :label="$t('webapp.debug.relevance')"
              centered
              field="relevance"
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
      return this.wordsFromText.reduce((relevanceObject, untreatedWord) => {
        const word = this.treat(untreatedWord);
        if (word === '' || word in relevanceObject) return relevanceObject;
        const relevance = this.data.words[word];
        if (relevance && relevance.length > 0) {
          // eslint-disable-next-line no-param-reassign
          relevanceObject[word] = relevance.find(object => object.intent);
        } else {
          // eslint-disable-next-line no-param-reassign
          relevanceObject[word] = {
            intent: '-',
            relevance: 0,
          };
        }
        return relevanceObject;
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
      if (this.tableData.length === 0) return 0;
      return this.tableData[0].relevance.relevance;
    },
    minRelevance() {
      if (this.tableData.length === 0) return 0;
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
    treat(word) {
      // eslint-disable-next-line no-useless-escape
      return word.replace(/[.,\/#!$%\^&\*;:?/(/){}=\-_`~()]/g, '');
    },
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
      const treatedWord = this.treat(word);
      const relevance = treatedWord === '' ? 0 : this.relevantData[treatedWord].relevance;

      const value = normalize(
        this.minRelevance,
        this.maxRelevance,
        relevance,
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
        flex-wrap: wrap;
        row-gap: 1rem;
        justify-content: center;
        border: 1px solid #CFD5D9;
      }
    }
  }
</style>
