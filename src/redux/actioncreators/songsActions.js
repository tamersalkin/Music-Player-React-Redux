import { CHANGE_SONGS } from "../actions/songsTypes";

export const songsActions = (newData) => {
  return {
    type: CHANGE_SONGS,
    payload: newData,
  };
};
