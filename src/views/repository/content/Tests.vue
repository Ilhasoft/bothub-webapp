<template>
    <repository-view-base :repository="repository" :error-code="errorCode">
        <section v-if="repository" class="repository-tests">
            <section class="repository-tests__description">
                <div class="repository-tests__title">
                    <unnnic-card
                        type="title"
                        :title="$t('webapp.home.bases.tests')"
                        enabled
                        icon="messages-bubble-1"
                        infoPosition="right"
                        :hasInformationIcon="false"
                        scheme="aux-lemon"
                    />
                    <p class="repository-tests__description__text">
                    {{$t('webapp.home.bases.tests_subtitle')}}
                    </p>
                </div>
                <div class="repository-api__select__inputs">
                    <div class="repository-api__select__input">
                        <unnnicSelect
                            v-if="bases.length"
                            size="md"
                            placeholder=""
                            v-model="selectedBase"
                            >
                            <option
                            v-for="base in bases"
                            :value="base.id"
                            :key="base.id"
                            size="sm"
                            >
                            {{ base.title }}
                            </option>
                        </unnnicSelect>
                    </div>
                </div>
            </section> <!-- title -->
        </section>
        <hr>
    </repository-view-base>
</template>
<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from '../Base';
import { mapActions } from 'vuex';

export default {
  name: 'RepositoryContentTests',
  data(){
    return {
      bases: [],
      repositoryUUID: null,
      selectedBase: null,
    }
  },
  components: {
    RepositoryViewBase,
  },
  extends: RepositoryBase,
  methods: {
    ...mapActions([
      'getQAKnowledgeBases'
    ]),
  },
  watch: {
    // eslint-disable-next-line
    'repository.uuid'() {
      if (!this.repository.uuid || this.repository.uuid === 'null') {
        return false;
      }

      this.repositoryUUID = this.repository.uuid;
    },

    async repositoryUUID() {
      const response = await this.getQAKnowledgeBases({
        repositoryUUID: this.repositoryUUID,
        page: 0,
      });

      this.selectedBase = String(response.data.results?.[0]?.id);

      response.data.results.forEach(({ id, title }) => {
        this.bases.push({
          id,
          title
        });
      });
    },
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";


.repository-tests{
    &__description{
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__text{
            margin-top: 8px;
            font-family: $unnnic-font-family-secondary;
            font-size: $unnnic-font-size-body-gt;
            color: $unnnic-color-neutral-dark;
        }
    }

}
</style>
