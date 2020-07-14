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
              <p>{{ $t('webapp.analyze_text.grid1') }}</p>
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
              <p><strong>{{ $t('webapp.analyze_text.method_send') }}</strong></p>
              <bh-highlighted-pre code-class="plaintext">
language: [{{ $t('webapp.analyze_text.language_code') }}]
text: [{{ $t('webapp.analyze_text.text_to_analyze') }}]"
              </bh-highlighted-pre>
            </div>
            <div
              class="repository-analyze-text__item">
              <p><strong>{{ $t('webapp.analyze_text.response') }}</strong></p>
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
              <div><strong>{{ $t('webapp.analyze_text.code_generator') }}</strong></div>
              <div>{{ $t('webapp.analyze_text.code_generator_text') }}</div>
            </div>
            <request-generator
              :default-language-field="repository.language"
              :authorization-uuid="repository.authorization.uuid"/>
          </div>
        </div>
      </div>
      <div
        v-else>
        <b-notification
          :closable="false"
          type="is-info">
          {{ $t('webapp.analyze_text.notification_info') }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>
    </div>
    <tour
      v-if="activeTutorial === 'integrate'"
      :step-count="2"
      name="integration" />
    <tutorial-modal :open="activeMenu"/>
  </repository-view-base>
</template>

<script>
import { mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RequestGenerator from '@/components/repository/RequestGenerator';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';
import Tour from '@/components/Tour';
import TutorialModal from '@/components/TutorialModal';

export default {
  name: 'RepositoryIntegration',
  components: {
    RepositoryViewBase,
    RequestGenerator,
    LoginForm,
    Tour,
    TutorialModal,
  },
  extends: RepositoryBase,
  computed: {
    ...mapGetters([
      'activeTutorial',
      'activeMenu',
    ]),
  },
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
