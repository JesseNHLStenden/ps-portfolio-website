import Pocketbase from "pocketbase";

export const pb = new Pocketbase("http://cdn.bramsuurd.nl");

export const getImageURL = (recordId, fileName) => {
  return `http://cdn.bramsuurd.nl/api/files/3wpait0y5cwq47t/${recordId}/${fileName}`;
};