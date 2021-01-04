import { CHANGE_CURRENT_SONG } from "../actions/currentSongTypes";

export const currentSongActions = (newSong) => {
  return {
    type: CHANGE_CURRENT_SONG,
    payload: newSong,
  };
};
