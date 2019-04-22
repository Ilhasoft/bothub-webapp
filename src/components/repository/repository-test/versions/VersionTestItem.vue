<template>
  <div>
    <bh-card
      v-for="index in 10"
      :key="index"
      class="version-test-item">
      <div class="version-test-item__wrapper">
        <div class="version-test-item__wrapper__info">
          <strong class="version-test-item__wrapper__info__item">Test #{{ index }}</strong>
          <language-badge
            class="version-test-item__wrapper__info__item"
            main
            language="pt_br"/>
          <small class="version-test-item__wrapper__info__item">2 minutes ago</small>
        </div>
        <div class="version-test-item__wrapper__links">
          <a
            href="">Load results /</a>
          <a
            href="">Dowload</a>
        </div>
      </div>
    </bh-card>
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'VersionTestItem',
  components: {
    LanguageBadge,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.version-test-item {
  margin: 1rem;

  &__wrapper {
    display: flex;
    margin: .5rem;
    align-items: center;

    &__info {
      flex-grow: 1;
      align-self: center;

      &__item {
        margin: 0 .3rem;
      }
    }

    &__links {
      margin: .5rem;
    }
  }
}
</style>
