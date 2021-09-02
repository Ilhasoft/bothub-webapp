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
                <div>
                    <unnnicSelect
                    size="md"
                    type="normal"
                    placeholder=""
                    >
                    <div slot="header">Português (Brasil)</div>
                        <option>None</option>
                        <option>option1</option>
                        <option>option2</option>
                        <option>option3</option>
                        <option>option4</option>
                        <option>option5</option>
                    </unnnicSelect>
                </div>
            </section> <!-- title -->
        </section>
        <hr>
    </repository-view-base>
</template>
<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from '../Base';

export default {
  name: 'RepositoryContentTests',
  data(){
    return {
    }
  },
  components: {
    RepositoryViewBase,
  },
  extends: RepositoryBase,
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
    }
}
</style>
