import entity from '@/api/entity';

export default {
  async editEntity(store, {
    entityId, name, groupId = null, repositoryVersion,
  }) {
    return entity.editEntity(entityId, name, groupId, repositoryVersion);
  },

  async editGroup(store, { name, groupId, repositoryId, version }) {
    return entity.editGroupName(name, groupId, repositoryId, version);
  },

  async addGroup(store, { name, repositoryId, version }) {
    return entity.addGroup(name, repositoryId, version);
  },

  async deleteGroup(store, { groupUuid }) {
    return entity.deleteGroup(groupUuid);
  },

  async deleteEntity(store, { entityId }) {
    return entity.deleteEntity(entityId);
  },
};
