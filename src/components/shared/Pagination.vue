<template>
  <div>
    <component
      v-for="item in items"
      :key="item.id"
      :is="itemComponent"
      v-bind="item.data"
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
  data() {
    return {
      deletions: [],
    };
  },
  computed: {
    items() {
      return this.list.items
        .map((data, i) => ({
          id: i,
          data: Object.assign(
            {},
            this.$attrs,
            data,
          ),
        }))
        .filter(item => !this.deletions.includes(item.id));
    },
  },
  methods: {
    async next() {
      await this.list.next();
    },
    onItemDeleted(id) {
      this.deletions.push(id);
      this.$emit('itemDeleted', id);
    },
    onDispatchEvent(event) {
      /* istanbul ignore next */
      this.$emit(event);
    },
  },
};
</script>

<style lang="scss" scoped>
.next {
  margin: 1rem 0;
}
</style>
