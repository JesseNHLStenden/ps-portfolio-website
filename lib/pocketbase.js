import PocketBase from 'pocketbase';

export const pb = new PocketBase("https://bram.fly.dev/");

export const getImageURL = (recordId, fileName) => {
  return `https://bram.fly.dev/api/files/3wpait0y5cwq47t/${recordId}/${fileName}`;
};