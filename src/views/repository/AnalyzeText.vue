<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="repository-analyze-text">
      <div v-if="repository.authorization" >
        <div class="bh-grid">
          <div class="bh-grid__item">
            <div class="repository-analyze-text__item">
              <p>Make a HTTP request to NLP service, follow the example bellow.</p>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>URL:</strong></p>
              <div class="pre">https://nlp.bothub.it/parse/</div>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>Header:</strong></p>
              <div class="pre">Authorization: Bearer {{ repository.authorization.uuid }} </div>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>POST with form-data:</strong></p>
              <pre class="pre">language: [language code]
text: [text to analyze]</pre>
            </div>
            <div class="repository-analyze-text__item">
              <p><strong>Response:</strong></p>
              <pre class="pre">{
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
}
              </pre>
            </div>
          </div>
          <div class="bh-grid__item">
            <div class="repository-analyze-text__item">
              <div><strong>Code Generator:</strong></div>
              <div>Generate code to your respective programming language.</div>
            </div>
            <request-generator
              :default-language-field="repository.language"
              authorization-uuid="repository.authorizatiom.uuid"/>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="bh-notification is-info">
          Sign in to your account to contribute to this repository.
        </div>
        <login-form hide-forgot-password />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import RequestGenerator from '@/components-v1/repository/RequestGenerator';
import LoginForm from '@/components-v1/auth/LoginForm';


export default {
  name: 'RepositoryAnalyzeText',
  components: {
    RepositoryViewBase,
    RequestGenerator,
    LoginForm,
  },
  extends: RepositoryBase,
  computed: {
    ...mapGetters([
      'authenticated',
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
