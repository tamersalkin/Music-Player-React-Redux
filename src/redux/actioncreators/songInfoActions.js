import { CHANGE_SONG_INFO } from "../actions/songInfoTypes";

export const songInfoActions = (newData) => {
  return {
    type: CHANGE_SONG_INFO,
    payload: newData,
  };
};
