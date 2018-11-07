<template>
  <div>
    <bh-tabs v-model="activeTab">
      <bh-tab-item label="Food">
        Nunc nec velit nec libero vestibulum eleifend.
        Curabitur pulvinar congue luctus.
        Nullam hendrerit iaculis augue vitae ornare.
        Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
      </bh-tab-item>

      <bh-tab-item label="Music">
        <bh-button
        primary
        tooltip-hover="listen">listen music</bh-button>
        <p>Kaleo</p>
        <p>Led zeppelin</p>
      </bh-tab-item>

      <bh-tab-item
        label="Books">
        <p>
          Nunc nec velit nec libero vestibulum eleifend.
          Curabitur pulvinar congue luctus.
          Nullam hendrerit iaculis augue vitae ornare.
          Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
        </p>
      </bh-tab-item>
    </bh-tabs>
  </div>
</template>

<script>
export default {
  name: 'TabNavigationExample',
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>
