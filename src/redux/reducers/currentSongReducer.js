import { CHANGE_CURRENT_SONG } from "../actions/currentSongTypes";
import data from "../../data.js";

const initialState = {
  currentSong: data[0],
};

const currentSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_SONG:
      return {
        currentSong: action.payload,
      };
    default:
      return state;
  }
};

export default currentSongReducer;
