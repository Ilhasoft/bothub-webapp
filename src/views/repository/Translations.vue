<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="translations__header">
        <div class="bh-grid">
          <div class="bh-grid__item">
            <translations-status
              ref="translationsStatus"
              :repository-uuid="repository.uuid"
              v-model="toLanguage" />
          </div>
        </div>
      </div>
      <div class="bh-grid">
        <div class="bh-grid__item">
          <translations-list
            ref="translationsList"
            :repository="repository"
            :to-language="toLanguage"
            @itemDeleted="examplesTransleted()" />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import TranslationsStatus from '@/components/translate/TranslationsStatus';
import TranslationsList from '@/components/translate/TranslationsList';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryTranslations',
  components: {
    RepositoryViewBase,
    TranslationsStatus,
    TranslationsList,
    mapGetters,
  },
  extends: RepositoryBase,
  data() {
    return {
      toLanguage: null,
      translate: {
        from: null,
        to: null,
      },
    };
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    examplesTransleted() {
      this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.translations {
  &__header {
    background-color: $color-white;
    border-bottom: .120rem solid whitesmoke;
  }
}
</style>
