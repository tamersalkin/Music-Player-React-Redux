import { CHANGE_SONGS } from "../actions/songsTypes";
import data from "../../data";

const initialState = {
  songs: data,
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SONGS:
      return {
        songs: action.payload,
      };
    default:
      return state;
  }
};

export default songsReducer;
