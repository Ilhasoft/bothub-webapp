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
export const getEntityColor = (entity, entities) => {
  const entitiesList = getEntitiesList(entities);
  const i = entitiesList.indexOf(entity) % colorsList.length;
  return colorsList[i];
};
