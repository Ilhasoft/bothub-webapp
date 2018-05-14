import example from '@/api/example';

export default {
  async newExample(store, { repository, text, entities, intent }) {
    const response = await example.new(repository, text, entities, intent);
    return response;
  },
  async getExamples(store, { repositoryUuid }) {
    const response = await example.all(repositoryUuid);
    return response;
  },
};
