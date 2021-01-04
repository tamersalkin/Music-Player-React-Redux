import { CHANGE_SONG_INFO } from "../actions/songInfoTypes";

const initialState = {
  songInfo: { currentTime: 0, duration: 0, animationPercentage: 0 },
};

const songInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SONG_INFO:
      return {
        songInfo: action.payload,
      };
    default:
      return state;
  }
};

export default songInfoReducer;
