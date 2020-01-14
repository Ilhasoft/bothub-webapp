<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">
        <div v-if="repository.authorization.can_contribute">
          <div class="repository-translate">
            <div class="bh-grid">
              <div class="bh-grid__item">
                <bh-field label="Translate from:">
                  <language-select v-model="translate.from" />
                </bh-field>
              </div>
              <div class="repository-translate__translate-arrow-icon">
                <div class="field">
                  <label class="label">&nbsp;</label>
                  <bh-icon
                    value="chevron-right"
                    size="small" />
                </div>
              </div>
              <div class="bh-grid__item">
                <bh-field label="Translate to:">
                  <language-select
                    v-model="translate.to"
                    :exclude="[translate.from]" />
                </bh-field>
              </div>
            </div>
          </div>
          <div
            v-if="!!translate.from && !!translate.to"
            class="bh-grid">
            <div class="bh-grid__item">
              <translate-list
                :repository="repository"
                :from="translate.from"
                :to="translate.to"
                @translated="examplesTransleted()" />
            </div>
          </div>
        </div>
        <div
          v-else
          class="bh-grid">
          <div class="bh-grid__item">
            <div class="bh-notification bh-notification--warning">
              {{ this.$i18n.t('$bothub.translate.not_can_edit_repository') }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bh-grid">
        <div class="bh-grid__item">
          <div class="bh-notification bh-notification--info">
            {{ this.$i18n.t('$bothub.translate.login') }}
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import LanguageSelect from '@/components/inputs/LanguageSelect';
import TranslateList from '@/components/translate/TranslateList';
import TranslationsList from '@/components/translate/TranslationsList';
import LoginForm from '@/components/auth/LoginForm';


export default {
  name: 'RepositoryTranslate',
  components: {
    RepositoryViewBase,
    LanguageSelect,
    TranslateList,
    TranslationsList,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      trainResponse: null,
      translate: {
        from: null,
        to: null,
      },
      toLanguage: null,
    };
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    examplesTransleted() {
      this.updateRepository(true);
    },
  },
};
</script>

<style lang="scss">
@import '~bh/src/assets/scss/colors.scss';


.repository-translate {
  background-color: $color-white;
  border-bottom: .120rem solid whitesmoke;

  &__translate-arrow-icon {
    align-self: center;
  }
}
</style>
