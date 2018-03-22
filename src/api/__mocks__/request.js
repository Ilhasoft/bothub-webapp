import requestMockupJson from 'request-mockup-json';

const config = {
  mockupsPath: __dirname,
};

export default {
  $http: {
    get: requestMockupJson.create('GET', config),
    post: requestMockupJson.create('POST', config),
  },
};
