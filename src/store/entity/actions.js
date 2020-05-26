import entity from '@/api/entity';

export default {
  async editEntity(store, {
    entityId, name, version, repositoryId, labelId,
  }) {
    return new Promise(resolve => setTimeout(resolve, 3000));
  },

  async addLabel(store, { name, repositoryId, version }) {
    return new Promise(resolve => setTimeout(resolve, 3000));
  },

  async deleteEntity(store, { entityId, version, repositoryId }) {
    return new Promise(resolve => setTimeout(resolve, 2000));
  },
};
