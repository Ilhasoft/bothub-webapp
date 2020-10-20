<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div
        v-if="authenticated"
        class="repository-analyze-text" >
        <div class="repository-analyze-text__title">
          <h2>{{ $t('webapp.integration.title') }}</h2>
          <span>{{ $t('webapp.integration.description') }}</span>
        </div>
        <div class="repository-analyze-text-header">
          <div class="repository-analyze-text-header-field">
            <p><strong>URL:</strong></p>
              <highlighted-code
code-class="plaintext"
class="t">

{{ repository.nlp_server }}v2/parse/


</highlighted-code>
          </div>
          <div class="repository-analyze-text-header-field">
            <p><strong>{{ $t('webapp.analyze_text.method_send') }}</strong></p>
            <highlighted-code code-class="plaintext">{
  "language":"[{{ $t('webapp.analyze_text.language_code') }}]"
  "text": "[{{ $t('webapp.analyze_text.text_to_analyze') }}]"
}
            </highlighted-code>
          </div>
        </div>
        <div class="repository-analyze-text__item">
          <p><strong>Header:</strong></p>
          <div class="repository-analyze-text__item__authotization-container">
            <p>Authorization:</p>
            <b-field>
              <b-select
                v-model="profileAuth"
                placeholder="Select a character"
                expanded>
                <option
                  v-for="option in getAuthorizations"
                  :value="option"
                  :key="option.index">{{ option }}</option>
              </b-select>
            </b-field>
            <div class="repository-analyze-text__item__authotization-container__copy">
              <strong>{{ getProfileDetail[0] }} - </strong> <p> {{ getProfileDetail[1] }}</p>
              <b-icon
                icon="content-copy"
                class="repository-analyze-text__item__authotization-container__copy__icon"
                @click.native="copyText()"/>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="repository-analyze-text__item">
              <p>{{ $t('webapp.analyze_text.grid1') }}</p>
            </div>
            <div
              class="repository-analyze-text__item">
              <p><strong>{{ $t('webapp.analyze_text.response') }}</strong></p>
              <highlighted-code code-class="json">{{ json }}</highlighted-code>
            </div>
          </div>
          <div class="column">
            <div class="repository-analyze-text__item">
              <div><strong>{{ $t('webapp.analyze_text.code_generator') }}</strong></div>
              <div>{{ $t('webapp.analyze_text.code_generator_text') }}</div>
            </div>
            <request-generator
              :default-language-field="repository.language"
              :authorization-uuid="getProfileDetail[1]"/>
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
      name="integrate" />
  </repository-view-base>
</template>

<script>
import { mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RequestGenerator from '@/components/repository/RequestGenerator';
import LoginForm from '@/components/auth/LoginForm';
import HighlightedCode from '@/components/shared/HighlightedCode';
import RepositoryBase from './Base';
import Tour from '@/components/Tour';


export default {
  name: 'RepositoryIntegration',
  components: {
    RepositoryViewBase,
    RequestGenerator,
    LoginForm,
    HighlightedCode,
    Tour,
  },
  extends: RepositoryBase,
  data() {
    return {
      json: {
        intent: {
          name: 'love',
          confidence: 0.6943462393863934,
        },
        intent_ranking: [
          {
            name: 'love',
            confidence: 0.6943462393863934,
          },
          {
            name: 'hate',
            confidence: 0.30565376061360666,
          },
        ],
        labels_list: [
          'animal',
        ],
        entities_list: [],
        entities: {
          animal: [
            {
              value: 'puppy',
              entity: 'dog',
              confidence: 0.67255946125065845,
            },
          ],
          other: [],
        },
        text: 'i love my puppy',
        update_id: 47,
        language: 'en',
      },
      profileAuth: '',
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
    ]),
    profileToken() {
      if (!this.repository || this.repository.authorization === 'null') { return null; }
      return this.repository.authorization;
    },
    getAuthorizations() {
      if (this.repository.authorization.organizations !== undefined) {
        let authorization = [];
        if (this.repository.authorization.organizations.length !== 0) {
          authorization = this.repository.authorization.organizations.map((auth) => {
            const nickname = auth.user__nickname;
            const id = auth.uuid;

            return `${nickname} - Bearer ${id}`;
          });
        }
        const { user__nickname: userNickname, uuid } = this.repository.authorization;
        const profileAuthorization = `${userNickname} (${this.$t('webapp.integration.my_user')}) - Bearer ${uuid}`;
        authorization.unshift(profileAuthorization);
        return authorization;
      }
      return [];
    },
    getProfileDetail() {
      if (this.profileToken !== undefined) {
        const splitProfile = this.profileAuth.split(' - ');
        return splitProfile;
      }
      return '';
    },
  },
  watch: {
    profileToken() {
      if (this.profileToken !== undefined) {
        const { user__nickname: userNickname, uuid } = this.repository.authorization;
        const profileAuthorization = `${userNickname} (${this.$t('webapp.integration.my_user')}) - Bearer ${uuid}`;
        this.profileAuth = profileAuthorization;
      }
    },
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.getProfileDetail[1]);
      this.$buefy.toast.open({
        message: this.$t('webapp.integration.copy'),
        type: 'is-success',
      });
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.repository-analyze-text {

  &__title{
    margin-bottom: $between-subtitle-content;
  }

  &__item {
    margin: 1rem 0;
    &__authotization-container{
      padding: 1rem;
      background-color: rgb(248, 248, 248);

      &__copy{
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin:  1.5rem 0 1rem 0;

        strong {
          font-size: 18px;
          user-select: none;
        }

        p{
          margin-left: 0.5rem;
        }

        &__icon{
          margin-left: 2rem;
          color: $color-grey-dark;
          cursor: pointer;
        }
      }

    }
  }

  &-header{
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media screen and (max-width: $mobile-width) {
      flex-direction: column;
      justify-content: center;
        }
    &-field {
      width: 48%;
      @media screen and (max-width: $mobile-width) {
        width: 100%;
      }
    }
  }
}
</style>
