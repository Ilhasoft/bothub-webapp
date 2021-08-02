
<template>
  <div class="observer">
    <loading/>
  </div>
</template>

<script>
import Loading from '@/components/shared/Loading';

export default {
  props: ['options'],
  data: () => ({
    observer: null,
  }),
  components: {
    Loading,
  },
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect');
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
@import '~@weni/unnnic-system/dist/unnnic.css';
@import '~@weni/unnnic-system/src/assets/scss/unnnic.scss';

.observer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $unnnic-color-neutral-cloudy;
}

</style>
