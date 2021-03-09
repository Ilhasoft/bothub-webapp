<template>
  <div class="home">
    <section class="home__header">
        <unnnic-card
          title="Biblioteca de Inteligências"
          icon="layout-dashboard-2"
          type="title"
          scheme="aux-blue"/>
    </section>
    <tab-navigation/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TabNavigation from '@/components/repository/home/TabNavigation';

export default {
  name: 'Home',
  components: {
    TabNavigation,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
    ]),
  },
  methods: {
    async getCardList(value) {
      this.repositoryList = await value.updateItems(1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/variables.scss';
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

.home {
  background-color: $unnnic-color-background-snow;
  &__header{
    padding: $unnnic-inline-md;
  }
}
</style>
