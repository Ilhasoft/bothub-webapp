<template>
  <div class="tab-navigation">
    <section class="tab-navigation__container">
        <div class="tab-navigation__container__content">
          <unnnic-card
            clickable
            title="Inteligências no projeto"
            type="default"
            description="São as inteligências em uso por Ilhasoft"
            :class="{'tab-navigation__container__content--selected': currentTab === 0}"
            @click.native="handleChangeTag(0)"
            />
        </div>

        <div class="tab-navigation__container__content">
          <unnnic-card
            clickable
            title="Inteligências da organização"
            type="default"
            description="Visualize e use as inteligências da organização."
            :class="{'tab-navigation__container__content--selected': currentTab === 1}"
            @click.native="handleChangeTag(1)"
            />
        </div>

        <div class="tab-navigation__container__content">
          <unnnic-card
            clickable
            title="Inteligências da comunidade"
            type="default"
            description="Visualize e use as inteligências públicas."
            :class="{'tab-navigation__container__content--selected': currentTab === 2}"
            @click.native="handleChangeTag(2)"
            />
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TabNavigation',
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
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

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
