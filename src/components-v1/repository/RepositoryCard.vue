<template>
  <div class="card">
    <div class="card-content">
      <repository-info
        :slug="slug"
        :name="name"
        :owner__nickname="owner__nickname"
        :available_languages="available_languages"
        :description="description"
        :categories_list="categories_list"
        :votes_sum="votes_sum" />
    </div>
  </div>
</template>

<script>
import RepositoryInfo from '@/components-v1/repository/RepositoryInfo';

const components = {
  RepositoryInfo,
};

export default {
  name: 'RepositoryCard',
  components,
  props: {
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    owner__nickname: {
      type: String,
      required: true,
    },
    available_languages: {
      type: Array,
      default: () => ([]),
    },
    description: {
      type: String,
      default: '',
    },
    categories_list: {
      type: Array,
      default: () => ([]),
    },
    votes_sum: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem 0;
}
</style>
