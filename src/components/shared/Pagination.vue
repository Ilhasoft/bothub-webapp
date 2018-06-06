<template>
  <div>
    <component
      v-for="item in list.items"
      :key="item.key"
      :is="itemComponent"
      v-bind="addAttrs(item.data)"
      @deleted="onItemDeleted(item.id)"
      @dispatchEvent="onDispatchEvent($event)" />
    <loading v-if="list.loading" />
    <div
      v-if="list.hasNext"
      class="next has-text-centered">
      <button
        class="button is-primary"
        :disabled="list.loading"
        @click="next()">{{ moreText }}</button>
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
    await this.list.next();
  },
  methods: {
    async next() {
      await this.list.next();
    },
    onItemDeleted(id) {
      this.list.delete(id);
      this.$emit('itemDeleted', id);
    },
    onDispatchEvent(event) {
      /* istanbul ignore next */
      this.$emit(event);
    },
    addAttrs(obj) {
      return Object.assign({}, obj, this.$attrs);
    },
  },
};
</script>

<style lang="scss" scoped>
.next {
  margin: 1rem 0;
}
</style>
