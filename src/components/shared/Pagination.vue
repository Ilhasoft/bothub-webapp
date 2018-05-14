<template>
  <div>
    <component
      v-for="item in items"
      :key="item.id"
      :is="itemComponent"
      v-bind="item.data"
      @deleted="onItemDeleted(item.id)" />
    <loading v-if="loading" />
    <div
      v-if="list.hasNext"
      class="next has-text-centered">
      <button
        class="button is-primary"
        :disabled="loading"
        @click="loadingMore()">{{ moreText }}</button>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/shared/Loading';

const components = {
  Loading,
};

export default {
  name: 'Pagination',
  props: {
    itemComponent: {
      required: true,
    },
    list: {
      required: true,
      type: Object,
    },
    moreText: {
      default: 'More',
    },
  },
  components,
  async mounted() {
    this.loadingMore();
  },
  data() {
    return {
      loading: false,
      deletions: [],
    };
  },
  computed: {
    items() {
      return this.list.items
        .map((data, i) => ({
          id: i,
          data,
        }))
        .filter(item => !this.deletions.includes(item.id));
    },
  },
  methods: {
    async loadingMore() {
      this.loading = true;
      await this.list.next();
      this.loading = false;
    },
    onItemDeleted(id) {
      this.deletions.push(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.next {
  margin: 1rem 0;
}
</style>
