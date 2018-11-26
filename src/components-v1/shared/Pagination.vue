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
        v-if="list.hasNext"
        class="next has-text-centered">
        <button
          :disabled="list.loading"
          class="button is-primary"
          @click="next()">{{ moreText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components-v1/shared/Loading';

const components = {
  Loading,
};

export default {
  name: 'Pagination',
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
    moreText: {
      type: String,
      default: 'More',
    },
  },
  data() {
    return {
      listStatusErrorCode: null,
    };
  },
  watch: {
    async list() {
      await this.next();
    },
  },
  async mounted() {
    await this.next();
  },
  methods: {
    async next() {
      try {
        await this.list.next();
      } catch (e) {
        this.listStatusErrorCode = e.request
          ? e.request.status
          : '';
      }
    },
    onItemDeleted(id) {
      this.list.delete(id);
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
