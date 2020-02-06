<template>
  <div>
    <component
      v-for="item in list.items"
      :key="item.key"
      :is="itemComponent"
      v-bind="addAttrs(item.data)"
      @deleted="onItemDeleted(item.id)"
      @dispatchEvent="onDispatchEvent($event)" />
    <div class="pagination__bottom">
      <loading v-if="list.loading" />
      <p
        class="text-center"
        else>{{ listStatusErrorCode | statusCodeVerbose }}</p>
      <div
        class="next has-text-centered">
        <b-pagination
          :total="list.total"
          :current.sync="page"
          :per-page="perPage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          @change="fetch()"/>
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
      required: true,
      type: Object,
    },
    perPage: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      listStatusErrorCode: null,
      page: 1,
    };
  },
  watch: {
    async list() {
      await this.fetch();
    },
  },
  async mounted() {
    await this.next();
  },
  methods: {
    async fetch() {
      try {
        await this.list.fetch(this.page);
      } catch (e) {
        this.listStatusErrorCode = e.request
          ? e.request.status
          : '';
      }
    },
    onItemDeleted(id) {
      this.fetch();
      this.$emit('itemDeleted', id);
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
    width: 100%;
    display: block;
  }
}

.next {
  margin: 1rem 0;
}
</style>
