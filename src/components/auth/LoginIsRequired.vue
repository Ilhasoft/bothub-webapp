<script>
import { mapGetters } from 'vuex';


export default {
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
  computed: mapGetters(['authenticated']),
};
</script>
