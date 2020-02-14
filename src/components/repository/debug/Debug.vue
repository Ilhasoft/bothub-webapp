<template>
  <div class="debug">
    <div class="debug__text__container">
      <div
        v-for="word in wordList">
        <span :style="style(word.relevance)" class="debug__text"> {{ word.text }} </span>
      </div>
    </div>
    <div class="debug__table">
      <b-table
        :data="wordList"
        default-sort="relevance"
        default-sort-direction="desc">
        <template slot-scope="props">
          <b-table-column
            field="text"
            label="Word"
            width="40">
            {{ props.row.text }}
          </b-table-column>
          <b-table-column
            field="intent"
            label="Intent"
            width="40">
            {{ props.row.intent }}
          </b-table-column>
          <b-table-column
            sortable
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
</template>

<script>
export default {
  name: 'RepositoryDebug',
  props: {
    data: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    words() {
      return this.text.split(' ');
    },
    wordList() {
      return Object.entries(this.data).map(entry => ({
        text: entry[0],
        ...entry[1],
      }));
    },
  },
  methods: {
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
    border: 0
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
      margin: 0 0.6rem 0 1rem;
      width: 1.25rem;
      background: rgb(27,126,113);
      background: linear-gradient(180deg, rgba(27,126,113,1) 0%, rgba(25,222,196,1) 50%, rgba(0,255,221,1) 100%);
      border-radius: 3px;
    }

    &__text {
      font-weight: bold;
      font-size: 1.5rem;
      background-color: #2BBFAC;
      margin: 0.25rem;
      border-radius: 5px;

      &__container {
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        border: 1px solid #CFD5D9;
      }
    }
  }
</style>
