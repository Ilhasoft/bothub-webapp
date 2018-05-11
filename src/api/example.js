import request from './request';


export default {
  new(repository, text, entities, intent) {
    return request.$http.post(
      '/example/new/',
      {
        repository,
        text,
        entities,
        intent,
      });
  },
};
