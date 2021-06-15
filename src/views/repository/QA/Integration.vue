<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated" class="repository-analyze-text">
        <section class="integration__section">
          <div class="integration__section__header">
            <unnnic-card
              title="Integrar esta inteligência"
              icon="layout-dashboard-2"
              type="title"
              :has-information-icon="false"
              scheme="feedback-green"
            />
            <p class="integration__section__header__intelligence">
              Nossa API é compatível com diversas plataformas via integração por APIs REST. Para
              saber mais, acesse a documentação e a API explorer.
            </p>
          </div>
          <integration-container />
        </section>
      </div>
      <div v-else>
        <b-notification :closable="false" type="is-info">
          {{ $t("webapp.analyze_text.notification_info") }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RequestGenerator from '@/components/repository/RequestGenerator';
import IntegrationContainer from '@/components/repository/QA/IntegrationForm/IntegrationContainer';
import LoginForm from '@/components/auth/LoginForm';
import HighlightedCode from '@/components/shared/HighlightedCode';
import RepositoryBase from '../Base';

export default {
  name: 'RepositoryIntegration',
  components: {
    RepositoryViewBase,
    RequestGenerator,
    LoginForm,
    HighlightedCode,
    IntegrationContainer
  },
  extends: RepositoryBase,
  data() {
    return {
      json: {
        intent: {
          name: 'love',
          confidence: 0.6943462393863934
        },
        intent_ranking: [
          {
            name: 'love',
            confidence: 0.6943462393863934
          },
          {
            name: 'hate',
            confidence: 0.30565376061360666
          }
        ],
        groups_list: ['animal'],
        entities_list: [],
        entities: {
          animal: [
            {
              value: 'puppy',
              entity: 'dog',
              confidence: 0.67255946125065845
            }
          ],
          other: []
        },
        text: 'i love my puppy',
        update_id: 47,
        language: 'en'
      },
      profileAuth: ''
    };
  },
  computed: {
    profileToken() {
      if (!this.repository || this.repository.authorization === 'null') {
        return null;
      }
      return this.repository.authorization;
    },
    getAuthorizations() {
      if (this.repository.authorization.organizations !== undefined) {
        let authorization = [];
        if (this.repository.authorization.organizations.length !== 0) {
          authorization = this.repository.authorization.organizations.map(auth => {
            const nickname = auth.user__nickname;
            const id = auth.uuid;

            return `${nickname} - Bearer ${id}`;
          });
        }
        return authorization;
      }
      return [];
    },
    getProfileDetail() {
      if (this.profileToken) {
        const splitProfile = this.profileAuth.split(' - ');
        return splitProfile;
      }
      return '';
    }
  },
  watch: {
    profileToken() {
      const { organizations } = this.repository.authorization;
      if (this.profileToken && organizations && organizations.length !== 0) {
        const { user__nickname, uuid } = this.repository.authorization.organizations[0];
        const profileAuthorization = `${user__nickname} - Bearer ${uuid}`;
        this.profileAuth = profileAuthorization;
      }
    }
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.getProfileDetail[1]);
      this.$buefy.toast.open({
        message: this.$t('webapp.integration.copy'),
        type: 'is-success'
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.integration {
  &__section {
    &__header {
      background-color: $unnnic-color-background-snow;

      &__intelligence {
        margin: $unnnic-inline-xs 0 $unnnic-inline-md;
        font-size: $unnnic-font-size-body-gt;
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        color: $unnnic-color-neutral-dark;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      }
    }
  }
}
</style>
