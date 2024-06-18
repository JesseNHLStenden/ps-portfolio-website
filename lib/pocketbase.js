import PocketBase from 'pocketbase';

export const pb = new PocketBase("https://ps-j.pockethost.io");

export const getImageURL = (recordId, fileName) => {
  return `https://ps-j.pockethost.io/api/files/3wpait0y5cwq47t/${recordId}/${fileName}`;
};