import requestMockupJson from 'request-mockup-json';

export default {
  get: requestMockupJson.create('GET', __dirname),
  post: requestMockupJson.create('POST', __dirname),
};
