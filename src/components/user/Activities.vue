<template>
  <div>
    <activity-item
      v-for="(activity, index) in list"
      :user-nickname="activity.user_nickname"
      :activity="activity.activity"
      :org="activity.org"
      :intelligence="activity.intelligence"
      :created-at="activity.created_at"
      :key="index"
      class="activities__item" />
  </div>
</template>

<script>
import ActivityItem from '@/components/user/ActivityItem';

export default {
  name: 'Activities',
  components: {
    ActivityItem,
  },
  data() {
    return {
      list: [
        {
          user_nickname: 'aureliano_b',
          activity: 'translated 9 sentences of pt_brasil to english',
          intelligence: 'Int',
          org: 'Org',
          created_at: 'Mon, 06 Jul 20 12:36:47',
        },
        {
          user_nickname: 'aureliano_b',
          activity: 'translated 9 sentences of pt_brasil to english',
          intelligence: 'Int',
          org: 'Org',
          created_at: 'Mon, 06 Jul 20 12:36:47',
        },
        {
          user_nickname: 'aureliano_b',
          activity: 'translated 9 sentences of pt_brasil to english',
          intelligence: 'Int',
          org: 'Org',
          created_at: 'Mon, 06 Jul 20 12:36:47',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
    .activities {
        &__item {
            margin-bottom: 1.625rem;
        }
    }
</style>
