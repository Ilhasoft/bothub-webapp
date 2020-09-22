<template>
  <div v-if="list && !list.empty">
    <component
      v-for="(item, index) in list.items"
      v-show="!isLoading && shouldShow(index)"
      :key="itemKey && item[itemKey] ? item[itemKey] : index"
      :is="itemComponent"
      v-bind="addAttrs(item)"
      @deleted="onItemDeleted(item.id)"
      @updateList="onSaveUpdate"
      @dispatchEvent="onDispatchEvent($event)" />
    <loading
      v-show="isLoading"
      class="pagination__message" />
    <div class="pagination__bottom">
      <p
        v-show="!isLoading"
        class="text-center">
        {{ listStatusErrorCode | statusCodeVerbose }}
      </p>
      <div class="pagination__bottom__controls">
        <div
          v-if="list && list.total > 0"
          class="pagination__bottom__controls__message">
          {{ $tc('webapp.layout.items_total', list.total) }}
        </div>
        <b-pagination
          v-show="list.total > perPage"
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
  <div v-else-if="list && list.empty">
    <p
      class="pagination__message"> {{ emptyMessage }} </p>
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
    addAttributes: {
      type: Object,
      default: () => {},
    },
    emptyMessage: {
      type: String,
      default: null,
    },
    loadAll: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      listStatusErrorCode: null,
      error: null,
      page: 1,
      data: false,
    };
  },
  computed: {
    isLoading() {
      return this.list && this.list.loading;
    },
    params() {
      return this.list.params;
    },
  },
  watch: {
    list() {
      this.fetch();
    },
    isLoading() {
      this.$emit('update:loading', this.isLoading);
    },
    page() {
      if (this.loadAll) return;
      this.fetch();
    },
    params() {
      this.fetch();
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (!(this.list && this.list.updateItems)) return false;
      try {
        if (this.loadAll) {
          await this.list.getAllItems();
          this.$emit('updated');
          return true;
        }
        await this.list.updateItems(this.page);
        this.$emit('updated');
        return true;
      } catch (e) {
        this.error = e;
        this.listStatusErrorCode = e.request
          ? e.request.status
          : '';
        this.$emit('error', this.error);
      }
      return false;
    },
    shouldShow(index) {
      if (!this.loadAll) return true;

      const offset = (this.page - 1) * this.perPage;

      return index >= offset && index < offset + this.perPage;
    },
    onDispatchEvent(arg) {
      const [event, value] = arg instanceof Object
        ? [arg.event, arg.value] : [arg, null];

      this.$emit(event, value);
    },
    addAttrs(obj) {
      return {
        data: this.data, ...this.addAttributes, ...obj, ...this.$attrs,
      };
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
@import '~@/assets/scss/colors.scss';

.pagination {
  &__bottom {
    min-width: 100%;
    display: block;
    margin: 1rem auto;
    max-width: 600px;
    display: flex;
    justify-content: flex-end;

    &__controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      width: 100%;
      align-items: center;

      &__message {
        color: $color-grey-dark;
        padding: 1rem 1rem 1rem 0;
      }
    }
  }

  &

  &__message {
    text-align: center;
    width: 100%;
  }

  &__message {
    text-align: center;
    width: 100%;
  }

}
</style>
