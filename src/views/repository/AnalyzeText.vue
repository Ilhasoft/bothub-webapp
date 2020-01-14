<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div
        v-if="authenticated"
        class="repository-analyze-text" >
        <div class="bh-grid">
          <div class="bh-grid__item bh-grid__item--1-2">
            <div class="repository-analyze-text__item">
              <p>{{ this.$i18n.t('$bothub.analyze_text.grid1') }}</p>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>URL:</strong></p>
              <bh-highlighted-pre
                code-class="plaintext">{{
                  repository.nlp_server }}parse/</bh-highlighted-pre>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>Header:</strong></p>
              <bh-highlighted-pre
                code-class="plaintext">Authorization: Bearer {{
                  repository.authorization.uuid }}</bh-highlighted-pre>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>{{ this.$i18n.t('$bothub.analyze_text.method_send') }}</strong></p>
              <bh-highlighted-pre code-class="plaintext">
                language: [{{ this.$i18n.t('$bothub.analyze_text.language_code') }}]
text: [{{ this.$i18n.t('$bothub.analyze_text.text_to_analyze') }}]"</bh-highlighted-pre>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>{{ this.$i18n.t('$bothub.analyze_text.response') }}</strong></p>
              <bh-highlighted-pre code-class="json">{
  "intent": {
    "name": "love",
    "confidence": 0.6943462393863934
  },
  "intent_ranking": [
    {
      "name": "love",
      "confidence": 0.6943462393863934
    },
    {
      "name": "hate",
      "confidence": 0.30565376061360666
    }
  ],
  "labels_list": [
    "animal"
  ],
  "entities_list": [],
  "entities": {
    "animal": [
      {
        "value": "puppy",
        "entity": "dog",
        "confidence": 0.67255946125065845
      }
    ],
    "other": []
  },
  "text": "i love my puppy",
  "update_id": 47,
  "language": "en"
}</bh-highlighted-pre>
            </div>
          </div>
          <div class="bh-grid__item bh-grid__item--1-2">
            <div class="repository-analyze-text__item">
              <div><strong>{{ this.$i18n.t('$bothub.analyze_text.code_generator') }}</strong></div>
              <div>{{ this.$i18n.t('$bothub.analyze_text.code_generator_text') }}</div>
            </div>
            <request-generator
              :default-language-field="repository.language"
              :authorization-uuid="repository.authorization.uuid"/>
          </div>
        </div>
        <hr>
        <h3>Updates</h3>
        <updates-list :repository="repository" />
      </div>
      <div
        v-else
        class="bh-grid">
        <div class="bh-grid__item">
          <div class="bh-notification bh-notification--info">
            {{ this.$i18n.t('$bothub.analyze_text.notification_info') }}
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import RequestGenerator from '@/components/repository/RequestGenerator';
import LoginForm from '@/components/auth/LoginForm';
import UpdatesList from '@/components/update/UpdatesList';


export default {
  name: 'RepositoryAnalyzeText',
  components: {
    RepositoryViewBase,
    RequestGenerator,
    LoginForm,
    UpdatesList,
  },
  extends: RepositoryBase,
  computed: {},
};
</script>

<style lang="scss">
.repository-analyze-text {
  padding: 1rem;

  &__item {
    margin: 1rem 0;
  }
}
</style>
