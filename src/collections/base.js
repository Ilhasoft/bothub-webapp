import { Collection } from 'vue-mc';
import store from '@/store';


class BaseCollection extends Collection {
  getRequest(config) {
    return super.getRequest(
      Object.assign(
        {},
        config,
        {
          baseURL: process.env.API_BASE_URL,
          headers: store.getters.authenticated
            ? { Authorization: `Token ${store.getters.authToken}` }
            : {},
        },
      ),
    );
  }
}

export default BaseCollection;
