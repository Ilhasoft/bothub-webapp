<template>
  <div v-if="list && !list.empty">
    <component
      v-for="item in list.items"
      :key="item.key"
      :is="itemComponent"
      v-bind="addAttrs(item)"
      :editing="editable"
      @deleted="onItemDeleted(item.id)"
      @updateList="onSaveUpdate"
      @dispatchEvent="onDispatchEvent($event)" />
    <div class="pagination__bottom">
      <loading v-if="isLoading" />
      <p
        class="text-center"
        else>{{ listStatusErrorCode | statusCodeVerbose }}</p>
      <div>
        <b-pagination
          :total="list.total"
          :current.sync="page"
          :per-page="perPage"
          :range-before="4"
          :range-after="4"
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
    editable: {
      type: Boolean,
      default: false,
    },
    reference: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      listStatusErrorCode: null,
      error: null,
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
        return true;
      } catch (e) {
        this.error = e;
        this.listStatusErrorCode = e.request
          ? e.request.status
          : '';
      }
      return false;
    },
    onDispatchEvent(arg) {
      const [event, value] = arg instanceof Object
        ? [arg.event, arg.value] : [arg, null];

      this.$emit(event, value);
    },
    addAttrs(obj) {
      return Object.assign({ editable: this.editable }, obj, this.$attrs);
    },
    onItemDeleted(id) {
      this.$emit('itemDeleted', id);
    },
    onSaveUpdate() {
      this.$emit('itemSave');
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &__bottom {
    min-width: 100%;
    display: block;
    margin: 1rem auto;
    max-width: 600px;
    display: flex;
    justify-content: flex-end;
  }

}
</style>
