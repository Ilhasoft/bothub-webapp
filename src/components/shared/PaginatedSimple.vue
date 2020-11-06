<template>
  <div v-if="list.total !== 0">
    <component
      v-for="(item, index) in list.items"
      v-show="shouldShow(index)"
      :key="itemKey && item[itemKey] ? item[itemKey] : index"
      :is="itemComponent"
      v-bind="addAttrs(item)"
      @deleted="onItemDeleted(item)"
      @updateList="onSaveUpdate(index, $event)"/>
    <loading
      v-if="isLoading"
      class="pagination__message" />
    <div
      v-else
      class="pagination__bottom">
      <div class="pagination__bottom__controls">
        <div
          class="pagination__bottom__controls__message">
          {{ $tc('webapp.layout.items_total', list.total) }}
        </div>
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
  <div v-else>
    <p
      class="pagination__message"> {{ $t('webapp.paginated_simple.empty') }} </p>
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
      isLoading: false,
    };
  },
  methods: {
    shouldShow(index) {
      const offset = (this.page - 1) * this.perPage;

      return index >= offset && index < offset + this.perPage;
    },
    addAttrs(obj) {
      return {
        data: this.data, ...this.addAttributes, ...obj, ...this.$attrs,
      };
    },
    onItemDeleted(text) {
      this.$emit('itemDeleted', text);
    },
    onSaveUpdate(id, text) {
      this.$emit('itemSave', { id, text });
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
