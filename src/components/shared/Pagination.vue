<template>
  <div>
    <component
      v-for="item in list.items"
      :key="item.id"
      :is="itemComponent"
      v-bind="item" />
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
      type: Object,
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
    };
  },
  methods: {
    async loadingMore() {
      this.loading = true;
      await this.list.next();
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.next {
  margin: 1rem 0;
}
</style>
