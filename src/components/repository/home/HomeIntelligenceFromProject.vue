<template>
  <home-intelligence-container>
    <div class="home-intelligences-from-project">
    <section class="home-intelligences-from-project__content"
      v-if="repositoryList.length === 0">
        <div class="home-intelligences-from-project__content__text">
          <p>Seu projeto não está fazendo uso de inteligências. Crie uma nova
            ou explore entre as inteligências da sua organização ou comunidade
          nas opções acima.</p>
        </div>

        <div class="home-intelligences-from-project__content__button">
          <unnnic-button type="secondary" iconLeft="add-1">
            Nova inteligência
          </unnnic-button>
        </div>
      </section>
      <div v-else class="home-intelligences-from-project__cards">
          <home-repository-card
            v-for="list in repositoryList"
            :key="list.uuid"
            :repository-detail="list"/>
      </div>
    </div>
  </home-intelligence-container>
</template>
<script>
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';
import HomeIntelligenceContainer from '@/components/repository/home/HomeIntelligenceContainer';

export default {
  name: 'HomeIntelligenceFromProject',
  components: { HomeRepositoryCard, HomeIntelligenceContainer },
  data() {
    return {
      repositoryList: []
    };
  },
}
</script>

<style lang="scss" scoped>
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

.home-intelligences-from-project{
  &__content{
    margin: auto;
    width: 50%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    &__text{
      margin-bottom: 2.25rem
    }

    &__button *{
      width: 21.625rem;
    }
  }

  &__cards {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(4, 24%);
      @media screen and (max-width: 1400px) {
        grid-template-columns: repeat(3, 32%);
      }
  }
}

</style>
