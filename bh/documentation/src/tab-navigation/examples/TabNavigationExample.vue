<template>
  <div>
    <bh-tabs v-model="activeTab">
      <bh-tab-item label="Pictures">
        Lorem ipsum dolor sit amet.
      </bh-tab-item>

      <bh-tab-item label="Music">
        Paragraph 1... Lorin Inpsun ipsum dolor sit amet, consectetur adipiscing elit.
        Aliquam at ullamcorper lacus. Class aptent taciti sociosqu ad Lorin Inpsun torquent per
        conubia nostra,
        per inceptos himenaeos. Proin sit amet neque metus. Phasellus scelerisque accumsan dolor
        ac pulvinar. Nam iaculis Lorin Inpsun gravida. Nunc et consequat nunc,
        id cursus neque. Morbi auctor dictum lectus. Etiam maximus eget neque eu tincidunt.
        In a augue vitae nunc laoreet aliquet ac et lectus. Mauris sed auctor est
        non sagittis orci. Ut id libero vulputate, auctor libero id, volutpat nisi.
      </bh-tab-item>

      <bh-tab-item
        label="Books">
        What light is light, if Silvia be not seen? <br>
        What joy is joy, if Silvia be not by— <br>
        Unless it be to think that she is by <br>
        And feed upon the shadow of perfection? <br>
        Except I be by Silvia in the night, <br>
        There is no music in the nightingale.
      </bh-tab-item>

      <bh-tab-item
        label="Videos">
        Nunc nec velit nec libero vestibulum eleifend.
        Curabitur pulvinar congue luctus.
        Nullam hendrerit iaculis augue vitae ornare.
        Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
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
