import request from './request';


export default {
  new(exampleId, language, text, entities) {
    return request.$http.post(
      '/translate-example/',
      {
        original_example: exampleId,
        language,
        text,
        entities,
      },
    );
  },
};
