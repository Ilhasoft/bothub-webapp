<template>
  <div>
    <bh-card
      class="version-test-item">
      <div class="version-test-item__wrapper">
        <div class="version-test-item__wrapper__info">
          <strong class="version-test-item__wrapper__info__item">Test #{{ id }}</strong>
          <language-badge
            :language="language"
            class="version-test-item__wrapper__info__item"
            main/>
          <small class="version-test-item__wrapper__info__item">
            {{ created_at | moment('from') }}</small>
        </div>
        <div class="version-test-item__wrapper__links">
          <a
            @click="goToDetail(id)">Load results</a>
          <span>/</span>
          <a
            href="">Download</a>
        </div>
      </div>
    </bh-card>
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';
import { mapActions } from 'vuex';


export default {
  name: 'EvaluateVersionItem',
  components: {
    LanguageBadge,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    created_at: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions([
      'setUpdateEvaluateResultId',
    ]),
    goToDetail() {
      this.setUpdateEvaluateResultId(this.id);
    },
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
