import { combineReducers } from "redux";
import currentSongReducer from "./reducers/currentSongReducer";
import isPlayingReducer from "./reducers/isPlayingReducer";
import libraryStatusReducer from "./reducers/libraryStatusReducer";
import songInfoReducer from "./reducers/songInfoReducer";
import songsReducer from "./reducers/songsReducer";

const rootReducer = combineReducers({
  play: isPlayingReducer,
  libStatus: libraryStatusReducer,
  songs: songsReducer,
  currSong: currentSongReducer,
  songInf: songInfoReducer,
});

export default rootReducer;
