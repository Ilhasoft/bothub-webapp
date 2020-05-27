import entity from '@/api/entity';

export default {
  async editEntity(store, {
    entityId, name, repositoryUUID, groupId = null,
  }) {
    return entity.editEntity(entityId, name, repositoryUUID, groupId);
  },

  async addLabel(store, { name, repositoryId, version }) {
    return entity.addGroup(name, repositoryId, version);
  },

  async deleteLabel(store, { groupUuid }) {
    return entity.deleteGroup(groupUuid);
  },

  async deleteEntity(store, { entityId, version, repositoryId }) {
    return new Promise(resolve => setTimeout(resolve, 2000));
  },
};
