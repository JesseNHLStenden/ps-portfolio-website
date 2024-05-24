import PocketBase from 'pocketbase';

export const pb = new PocketBase("https://cdn.bramsuurd.nl/");

export const getImageURL = (recordId, fileName) => {
  return `https://cdn.bramsuurd.nl/api/files/3wpait0y5cwq47t/${recordId}/${fileName}`;
};