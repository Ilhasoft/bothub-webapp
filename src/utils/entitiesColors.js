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

const getStringHash = (text) => {
  let hash = 0;
  if (text.length === 0) {
    return hash;
  }
  for (let i = 0; i < text.length; i += 1) {
    const char = text.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + char;
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  }
  return hash;
};

export const getEntityColor = (entity, entities, flexibleEntities) => {
  const hash = getStringHash(entity.value || entity);
  const i = Math.abs(hash) % colorsList.length;
  return colorsList[i];
};

// export const getEntityColor = (entity, entities, flexibleEntities) => {
//   const entitiesList = getEntitiesList(entities, flexibleEntities);
//   const i = entitiesList.indexOf(entity.entity || entity) % colorsList.length;
//   return colorsList[i];
// };
