<script>
import { mapGetters } from 'vuex';


export default {
  computed: mapGetters(['authenticated']),
  watch: {
    authenticated() {
      /* istanbul ignore next */
      if (!this.authenticated) {
        /* istanbul ignore next */
        this.$store.dispatch('openLoginModal', {
          redirectToWhenFails: { name: 'home' },
        });
      }
    },
  },
};
</script>
