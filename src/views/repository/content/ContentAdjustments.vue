<template>
    <repository-view-base :repository="repository" :error-code="errorCode">
        <div v-if="repository" class="repository-adjustments">
            <div class="repository-adjustments__description">
                <div class="repository-adjustments__title">
                <unnnic-card
                    type="title"
                    :title="$t('webapp.home.bases.adjustments')"
                    enabled
                    icon="cog-1"
                    infoPosition="right"
                    :hasInformationIcon="false"
                    scheme="brand-weni-soft"
                />
                </div>
            </div> <!-- title -->
            <section class="repository-adjustments-privacy">
                <unnnic-label :label="$t('webapp.create_repository.privacy_label')" />
                <div class="repository-adjustments-privacy__cards">
                    <unnnic-card
                        clickable
                        :title="$t('webapp.create_repository.privacy_type_public_title')"
                        :description="
                        $t('webapp.create_repository.privacy_type_public_description')"
                        type="content"
                        icon="lock-unlock-1-1"
                        class="repository-adjustments-privacy__cards__content"
                        :enabled="!isPrivate"
                        @click.native="isPrivate = false"
                    />

                    <unnnic-card
                        clickable
                        :title="$t('webapp.create_repository.privacy_type_private_title')"
                        :description="
                        $t('webapp.create_repository.privacy_type_private_description')"
                        type="content"
                        icon="lock-2-1"
                        class="repository-adjustments-privacy__cards__content"
                        :enabled="isPrivate"
                        @click.native="isPrivate = true"
                    />
                </div>
            </section>
        </div>
    </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from '../Base';

export default {
  name: 'RepositoryContentAdjustment',
  data(){
    return {
      isPrivate: false,
    }
  },
  components: {
    RepositoryViewBase,
  },
  extends: RepositoryBase,
  watch: {
    // eslint-disable-next-line
    'repository.is_private' (){
      this.isPrivate = this.repository.is_private;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-base {
  &__title {
    font-size: 1.75rem;
    font-weight: $font-weight-medium;
    display: flex;
    align-items: center;
    font-family: $font-family;
    color: $color-fake-black;
  }
}
</style>
