import requestMockupJson from 'request-mockup-json';
import store from '../../store';

export default {
  get $http() {
    const config = {
      mockupsPath: __dirname,
      headers: {
        ...((store.getters.authenticated) ?
          { Authorization: `Token ${store.getters.authToken}` } : {}),
      },
    };

    return {
      get: requestMockupJson.create('GET', config),
      post: requestMockupJson.create('POST', config),
      put: requestMockupJson.create('PUT', config),
      options: requestMockupJson.create('OPTIONS', config),
    };
  },
};
