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
        :disabled="list.loading"
        class="button is-primary"
        @click="next()">{{ moreText }}</button>
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
  watch: {
    async list() {
      await this.list.next();
    },
  },
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
.next {
  margin: 1rem 0;
}
</style>
