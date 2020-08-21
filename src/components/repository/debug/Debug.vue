<template>
  <div class="debug">
    <div v-if="error">
      <p> {{ $t('webapp.debug.debug_description') }} </p>
      <b-button @click="load()"> {{ $t('webapp.debug.reload') }} </b-button>
    </div>
    <loading
      v-else-if="loading"
      class="debug__loading"/>
    <div v-else>
      <div class="debug__close">
        <b-icon
          icon="close"
          @click.native="closeModal()"/>
      </div>
      <div class="debug__title">
        <h1>{{ $t('webapp.debug.debug') }}</h1>
        <p>{{ $t('webapp.debug.debug_subtitle') }}</p>
      </div>
      <div class="debug__container">
        <div
          v-for="(word, index) in wordsFromText"
          :key="index">
          <span
            :style="style(word)"
            class="debug__container__text"> {{ word }} </span>
        </div>
      </div>
      <div class="debug__table">

        <table
          v-if="tableData.length > 0"
          class="debug__table__data">
          <thead>
            <tr>
              <th> {{ $t('webapp.debug.word') }}:</th>
              <th> {{ $t('webapp.debug.intent') }}:</th>
              <th> {{ $t('webapp.debug.relevance') }}:</th>
            </tr>
          </thead>
          <tr
            v-for="(table, index) in mapTableData"
            :key="index">
            <td>{{ table.text }}</td>
            <td>{{ table.relevance.intent }}</td>
            <td>{{ table.relevance.relevance.toFixed(2) }}</td>
          </tr>
        </table>

        <div class="debug__range" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
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
      })).sort((a, b) => (a.relevance.relevance < b.relevance.relevance ? 1 : -1));
    },
    mapTableData() {
      const table = this.tableData.map(row => row);
      return table;
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
    closeModal() {
      this.$parent.close();
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
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

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

    &__close{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: $color-grey-dark;
      cursor: pointer;
    }

    &__title{
      margin: 0 1rem;
      padding: 0 1.5rem;

      h1{
        font-size: 1.75rem;
        font-weight: $font-weight-bolder;
      }
    }
    &__loading{
      padding: 1rem 0;
    }

    &__table {
      text-align:center;
      margin: 1rem;
      display: flex;
      justify-content: center;
      color: #707070;

      &__data{
        width: 20vw;
        min-width: 400px;
        margin-left: 3rem;

        th {
          color: #707070;
          font-size: 17px;
          font-family: $font-family;
          font-weight: $font-weight-bolder;
        }
      }
    }

    &__range {
      margin: 2rem 0.6rem 0 0;
      width: 1.25rem;
      background: linear-gradient(180deg, #1B7E71 0%, #19DEC4 50%, #00FFDD 100%);
      border-radius: 3px;
    }


    &__container {
      margin: 1rem 2.4rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      border: 1px solid $color-border;

      > * {
        margin: 1rem 0;
      }

    &__text {
      padding: 0.25rem;
      font-weight: bold;
      font-size: 1.5rem;
      margin: 0.25rem;
      border-radius: 5px;
      }
    }
  }
</style>
