import { IS_PLAYING } from "../actions/isPlayingTypes";

const initialState = {
  isPlaying: false,
};

const isPlayingReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    default:
      return state;
  }
};

export default isPlayingReducer;
