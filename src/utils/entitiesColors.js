import { getEntitiesList } from '.';

export const colorsList = [
  'sunflower',
  'energos',
  'blue-martina',
  'lavender-rose',
  'bara-red',
  'radiant-yellow',
  'android-green',
  'mediterranean-sea',
  'lavender-tea',
  'very-berry',
];
export const getEntityColor = (entity, entities, flexibleEntities) => {
  const entitiesList = getEntitiesList(entities, flexibleEntities);
  const i = entitiesList.indexOf(entity) % colorsList.length;
  return colorsList[i];
};
