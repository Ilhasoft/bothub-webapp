<template>
  <div class="tab-navigation">
    <section class="tab-navigation__container">
        <div class="tab-navigation__container__content">
          <unnnic-card
            clickable
            :title="$t('webapp.intelligences_lib.tab_project_title')"
            type="default"
            :description="$t('webapp.intelligences_lib.tab_project_subtitle', {org: 'Ilhasoft'})"
            :class="{'tab-navigation__container__content--selected': currentTab === 0}"
            @click.native="handleChangeTag(0)"
            />
        </div>

        <div class="tab-navigation__container__content">
          <unnnic-card
            clickable
            :title="$t('webapp.intelligences_lib.tab_org_title')"
            type="default"
            :description="$t('webapp.intelligences_lib.tab_org_subtitle')"
            :class="{'tab-navigation__container__content--selected': currentTab === 1}"
            @click.native="handleChangeTag(1)"
            />
        </div>

        <div class="tab-navigation__container__content">
          <unnnic-card
            clickable
            :title="$t('webapp.intelligences_lib.tab_community_title')"
            type="default"
            :description="$t('webapp.intelligences_lib.tab_community_subtitle')"
            :class="{'tab-navigation__container__content--selected': currentTab === 2}"
            @click.native="handleChangeTag(2)"
            />
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeTabNavigation',
  data(){
    return {
      currentTab: 0,
    }
  },
  watch: {
    currentTab(){
      this.$emit('changeTabValue', this.currentTab)
    }
  },
  methods: {
    handleChangeTag(tab){
      this.currentTab = tab;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@weni/unnnic-system/dist/unnnic.css';
@import '~@weni/unnnic-system/src/assets/scss/unnnic.scss';

.unnnic-card-content{
  max-height: 6.25rem;
}

.tab-navigation{
  padding: 0 $unnnic-inline-md;
  background-color: $unnnic-color-background-snow;

  &__container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: $unnnic-inline-md;
    border-bottom: 1px solid $unnnic-color-neutral-soft;

    &__content{
      width: 32%;
      height: 6.125rem;

      &--selected {
        background-color: $unnnic-color-background-sky;
        border: $unnnic-border-width-thinner solid $unnnic-color-background-sky;
      }
    }
  }
}

</style>
