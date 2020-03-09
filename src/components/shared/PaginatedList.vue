<template>
  <div v-if="list && !list.empty">
    <component
      v-for="item in list.items"
      :key="item.key"
      :is="itemComponent"
      v-bind="addAttrs(item)"
      @dispatchEvent="onDispatchEvent($event)" />
    <div class="pagination__bottom">
      <loading v-if="loading" />
      <p
        class="text-center"
        else>{{ listStatusErrorCode | statusCodeVerbose }}</p>
      <div>
        <b-pagination
          :total="list.total"
          :current.sync="page"
          :per-page="perPage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"/>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/shared/Loading';

const components = {
  Loading,
};

export default {
  name: 'PaginatedList',
  components,
  props: {
    itemComponent: {
      type: [Object, Function],
      required: true,
    },
    list: {
      type: Object,
      default: null,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listStatusErrorCode: null,
      page: 1,
    };
  },
  computed: {
    isLoading() {
      return this.list && this.list.loading;
    },
  },
  watch: {
    async list() {
      await this.fetch();
    },
    isLoading() {
      this.$emit('update:loading', this.isLoading);
    },
    async page() {
      await this.fetch();
    },
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      try {
        await this.list.updateItems(this.page);
      } catch (e) {
        this.listStatusErrorCode = e.request
          ? e.request.status
          : '';
      }
    },
    onDispatchEvent(arg) {
      const [event, value] = arg instanceof Object
        ? [arg.event, arg.value] : [arg, null];

      this.$emit(event, value);
    },
    addAttrs(obj) {
      return Object.assign({}, obj, this.$attrs);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &__bottom {
    min-width: 50%;
    display: block;
    margin: 1rem auto;
    max-width: 600px;
  }
}
</style>
