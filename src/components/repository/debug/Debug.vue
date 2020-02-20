<template>
  <div class="debug">
    <div v-if="!error">
      <p> Something unexpected happened! We couldn't debug your text. </p>
      <b-button @click="load()"> Reload </b-button>
    </div>
    <loading v-else-if="loading" />
    <div v-else>
      <div class="debug__text__container">
        <div
          v-for="word in words">
          <span
            :style="style(relevance(word))"
            class="debug__text"> {{ word }} </span>
        </div>
      </div>
      <div class="debug__table">
        <b-table
          :data="wordList"
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
              {{ props.row.intent }}
            </b-table-column>
            <b-table-column
              centered
              field="relevance"
              label="Relevance"
              width="40"
              numeric>
              {{ props.row.relevance }}
            </b-table-column>
          </template>
        </b-table>

        <div class="debug__range" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loading from '@/components/shared/Loading';

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
    version: {
      type: Number,
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
    words() {
      return this.data.text.split(' ');
    },
    wordList() {
      return Object.entries(this.data).map(entry => ({
        text: entry[0],
        ...entry[1],
      })).sort((a, b) => a.relevance < b.relevance);
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
        const response = await this.analyzeText({
          repositoryUUID: this.repositoryUUID,
          repositoryVersion: this.version,
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
    relevance(word) {
      const reference = this.wordList.find(object => object.text === word);
      return reference ? reference.relevance : 0;
    },
    style(value) {
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
